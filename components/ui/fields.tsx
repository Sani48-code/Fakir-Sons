"use client";

import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/format";
import { CheckIcon } from "@/components/shop/icons";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

const CONTROL =
  "w-full rounded-[2px] border bg-paper px-3 text-[15px] text-ink placeholder:text-stone/70 transition-colors duration-150 focus-visible:border-ink disabled:opacity-50";

function Wrap({
  id,
  label,
  hint,
  error,
  className,
  required,
  children,
}: FieldProps & { id: string; required?: boolean; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="label text-ink">
        {label}
        {required && (
          <span aria-hidden className="text-madder">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} role="alert" className="text-xs text-madder">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-xs text-stone">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function describe(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? `${id}-msg` : undefined,
  } as const;
}

export function Input({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrap id={id} label={label} hint={hint} error={error} className={className} required={rest.required}>
      <input
        id={id}
        className={cn(CONTROL, "h-12", error ? "border-madder" : "border-thread")}
        {...describe(id, error, hint)}
        {...rest}
      />
    </Wrap>
  );
}

export function Select({
  label,
  hint,
  error,
  className,
  children,
  ...rest
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrap id={id} label={label} hint={hint} error={error} className={className} required={rest.required}>
      <select
        id={id}
        className={cn(CONTROL, "h-12", error ? "border-madder" : "border-thread")}
        {...describe(id, error, hint)}
        {...rest}
      >
        {children}
      </select>
    </Wrap>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrap id={id} label={label} hint={hint} error={error} className={className} required={rest.required}>
      <textarea
        id={id}
        rows={4}
        className={cn(CONTROL, "py-3", error ? "border-madder" : "border-thread")}
        {...describe(id, error, hint)}
        {...rest}
      />
    </Wrap>
  );
}

export function Checkbox({
  label,
  hint,
  error,
  className,
  ...rest
}: FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            className="peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-[2px] border border-ink bg-paper checked:bg-ink"
            {...describe(id, error, hint)}
            {...rest}
          />
          <CheckIcon
            width={14}
            height={14}
            className="pointer-events-none relative text-cotton opacity-0 peer-checked:opacity-100"
          />
        </span>
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-msg`} role="alert" className="text-xs text-madder">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-xs text-stone">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
