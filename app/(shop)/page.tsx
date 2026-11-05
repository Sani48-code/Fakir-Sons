// TEMPORARY placeholder so the transparent -> solid header can be reviewed.
// Replaced by the real hero slider + home sections in a later step.
export default function HomePage() {
  return (
    <>
      <section className="flex h-[85vh] items-end bg-neutral-800 px-4 pb-16 text-white lg:px-8">
        <div>
          <h1 className="font-display text-4xl sm:text-6xl">Hero placeholder</h1>
          <p className="mt-3 text-white/70">Scroll down: the header turns solid.</p>
        </div>
      </section>
      <section className="h-[120vh] px-4 py-16 lg:px-8">
        <p className="text-black/50">More page content placeholder.</p>
      </section>
    </>
  );
}
