import React from "react";
import Link from "next/link";
import { Button } from "../components/Button";
import { Close, Info } from "@nine-thirty-five/material-symbols-react/outlined";
import SvgIcon from "@/utils/SvgIcon";

export default function Home() {
  return (
    <main>
      <section className="layout gap-6 mb-6">
        <h2>Landing page</h2>
        <Link href={"/app"}>
          <Button>Launch App</Button>
        </Link>
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
          <p>Colors</p>
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
        <div className="flex flex-col gap-2 p-2 bg-[#444444]">
          <p>Game Icons</p>
          <div className="flex gap-2">
            <SvgIcon name="avoidance" className="text-blue h-12 w-12" />
            <SvgIcon name="book-cover" className="text-red-600 h-12 w-12" />
            <SvgIcon name="all-for-one" className="text-yellow h-12 w-12" />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2 bg-[#444444]">
          <p>Material symbols</p>
          <div className="flex gap-2">
            <Close className="h-7 w-7 text-yellow" />
            <Info className="h-7 w-7 text-blue-70" />
          </div>
        </div>
      </section>
    </main>
  );
}
