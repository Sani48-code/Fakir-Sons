"""Product cutouts on one shared studio backdrop.

usage: python product-cutouts.py <src_png_root> <out_dir> <model> [slug|-] [defringe] [transparent]
  <src_png_root> comes from: node scripts/optimize-images.mjs --png <dir>
  (plus wide/ banner regions for panjabi, coat, knit, saree; see WIDE below).
  Needs a venv with: pip install "rembg[cpu]" pillow scipy. Model used: isnet-general-use.
Writes <out_dir>/<slug>.png (3:4, #EDE8DF backdrop, soft floor shadow) and
<out_dir>/<slug>.mask.png. Subjects are never upscaled: the canvas is sized
around the subject's native pixels (then capped at 1600px tall).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove
from scipy import ndimage

SRC, OUT, MODEL = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]
ONLY = sys.argv[4] if len(sys.argv) > 4 and sys.argv[4] != "-" else None
DEFRINGE = "defringe" in sys.argv[5:]
# "transparent": backdrop left transparent (shadow kept as alpha) so the page frame colour shows through exactly.
TRANSPARENT = "transparent" in sys.argv[5:]
OUT.mkdir(parents=True, exist_ok=True)

BG = (0xED, 0xE8, 0xDF)
SHADOW = (0x6B, 0x5E, 0x4E)

# product slug -> source crop (lossless PNG of the same crop used on the site)
PRODUCTS = {
    "ivory-embroidered-panjabi": "panjabi/ivory-embroidered",
    "bottle-green-embroidered-panjabi": "panjabi/bottle-green-embroidered",
    "navy-windowpane-three-piece-suit": "suits/navy-check-three-piece",
    "navy-two-piece-suit": "suits/navy-two-piece",
    "black-bandhgala": "suits/black-bandhgala",
    "camel-wool-overcoat": "winter/camel-wool-overcoat",
    "black-hooded-puffer-jacket": "winter/black-hooded-puffer",
    "navy-puffer-jacket": "winter/navy-puffer-cream-scarf",
    "ecru-trucker-jacket": "winter/ecru-trucker-jacket",
    "brown-leather-jacket": "winter/brown-leather-jacket",
    "black-bomber-jacket": "winter/black-bomber-jacket",
    "black-fleece-hoodie": "hoodies/black-hoodie",
    "cream-fleece-hoodie": "hoodies/cream-hoodie",
    "bottle-green-fleece-hoodie": "hoodies/bottle-green-hoodie",
    "maroon-banarasi-silk-saree": "sarees/maroon-banarasi-silk",
    "mustard-silk-saree": "sarees/mustard-silk",
    "cream-chunky-knit-sweater": "winter/cream-chunky-knit",
    "boys-olive-puffer-jacket": "boys/olive-puffer",
    "boys-denim-jacket": "boys/denim-jacket",
    "boys-navy-suit": "boys/navy-suit",
}

session = new_session(MODEL)

# Wider regions from the original banners, so arms are not cut by a tight crop.
WIDE = {
    "ivory-embroidered-panjabi": "wide/ivory-wide",
    "camel-wool-overcoat": "wide/camel-wide",
    "cream-chunky-knit-sweater": "wide/knit-wide",
    "maroon-banarasi-silk-saree": "wide/saree-wide",
}
# Full-length / seated figures: keep only the top part (head to hip) for the same framing.
KEEP_TOP = {"ecru-trucker-jacket": 0.58, "navy-puffer-jacket": 0.62}

for slug, rel in PRODUCTS.items():
    if ONLY and ONLY not in slug:
        continue
    path = SRC / f"{WIDE[slug]}.png" if slug in WIDE else SRC / "collections" / f"{rel}.png"
    src = Image.open(path).convert("RGB")
    cut = remove(src, session=session, post_process_mask=True)  # RGBA
    alpha = np.array(cut.getchannel("A"))

    # Keep the largest figure only (drops neighbouring models' slivers).
    labels, n = ndimage.label(alpha > 24)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(alpha), labels, range(1, n + 1))
        keep = 1 + int(np.argmax(sizes))
        alpha = np.where(labels == keep, alpha, 0).astype(np.uint8)
    if DEFRINGE:
        # Pull the edge in ~2px and soften it, removing backdrop colour bleed in hair.
        alpha = ndimage.grey_erosion(alpha, size=(5, 5))
        alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8)))
    cut.putalpha(Image.fromarray(alpha))

    ys, xs = np.nonzero(alpha > 24)
    x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    if slug in KEEP_TOP:
        y1 = y0 + int((y1 - y0) * KEEP_TOP[slug])
    sw, sh = x1 - x0, y1 - y0
    side_cut = x0 <= 2 or x1 >= alpha.shape[1] - 2

    # One framing for all: head top at 7% of the height, figure runs off the bottom.
    W = int(round(sh / 0.93 * 0.75))
    if side_cut and sw < W:
        W = sw  # figure already cut at the sides: let it run off the sides too
    H = int(round(W / 0.75))
    top = int(round(H * 0.07))
    cx = (x0 + x1) / 2
    left = int(round(W / 2 - (cx - x0)))
    if side_cut and sw <= W:
        left = 0
    bleed = True
    canvas = Image.new("RGB", (W, H), BG)
    subject = cut.crop((x0, y0, x1, min(y1, y0 + H - top)))

    # Very soft floor shadow
    shadow = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(shadow)
    if bleed:
        # contact shadow: blurred silhouette nudged down, very faint
        sil = subject.getchannel("A").point(lambda v: 255 if v > 24 else 0)
        shadow.paste(sil, (left + int(W * 0.012), top + int(H * 0.012)))
        shadow = shadow.filter(ImageFilter.GaussianBlur(H * 0.022)).point(lambda v: int(v * 0.16))
    else:
        cx, fy = W / 2, top + sh
        d.ellipse((cx - sw * 0.42, fy - H * 0.018, cx + sw * 0.42, fy + H * 0.022), fill=255)
        shadow = shadow.filter(ImageFilter.GaussianBlur(H * 0.02)).point(lambda v: int(v * 0.30))
    if TRANSPARENT:
        canvas = Image.new("RGBA", (W, H), (*SHADOW, 0))
        canvas.putalpha(shadow)
        canvas.alpha_composite(subject, (left, top))
    else:
        canvas = Image.composite(Image.new("RGB", (W, H), SHADOW), canvas, shadow)
        canvas.paste(subject, (left, top), subject)

    if H > 1600:
        canvas = canvas.resize((1200, 1600), Image.LANCZOS)
    canvas.save(OUT / f"{slug}.png")
    print(f"{slug}: src {src.width}x{src.height} subject {sw}x{sh} bleed={bleed} -> {canvas.width}x{canvas.height}", flush=True)
