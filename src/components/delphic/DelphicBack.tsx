import { QRCodeSVG } from "qrcode.react";

export const DELPHIC_QQ_LINK = "https://qm.qq.com/q/aKFEQOR6OQ";

/** 浅色羊皮纸上的码点：黑色 */
const QR_INK = "#1a1512";

/**
 * 两端尖尖 + 三座陡峰；谷底压低，落差更陡。
 */
const WAVE_LEFT = [
  2, 6, 18, 48, 88, 100, 52, 12, 4, 28, 72, 100, 68, 16, 5, 32, 78, 100, 70,
  28, 10, 4, 2,
];
const WAVE_RIGHT = [
  2, 4, 10, 28, 70, 100, 78, 32, 5, 16, 68, 100, 72, 28, 4, 12, 52, 100, 88,
  48, 18, 6, 2,
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
  /** 竖线略加密，仍保持疏朗 */
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
        const h = Math.max(1.2, (amp / 100) * 38);
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

      <p className="delphic-back__intro">
        有没有一种可能？在某条世界线里易者的复活赛打赢了？然后它逃到了外界开了一家塔罗摊子呢？
        什么？我打灵梦？会赢吗？会的！
      </p>

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
