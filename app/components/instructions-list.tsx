import React from "react";

type InstructionsListProps = {
  strInstructions: string | null;
};

export default function InstructionsList({
  strInstructions,
}: InstructionsListProps) {

  // some recipes include step labels in the instructions, which we want to filter out
  const STEP_LABEL_LINE_PATTERN = /^step\s+\d+[:.)-]?$/i;

  const items = (strInstructions ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !STEP_LABEL_LINE_PATTERN.test(line));

  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">Instructions unavailable</p>;
  }

  return (
    <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-700">
      {items.map((line, index) => (
        <li key={`${index}-${line.slice(0, 24)}`}>{line}</li>
      ))}
    </ol>
  );
}
