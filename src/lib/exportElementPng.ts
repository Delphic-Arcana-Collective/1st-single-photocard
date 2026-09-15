import { toPng } from "html-to-image";

export async function exportElementPng(
  node: HTMLElement,
  filename: string,
  options?: { pixelRatio?: number },
) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: options?.pixelRatio ?? 3,
    backgroundColor: undefined,
    style: {
      transform: "none",
      position: "relative",
      inset: "auto",
      boxShadow: "none",
    },
  });

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
