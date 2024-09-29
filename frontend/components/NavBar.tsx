"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";

export default function NavBar() {
  return (
    <nav className="flex justify-end gap-2 mb-6">
      <WalletMultiButton style={{}} />
    </nav>
  );
}
