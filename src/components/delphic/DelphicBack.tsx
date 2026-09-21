import { QRCodeSVG } from "qrcode.react";

export const DELPHIC_QQ_LINK = "https://music.163.com/#/song?id=3413721307&uct2=U2FsdGVkX1/7SGMThjdbjzQ5/b33M+rcEroAilVAqxE=";

/** 浅色羊皮纸上的码点：黑色 */
const QR_INK = "#1a1512";

/**
 * 两端尖尖 + 两座尖峰；压缩器式音头——攻放都陡、峰体收窄。
 */
const WAVE_LEFT = [
  6, 7, 9, 12, 16, 22, 48, 92, 100, 58, 22, 12, 10, 14, 20, 42, 88, 100, 62,
  24, 14, 10, 8, 6,
];
const WAVE_RIGHT = [
  6, 8, 10, 14, 24, 62, 100, 88, 42, 20, 14, 10, 12, 22, 58, 100, 92, 48, 22,
  16, 12, 9, 7, 6,
];

export const SOCIAL_ACCOUNTS = [
  {
    id: "bilibili",
    label: "Bilibili",
    account: "Delphic-秘仪社",
    icon: "/icons/bilibili.svg",
  },
  {
    id: "xiaohongshu",
    label: "小红书",
    account: "Delphic-秘仪社",
    icon: "/icons/xiaohongshu.svg",
  },
  {
    id: "netease",
    label: "网易云",
    account: "Delphic Arcana Collective",
    icon: "/icons/neteasecloudmusic.svg",
  },
  {
    id: "email",
    label: "邮箱",
    account: "contact@delphic.studio",
    icon: "/icons/email.svg",
  },
] as const;

function TrackWaveform({
  samples,
  side,
}: {
  samples: number[];
  side: "left" | "right";
}) {
  const n = samples.length;
  /** 竖线略疏，尖端仍可见 */
  const gap = 2.15;
  const barW = (100 - gap * (n - 1)) / n;

  return (
    <svg
      className={`delphic-back__wave delphic-back__wave--${side}`}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden
    >
      {samples.map((amp, i) => {
        const h = Math.max(2.4, (amp / 100) * 38);
        const x = i * (barW + gap);
        const y = (40 - h) / 2;
        return (
          <rect
            key={`${side}-${i}`}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx={0}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

export default function DelphicBack() {
  return (
    <div className="delphic-back">
      <header className="delphic-back__tracks">
        <p className="delphic-back__title">目</p>
        <p className="delphic-back__original">
          (Original: U.N.オーエンは彼女なのか)
        </p>
      </header>

      <div className="delphic-back__qr-stage">
        <div className="delphic-back__qr-cluster">
          <TrackWaveform samples={WAVE_LEFT} side="left" />

          <div className="delphic-back__qr-frame">
            <div className="delphic-back__qr-inner">
              <div className="delphic-back__qr">
                <QRCodeSVG
                  value={DELPHIC_QQ_LINK}
                  size={256}
                  level="H"
                  marginSize={0}
                  bgColor="transparent"
                  fgColor={QR_INK}
                  className="delphic-back__qr-svg"
                />
              </div>
              <p className="delphic-back__music-link">MUSIC LINK</p>
            </div>
          </div>

          <TrackWaveform samples={WAVE_RIGHT} side="right" />
        </div>
      </div>

      {/*
        Fixed-height slot: keeps QR / rule / socials proportions stable.
        Intro copy is absolutely positioned inside and never grows the flex layout.
      */}
      <div className="delphic-back__intro-slot">
        <div className="delphic-back__intro">
          <p>塔罗的占卜、音乐的旋律、东方的幻梦，</p>
          <p>三者交汇之处，就是我们。</p>
        </div>
      </div>

      <div className="delphic-back__rule" aria-hidden />

      <ul className="delphic-back__socials">
        {SOCIAL_ACCOUNTS.map((item) => (
          <li key={item.id} className="delphic-back__social">
            <span
              className={`delphic-back__social-icon delphic-back__social-icon--${item.id}`}
              style={{
                maskImage: `url(${item.icon})`,
                WebkitMaskImage: `url(${item.icon})`,
              }}
              role="img"
              aria-label={item.label}
            />
            <span
              className={`delphic-back__social-id delphic-back__social-id--${item.id}`}
            >
              {item.id === "email" ? (
                <>
                  contact
                  <br />
                  @delphic.studio
                </>
              ) : item.id === "netease" ? (
                <>
                  Delphic Arcana
                  <br />
                  Collective
                </>
              ) : (
                item.account
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
