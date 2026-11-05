"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-16">
      <EmptyState
        title="Something went wrong"
        text="Please try again. If it keeps happening, call us."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Container>
  );
}
