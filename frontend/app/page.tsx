"use client";
import Link from "next/link";
import { Button } from "../components/Button";
import { useState } from "react";
import { Modal } from "../components/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main>
      <section className="layout">
        <h2>Landing page</h2>
        <Link href={"/app"}>
          <Button>Launch App</Button>
        </Link>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          title="Example modal"
        >
          Body
        </Modal>
      </section>
    </main>
  );
}
