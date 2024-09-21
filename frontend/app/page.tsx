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
        <h1>Heading1 test 96</h1>
        <h2>Heading2 test 64</h2>
        <h3>Heading3 test 32</h3>
        <p>paragraph test 16</p>
        <p className="text-[14px]">paragraph test 14</p>
        <p className="text-[12px]">paragraph test 12</p>
        <p className="text-[10px]">paragraph test 10</p>
      </section>
    </main>
  );
}
