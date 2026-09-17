import { toPng } from "html-to-image";

/**
 * Cross-origin stylesheets throw SecurityError on cssRules;
 * skip those sheets so html-to-image can continue.
 */
function skipCrossOriginStylesheets(node: HTMLElement) {
  if (node.tagName !== "LINK") return true;
  const link = node as HTMLLinkElement;
  if (!link.href) return true;
  try {
    const sheet = link.sheet;
    if (!sheet) return true;
    void sheet.cssRules;
    return true;
  } catch {
    return false;
  }
}

export async function exportElementPng(
  node: HTMLElement,
  filename: string,
  options?: { pixelRatio?: number },
) {
  // PNG is lossless; high pixelRatio for print-quality A8 export.
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: options?.pixelRatio ?? 4,
    backgroundColor: undefined,
    skipFonts: false,
    filter: skipCrossOriginStylesheets,
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
