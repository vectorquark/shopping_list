import React from "react";

type MealMetaProps = {
  category: string | null;
  area: string | null;
  tags: string | null;
};

export default function MealMeta({ category, area, tags }: MealMetaProps) {
  return (
    <div className="mt-4 space-y-2 text-sm text-zinc-700">
      <p>
        <span className="font-semibold text-zinc-900">Category:</span>{" "}
        {category || "Unknown"}
      </p>
      <p>
        <span className="font-semibold text-zinc-900">Area:</span>{" "}
        {area || "Unknown"}
      </p>
      {tags && (
        <p>
          <span className="font-semibold text-zinc-900">Tags:</span>{" "}
          {tags}
        </p>
      )}
    </div>
  );
}