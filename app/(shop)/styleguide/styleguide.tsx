"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { SlowZoom } from "@/components/motion/slow-zoom";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TextLines } from "@/components/motion/text-lines";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Checkbox, Input, Select, Textarea } from "@/components/ui/fields";
import { Img } from "@/components/ui/img";
import { Modal } from "@/components/ui/modal";
import { PriceTag } from "@/components/ui/price-tag";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SectionHeader } from "@/components/ui/section-header";
import { Sheet } from "@/components/ui/sheet";
import { SizeButton } from "@/components/ui/size-button";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/skeleton";
import { Swatch } from "@/components/ui/swatch";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { PRODUCTS, FAQS } from "@/lib/dummy";
import { photo } from "@/lib/images";
import { PhotoSheet } from "./photo-sheet";

const PALETTE = [
  ["cotton", "#F5F1E8", "Page background"],
  ["paper", "#FBF9F4", "Cards, inputs, header"],
  ["ink", "#1B1A17", "Text, primary buttons"],
  ["stone", "#77705F", "Secondary text"],
  ["thread", "#DDD5C4", "Hairlines"],
  ["maroon", "#5A0A0E", "Primary accent"],
  ["maroon-hover", "#9B111E", "Maroon hover"],
  ["gold", "#C8860D", "Tiny details"],
  ["madder", "#A23B2A", "Sale, errors"],
  ["wine", "#2B0A0C", "Footer, wholesale band"],
] as const;

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-thread py-12">
      <p className="label mb-6 text-gold">{title}</p>
      {children}
    </section>
  );
}

export function Styleguide() {
  const toast = useToast();
  const [modal, setModal] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Indigo");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("all");

  const sample = PRODUCTS.slice(0, 6);
  const sale = PRODUCTS.find((p) => p.salePrice) ?? PRODUCTS[0];
  const soldOut = PRODUCTS.find((p) => p.stock === 0) ?? PRODUCTS[1];

  return (
    <Container as="section" className="py-12">
      <p className="label text-gold">Internal · noindex</p>
      <h1 className="mt-2 font-display text-[40px] font-medium leading-none sm:text-[64px]">
        Styleguide
      </h1>
      <p className="mt-4 max-w-xl text-stone">
        Every shared component and token in one place. Not linked from the site.
      </p>

      <Block id="palette" title="Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {PALETTE.map(([name, hex, use]) => (
            <div key={name}>
              <div className="h-20 border border-thread" style={{ backgroundColor: hex }} />
              <p className="mt-2 text-sm font-medium">--{name}</p>
              <p className="tnum text-xs text-stone">{hex}</p>
              <p className="text-xs text-stone">{use}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="type" title="Typography">
        <p className="font-display text-[40px] font-medium leading-none sm:text-[88px]">
          Cormorant 88
        </p>
        <p className="mt-4 font-display text-[28px] font-medium">Cormorant section title 28 / 40</p>
        <p className="mt-4 text-[16px]">Jost body 16. Nationwide Cash on Delivery, easy exchange.</p>
        <p className="mt-2 font-bangla text-[16px]">ঢাকা থেকে সারা দেশে, হাতে বোনা কাপড়।</p>
        <p className="label mt-4">Small label · new arrivals</p>
        <p className="tnum mt-4 text-[20px] font-medium">৳ 2,45,000 (tabular numbers)</p>
      </Block>

      <Block id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Add to bag</Button>
          <Button variant="outline">Buy now</Button>
          <Button variant="text">Text link</Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 1500);
            }}
          >
            Loading state
          </Button>
          <Button disabled>Disabled</Button>
          <ButtonLink href="/styleguide" variant="outline">
            Link button
          </ButtonLink>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 bg-wine p-6">
          <Button variant="light">Apply for wholesale</Button>
          <Button variant="light-outline">Request a quote</Button>
        </div>
      </Block>

      <Block id="price" title="Price, badges, section header, breadcrumb">
        <div className="flex flex-wrap items-start gap-10">
          <PriceTag price={2450} />
          <PriceTag price={sale.price} salePrice={sale.salePrice} />
          <PriceTag price={245000} size="lg" />
          <div className="flex gap-2">
            <Badge tone="new">New</Badge>
            <Badge tone="sale">Sale</Badge>
            <Badge>Sold out</Badge>
            <Badge tone="gold">Wholesale</Badge>
            <Badge tone="maroon">Est. 2023</Badge>
          </div>
        </div>
        <div className="mt-8">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Men", href: "/category/men" }, { label: "Panjabi" }]} />
        </div>
        <SectionHeader className="mt-8" number="01" label="Men" title="Shop by department" href="/category/men" />
      </Block>

      <Block id="choice" title="Swatches and sizes">
        <div role="radiogroup" aria-label="Colour" className="flex gap-3">
          {["Indigo", "Maroon", "Ivory", "Olive"].map((n, i) => (
            <Swatch
              key={n}
              name={n}
              hex={["#22375A", "#5A0A0E", "#EFE6D2", "#5F6038"][i]}
              selected={color === n}
              onSelect={() => setColor(n)}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-stone">Selected: {color}</p>
        <div role="radiogroup" aria-label="Size" className="mt-6 flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <SizeButton key={s} label={s} selected={size === s} soldOut={s === "XXL"} onSelect={() => setSize(s)} />
          ))}
        </div>
        <div className="mt-6">
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
      </Block>

      <Block id="forms" title="Form fields">
        <div className="grid max-w-3xl gap-5 sm:grid-cols-2">
          <Input label="Full name" placeholder="Your name" hint="As on your ID" required />
          <Input label="Phone" placeholder="01XXXXXXXXX" error="Enter a valid Bangladeshi number" />
          <Select label="District" defaultValue="">
            <option value="" disabled>
              Choose district
            </option>
            <option>Dhaka</option>
            <option>Chattogram</option>
          </Select>
          <Checkbox label="I agree to the terms" />
          <Textarea className="sm:col-span-2" label="Note" placeholder="Anything we should know?" />
        </div>
      </Block>

      <Block id="disclosure" title="Accordion and tabs">
        <div className="grid gap-10 md:grid-cols-2">
          <Accordion
            defaultOpen={[FAQS[0].id]}
            items={FAQS.slice(0, 3).map((f) => ({ id: f.id, title: f.q, content: f.a }))}
          />
          <Tabs
            items={[
              { id: "desc", label: "Description", content: "Handloom cotton, finished by hand in Dhaka." },
              { id: "care", label: "Fabric & care", content: "Cold wash, dry in shade, iron on reverse." },
              { id: "del", label: "Delivery", content: "Inside Dhaka 1–2 days." },
            ]}
          />
        </div>
      </Block>

      <Block id="overlays" title="Modal, sheet, toast">
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={() => setModal(true)}>
            Open modal
          </Button>
          <Button variant="outline" onClick={() => setSheet(true)}>
            Open sheet
          </Button>
          <Button variant="outline" onClick={() => toast("Added to bag", { actionLabel: "Undo" })}>
            Show toast
          </Button>
        </div>
        <Modal open={modal} onClose={() => setModal(false)} title="Size guide">
          <p className="text-stone">Chest, waist and length in inches. TODO: real size table.</p>
        </Modal>
        <Sheet
          open={sheet}
          onClose={() => setSheet(false)}
          title="Filters"
          footer={<Button full onClick={() => setSheet(false)}>Show 24 results</Button>}
        >
          <p className="text-stone">Bottom sheet on mobile, side panel on desktop.</p>
        </Sheet>
      </Block>

      <Block id="states" title="Skeleton and empty state">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <div className="col-span-2 space-y-3">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <EmptyState
          title="No products match these filters"
          text="Try removing a filter or two."
          action={<Button variant="outline">Clear filters</Button>}
        />
      </Block>

      <Block id="motion" title="Motion (reload to replay)">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <TextLines lines={["Cloth that keeps", "the cold out"]} as="h2" trigger="mount" className="font-display text-[40px] font-medium leading-[1.02] sm:text-[64px]" />
            <Reveal className="mt-6 text-stone">Reveal: fade in and rise 16px when 20% visible.</Reveal>
          </div>
          <RevealImage>
            <Img src={photo("hero-06-fabric-textile").src} alt="Suiting fabrics and tailoring tools" position="20% 50%" ratio="aspect-[5/4]" sizes="(min-width: 768px) 45vw, 100vw" />
          </RevealImage>
          <div className="relative aspect-[16/9] overflow-hidden md:col-span-2">
            <SlowZoom className="absolute inset-0">
              <Img src={photo("hero-04-saree-maroon").src} alt="Woman in a maroon Banarasi silk saree" ratio="" className="absolute inset-0" sizes="100vw" />
            </SlowZoom>
          </div>
        </div>
        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((n, i) => (
            <StaggerItem key={n} index={i} className="border border-thread bg-paper p-6 text-sm">
              Stagger item {n}
            </StaggerItem>
          ))}
        </Stagger>
      </Block>

      <Block id="cards" title="Product cards">
        <Tabs
          ariaLabel="Filter"
          value={tab}
          onChange={setTab}
          items={[
            { id: "all", label: "All" },
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
          ]}
          className="mb-6"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {sample
            .filter((p) => tab === "all" || p.category === tab)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          <ProductCard product={sale} />
          <ProductCard product={soldOut} />
        </div>
      </Block>

      <Block id="images" title="Photo library">
        <PhotoSheet />
      </Block>
    </Container>
  );
}
