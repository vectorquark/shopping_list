import React from "react";

type CartButtonProps = {
  onClick: () => void;
};

export default function CartButton({ onClick }: CartButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
      aria-haspopup="dialog"
      aria-label="Open shopping list"
    >
      Shopping List
    </button>
  );
}
