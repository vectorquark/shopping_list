"use client";

import React, { useState } from "react";
import Link from "next/link";
import CartButton from "./cart-button";
import ShoppingCartModal from "./shopping-cart-modal";

export default function SiteHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
            MealDB Search
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-700">
            <Link href="/" className="transition hover:text-zinc-900">
              Home
            </Link>
            <Link href="/search" className="transition hover:text-zinc-900">
              Search
            </Link>
            <CartButton onClick={() => setIsCartOpen(true)} />
          </div>
        </nav>
      </header>

      <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
