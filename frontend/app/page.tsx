"use client";
import Link from "next/link";
import { Button } from "../components/Button";
import { useState } from "react";
import { Modal } from "../components/Modal";
import SvgIcon from "@/lib/utils/SvgIcon";

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
        <div>
          <h1>Heading1 test 96</h1>
          <h2>Heading2 test 64</h2>
          <h3>Heading3 test 32</h3>
          <p>paragraph test 16</p>
          <p className="text-[14px]">paragraph test 14</p>
          <p className="text-[12px]">paragraph test 12</p>
          <p className="text-[10px]">paragraph test 10</p>
        </div>
        <div className="flex flex-col gap-2 p-6 bg-[#444444]">
          <div className="flex gap-2">
            <div className="h-20 w-20 bg-yellow"></div>
            <div className="h-20 w-20 bg-dark-blue"></div>
            <div className="h-20 w-20 bg-dark-blue-80"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-20 w-20 bg-dark-blue-50"></div>
            <div className="h-20 w-20 bg-blue-70"></div>
            <div className="h-20 w-20 bg-light-blue"></div>
          </div>
        </div>
        <div className="flex gap-2 p-2 bg-[#444444]">
          <SvgIcon name="all-for-one" size={50} className="text-yellow" />
          <SvgIcon name="broken-heart" size={50} className="text-blue" />
          <SvgIcon name="book-cover" size={50} className="text-red-600" />
        </div>
      </section>
    </main>
  );
}
