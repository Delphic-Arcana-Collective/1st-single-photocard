import { QRCodeSVG } from "qrcode.react";

export const DELPHIC_QQ_LINK = "https://qm.qq.com/q/aKFEQOR6OQ";

/** 各平台账号，按需改 */
export const SOCIAL_ACCOUNTS = [
  {
    id: "xiaohongshu",
    label: "小红书",
    account: "Delphic-秘仪社",
    icon: "/icons/xiaohongshu.svg",
  },
  {
    id: "bilibili",
    label: "Bilibili",
    account: "Delphic-秘仪社",
    icon: "/icons/bilibili.svg",
  },
  {
    id: "netease",
    label: "网易云",
    account: "Delphic Arcana Collective",
    icon: "/icons/neteasecloudmusic.svg",
  },
] as const;

export default function DelphicBack() {
  return (
    <div className="delphic-back">
      <div className="delphic-back__tracks">
        <p className="delphic-back__heading">[収録曲]</p>
        <p className="delphic-back__track">01. 目 (U.N.オーエンは彼女なのか)</p>
      </div>

      <div className="delphic-back__spacer" aria-hidden />

      <div className="delphic-back__bottom">
        <div className="delphic-back__rule" aria-hidden />

        <div className="delphic-back__cta">
          <ul className="delphic-back__socials">
            {SOCIAL_ACCOUNTS.map((item) => (
              <li key={item.id} className="delphic-back__social">
                <span
                  className="delphic-back__social-icon"
                  style={{
                    maskImage: `url(${item.icon})`,
                    WebkitMaskImage: `url(${item.icon})`,
                  }}
                  role="img"
                  aria-label={item.label}
                />
                <span className="delphic-back__social-id">{item.account}</span>
              </li>
            ))}
          </ul>

          <div className="delphic-back__qr">
            <QRCodeSVG
              value={DELPHIC_QQ_LINK}
              size={256}
              level="H"
              marginSize={1}
              bgColor="transparent"
              fgColor="#f3ebe3"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
