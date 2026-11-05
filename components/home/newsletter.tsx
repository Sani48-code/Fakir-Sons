"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/fields";
import { useToast } from "@/components/ui/toast";

export function Newsletter() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: send to the newsletter list (Supabase / email provider) in a later step.
    window.setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast("Thank you. You are on the list.");
    }, 600);
  };

  return (
    <section className="border-t border-thread bg-cotton py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-[28px] font-medium leading-tight sm:text-[40px]">
            Letters from the shop
          </h2>
          <p className="mt-3 text-[15px] text-stone">New cloth, new arrivals and the occasional offer. Once a month.</p>
          <form onSubmit={onSubmit} noValidate aria-label="Newsletter" className="mt-8 flex flex-col items-stretch gap-3 text-left sm:flex-row sm:items-end">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              className="flex-1"
            />
            <Button type="submit" loading={loading} className="bg-maroon hover:bg-maroon-hover">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-stone">We never share your email. Unsubscribe any time.</p>
        </Reveal>
      </Container>
    </section>
  );
}
