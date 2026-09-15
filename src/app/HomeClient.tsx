"use client";

import { useCallback, useRef, useState } from "react";
import { DelphicSingleCard } from "@/components/delphic";
import { exportElementPng } from "@/lib/exportElementPng";

export default function HomeClient() {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const exportFace = useCallback(
    async (side: "front" | "back") => {
      const node = side === "front" ? frontRef.current : backRef.current;
      if (!node || exporting) return;

      setExporting(true);
      try {
        await exportElementPng(node, `delphic-1st-single-${side}.png`);
      } catch (err) {
        console.error(err);
        alert("导出失败，请再试一次");
      } finally {
        setExporting(false);
      }
    },
    [exporting],
  );

  return (
    <div className="page-shell">
      <div className="page-actions">
        <button
          type="button"
          className="export-btn"
          disabled={exporting}
          onClick={() => exportFace("front")}
        >
          {exporting ? "导出中…" : "导出正面 PNG"}
        </button>
        <button
          type="button"
          className="export-btn"
          disabled={exporting}
          onClick={() => exportFace("back")}
        >
          {exporting ? "导出中…" : "导出背面 PNG"}
        </button>
      </div>

      <DelphicSingleCard frontRef={frontRef} backRef={backRef} />
      <p className="hint">点击卡片翻转 · 右上角可导出透明底 PNG</p>
    </div>
  );
}
