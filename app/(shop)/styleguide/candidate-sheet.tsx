"use client";

import { useMemo, useState } from "react";
import { Img } from "@/components/ui/img";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { CANDIDATES, candidateSrc } from "@/lib/image-candidates";
import type { Photo } from "@/lib/images";

const ratioOf = (p: Photo) =>
  p.orientation === "landscape" ? "aspect-[3/2]" : p.orientation === "square" ? "aspect-square" : "aspect-[3/4]";

/** Contact sheet of the proposed premium photo set. Click a photo to enlarge. */
export function CandidateSheet() {
  const groups = useMemo(() => Array.from(new Set(CANDIDATES.map((p) => p.group))), []);
  const [group, setGroup] = useState<string>("all");
  const [open, setOpen] = useState<Photo | null>(null);
  const shown = CANDIDATES.filter((p) => group === "all" || p.group === group);

  return (
    <div>
      <p className="mb-4 max-w-2xl text-sm text-stone">
        Proposed premium set, <strong>not used on any page yet</strong>. Approve or reject by key (for example
        &ldquo;reject women-02-saree, hero-03-saree&rdquo;). Click a photo to enlarge.
      </p>
      <Tabs
        ariaLabel="Candidate group"
        value={group}
        onChange={setGroup}
        items={[
          { id: "all", label: `All (${CANDIDATES.length})` },
          ...groups.map((g) => ({ id: g, label: `${g} (${CANDIDATES.filter((p) => p.group === g).length})` })),
        ]}
        className="mb-6"
      />
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 xl:grid-cols-6">
        {shown.map((p) => (
          <li key={p.key} className="text-xs">
            <button type="button" onClick={() => setOpen(p)} className="block w-full text-left" aria-label={`Enlarge ${p.key}`}>
              <Img
                src={candidateSrc(p, 700)}
                alt={p.alt}
                ratio={ratioOf(p)}
                sizes="(min-width: 1280px) 15vw, (min-width: 768px) 24vw, 48vw"
              />
            </button>
            <p className="mt-2 break-all font-medium text-ink">{p.key}</p>
            <p className="mt-0.5 text-stone">{p.description}</p>
            <p className="mt-0.5 text-stone">{p.orientation}</p>
          </li>
        ))}
      </ul>

      <Modal open={open !== null} onClose={() => setOpen(null)} title={open?.key ?? ""}>
        {open && (
          <div>
            <Img
              src={candidateSrc(open, 1400)}
              alt={open.alt}
              ratio={ratioOf(open)}
              sizes="(min-width: 768px) 560px, 100vw"
              className="max-h-[65vh]"
              imgClassName="object-contain"
            />
            <p className="mt-3 text-sm">{open.description}</p>
            <p className="mt-1 text-xs text-stone">
              {open.photographer} ·{" "}
              <a href={open.pageUrl} target="_blank" rel="noopener noreferrer" className="link-grow">
                Pexels page
              </a>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
