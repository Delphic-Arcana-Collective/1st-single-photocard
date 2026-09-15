import type { Metadata } from "next";
import { Klee_One } from "next/font/google";
import "./globals.css";

const hand = Klee_One({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "德尔菲秘仪社 — 1st Single",
  description: "德尔菲秘仪社 1st Single 收录音盘",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${hand.variable} h-full`}>
      <head>
        {/* 霞鹜文楷：端正、略带手写感，补中文；Apple 上优先 Hannotate SC */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        />
      </head>
      <body className={`${hand.className} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
