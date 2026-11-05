import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Floating chat button, bottom-right. Expands to "Chat with us" on hover/focus. */
export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 z-40 flex h-12 items-center overflow-hidden rounded-[2px] bg-maroon text-cotton transition-colors duration-150 hover:bg-maroon-hover focus-visible:bg-maroon-hover sm:right-6"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center">
        <WhatsAppIcon width={24} height={24} />
      </span>
      <span className="label max-w-0 overflow-hidden whitespace-nowrap pr-0 opacity-0 transition-all duration-300 ease-out group-hover:max-w-40 group-hover:pr-4 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:pr-4 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
