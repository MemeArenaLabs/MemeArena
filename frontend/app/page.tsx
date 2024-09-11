"use client";
import Link from "next/link";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <main>
      <section className="layout">
        <h2> Landing page</h2>
        <Link href={"/app"}>
          <Button>Launch App</Button>
        </Link>
      </section>
    </main>
  );
}
