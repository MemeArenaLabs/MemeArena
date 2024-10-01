import React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function MainApp() {
  return (
    <main className="flex flex-col gap-8 items-center">
      <h2>Main menu</h2>
      <section className="layout gap-4">
        <Link href="/battle/find">
          <Button>Find a battle</Button>
        </Link>
      </section>
    </main>
  );
}
