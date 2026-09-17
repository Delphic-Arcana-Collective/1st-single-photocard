"use client";

import {
  type ReactNode,
  type Ref,
  useCallback,
  useState,
} from "react";
import "./FlipCard.css";

export type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  /** width:height, default A8 (52×74 mm) */
  aspectRatio?: `${number} / ${number}` | string;
  className?: string;
  flipped?: boolean;
  defaultFlipped?: boolean;
  onFlippedChange?: (flipped: boolean) => void;
  frontRef?: Ref<HTMLDivElement>;
  backRef?: Ref<HTMLDivElement>;
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  (ref as React.MutableRefObject<T | null>).current = value;
}

export default function FlipCard({
  front,
  back,
  aspectRatio = "52 / 74",
  className,
  flipped: flippedProp,
  defaultFlipped = false,
  onFlippedChange,
  frontRef,
  backRef,
}: FlipCardProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultFlipped);
  const flipped = flippedProp ?? uncontrolled;

  const setFlipped = useCallback(
    (next: boolean) => {
      if (flippedProp === undefined) setUncontrolled(next);
      onFlippedChange?.(next);
    },
    [flippedProp, onFlippedChange],
  );

  const setFrontNode = useCallback(
    (node: HTMLDivElement | null) => assignRef(frontRef, node),
    [frontRef],
  );
  const setBackNode = useCallback(
    (node: HTMLDivElement | null) => assignRef(backRef, node),
    [backRef],
  );

  return (
    <button
      type="button"
      className={["flip-card", className].filter(Boolean).join(" ")}
      style={{ aspectRatio }}
      onClick={() => setFlipped(!flipped)}
      aria-pressed={flipped}
      aria-label={flipped ? "翻回正面" : "翻到背面"}
    >
      <div className={`flip-card__inner${flipped ? " is-flipped" : ""}`}>
        <div ref={setFrontNode} className="flip-card__face flip-card__face--front">
          {front}
        </div>
        <div ref={setBackNode} className="flip-card__face flip-card__face--back">
          {back}
        </div>
      </div>
    </button>
  );
}
