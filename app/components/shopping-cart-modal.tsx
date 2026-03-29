"use client";

import React, { useEffect } from "react";

type ShoppingCartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ShoppingCartModal({
  isOpen,
  onClose,
}: ShoppingCartModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopping-cart-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="shopping-cart-title" className="text-lg font-semibold text-zinc-900">
            Shopping Cart
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-zinc-300 px-2.5 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Close
          </button>
        </div>

        <p className="mt-4 text-sm text-zinc-600">No ingredients.</p>
      </aside>
    </div>
  );
}
