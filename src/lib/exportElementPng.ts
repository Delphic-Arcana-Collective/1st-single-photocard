import { getFontEmbedCSS, toPng } from "html-to-image";

/** A8 photocard dimensions (mm). Fixed export size for consistent print output. */
const A8_WIDTH_MM = 52;
const A8_HEIGHT_MM = 74;
/** High-fidelity print target (300 is standard; 600 is archive/print crisp). */
const TARGET_PRINT_DPI = 600;

/**
 * Calculate fixed A8 export dimensions at target print DPI.
 * Returns pixel dimensions that remain constant regardless of browser zoom or viewport size.
 */
function getExportDimensions(): { width: number; height: number } {
  return {
    width: Math.round((A8_WIDTH_MM / 25.4) * TARGET_PRINT_DPI),
    height: Math.round((A8_HEIGHT_MM / 25.4) * TARGET_PRINT_DPI),
  };
}

/** html-to-image console.errors on opaque cross-origin sheets (CDN without CORS, extensions). */
function isCssRulesSecurityNoise(args: unknown[]): boolean {
  const text = args
    .map((a) => {
      if (typeof a === "string") return a;
      if (a instanceof Error) return `${a.name}: ${a.message}`;
      return String(a ?? "");
    })
    .join(" ");
  return (
    text.includes("cssRules") ||
    text.includes("Error inlining remote css") ||
    text.includes("Error while reading CSS rules") ||
    text.includes("Cannot access rules")
  );
}

async function withQuietedCssRulesErrors<T>(fn: () => Promise<T>): Promise<T> {
  const original = console.error;
  console.error = (...args: unknown[]) => {
    if (isCssRulesSecurityNoise(args)) return;
    original.apply(console, args as Parameters<typeof console.error>);
  };
  try {
    return await fn();
  } finally {
    console.error = original;
  }
}

export async function exportElementPng(
  node: HTMLElement,
  filename: string,
) {
  const { width, height } = getExportDimensions();

  // Pre-embed fonts, then skipFonts so toPng does not re-walk document.styleSheets.
  const dataUrl = await withQuietedCssRulesErrors(async () => {
    const fontEmbedCSS = await getFontEmbedCSS(node);
    return toPng(node, {
      cacheBust: true,
      width,
      height,
      pixelRatio: 1,
      skipAutoScale: true,
      skipFonts: true,
      fontEmbedCSS,
      preferredFontFormat: "woff2",
      backgroundColor: undefined,
      style: {
        // Identity transform (not `none`) keeps containing-block for absolute kids.
        // Clears back-face rotateY(180deg) without collapsing layout.
        transform: "translate(0, 0)",
        position: "relative",
        left: "0",
        top: "0",
        right: "auto",
        bottom: "auto",
        inset: "auto",
        width: `${width}px`,
        height: `${height}px`,
        margin: "0",
        boxShadow: "none",
      },
    });
  });

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
