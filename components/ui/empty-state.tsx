import type { ReactNode } from "react";

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <p className="label mb-4 text-gold">Nothing here</p>
      <h2 className="font-display text-[28px] font-medium leading-tight sm:text-[40px]">{title}</h2>
      {text && <p className="mt-3 text-[15px] text-stone">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
