import { getFontEmbedCSS, toPng } from "html-to-image";

/** A8 photocard short edge (mm). Used to target print DPI. */
const A8_WIDTH_MM = 52;
/** High-fidelity print target (300 is standard; 600 is archive/print crisp). */
const TARGET_PRINT_DPI = 600;
const MIN_PIXEL_RATIO = 3;
/** Stay under typical browser canvas dimension limits (~16384). */
const MAX_PIXEL_RATIO = 6;

function resolvePixelRatio(node: HTMLElement, requested?: number): number {
  if (requested != null && requested > 0) return requested;
  const cssWidth = Math.max(node.offsetWidth, 1);
  const targetPx = (A8_WIDTH_MM / 25.4) * TARGET_PRINT_DPI;
  return Math.min(
    MAX_PIXEL_RATIO,
    Math.max(MIN_PIXEL_RATIO, Math.ceil(targetPx / cssWidth)),
  );
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
  options?: { pixelRatio?: number },
) {
  const pixelRatio = resolvePixelRatio(node, options?.pixelRatio);

  // Pre-embed fonts, then skipFonts so toPng does not re-walk document.styleSheets.
  // Our WenKai <link crossOrigin="anonymous"> makes that sheet readable; quieting
  // covers remaining opaque sheets (browser extensions, etc.) that still log noise.
  const dataUrl = await withQuietedCssRulesErrors(async () => {
    const fontEmbedCSS = await getFontEmbedCSS(node);
    return toPng(node, {
      cacheBust: true,
      pixelRatio,
      skipAutoScale: true,
      skipFonts: true,
      fontEmbedCSS,
      preferredFontFormat: "woff2",
      backgroundColor: undefined,
      style: {
        transform: "none",
        position: "relative",
        inset: "auto",
        boxShadow: "none",
      },
    });
  });

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
