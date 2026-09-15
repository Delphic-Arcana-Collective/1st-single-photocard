import Image from "next/image";

export default function DelphicFront() {
  return (
    <div className="delphic-front">
      <div className="delphic-front__stack">
        <div className="delphic-front__art">
          <Image
            src="/main_a.png"
            alt="德尔菲秘仪社 1st Single 封面"
            fill
            priority
            sizes="(max-width: 560px) 90vw, 420px"
            className="delphic-front__art-img"
          />
        </div>
        <div className="delphic-front__footer">
          <div className="delphic-front__logo">
            <Image
              src="/textlogo.png"
              alt="德尔菲秘仪社"
              width={2224}
              height={416}
              className="delphic-front__logo-img"
              priority
            />
          </div>
          <p className="delphic-front__label">
            <span className="delphic-front__label-rule" aria-hidden />
            <span className="delphic-front__label-text">
              「THE DE∀IL」 ~ 1st Single
            </span>
            <span className="delphic-front__label-rule" aria-hidden />
          </p>
        </div>
      </div>
    </div>
  );
}
