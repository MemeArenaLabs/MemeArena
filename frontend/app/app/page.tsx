"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Token } from "@/types/tokens";
import { useBalances } from "@/hooks/useBalances";

const tokens = [Token.BONK, Token.SOL, Token.WIF];

export default function MainApp() {
  useEffect(()=>{
    console.log('INICIO')
  },[])
  useEffect(()=>{
    console.log('AAAAAAAAA')
  },[tokens])
  const { balances, loading } = useBalances(tokens)
  console.log(balances)
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
