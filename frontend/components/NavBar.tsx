import React from "react";
import SolanaConnectButton from "./SolanaConnectButton";

export default function NavBar() {
  return (
    <nav className="flex justify-end gap-2 mb-6">
      <SolanaConnectButton />
    </nav>
  );
}
