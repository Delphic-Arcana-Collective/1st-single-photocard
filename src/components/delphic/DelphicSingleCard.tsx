"use client";

import { type Ref } from "react";
import FlipCard from "@/components/FlipCard";
import DelphicFront from "./DelphicFront";
import DelphicBack from "./DelphicBack";
import "./delphic-single.css";

type DelphicSingleCardProps = {
  frontRef?: Ref<HTMLDivElement>;
  backRef?: Ref<HTMLDivElement>;
};

export default function DelphicSingleCard({
  frontRef,
  backRef,
}: DelphicSingleCardProps) {
  return (
    <FlipCard
      front={<DelphicFront />}
      back={<DelphicBack />}
      frontRef={frontRef}
      backRef={backRef}
    />
  );
}
