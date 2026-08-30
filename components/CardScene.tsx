const STARS = [
  { x: 12, y: 14, s: 2 },
  { x: 82, y: 10, s: 1.6 },
  { x: 70, y: 22, s: 2.2 },
  { x: 20, y: 30, s: 1.4 },
  { x: 90, y: 34, s: 1.8 },
  { x: 8, y: 46, s: 1.6 },
  { x: 60, y: 8, s: 1.4 },
  { x: 35, y: 12, s: 1.8 },
];

export default function CardScene({
  tu,
  den,
  loiNhan,
}: {
  tu: string;
  den: string;
  loiNhan: string;
}) {
  const message =
    loiNhan || "Chúc bạn một mùa trăng tròn đầy, an lành và ấm áp bên người thương.";

  return (
    <div className="scene">
      <div className="stars">
        {STARS.map((st, i) => (
          <span
            key={i}
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              animationDelay: `${(i % 4) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="moon-glow">
        <div className="moon" />
      </div>

      <svg className="bird" viewBox="0 0 120 70" fill="none">
        <g stroke="#D9BC62" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 40 C42 20, 58 16, 70 24 C60 24, 50 30, 46 38 C56 34, 66 34, 74 40 C62 40, 52 44, 48 50" />
        </g>
        <g className="lantern" transform="translate(74,42)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#D9BC62" strokeWidth="1.4" />
          <rect x="-8" y="8" width="16" height="18" rx="4" fill="#D9BC62" opacity="0.92" />
          <rect x="-8" y="8" width="16" height="18" rx="4" fill="none" stroke="#F5EFDD" strokeWidth="1" />
          <line x1="-8" y1="17" x2="8" y2="17" stroke="#F5EFDD" strokeWidth="0.8" opacity="0.7" />
        </g>
      </svg>

      <svg className="branch" viewBox="0 0 440 90" fill="none" preserveAspectRatio="none">
        <g stroke="#D9BC62" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M20 90 C 40 60, 30 40, 55 20" />
          <path d="M55 20 C 48 22, 40 20, 36 12" />
          <path d="M55 20 C 62 22, 68 18, 70 10" />
          <circle cx="70" cy="10" r="3" fill="#D9BC62" stroke="none" />
          <path d="M420 90 C 400 55, 412 35, 388 14" />
          <path d="M388 14 C 395 16, 403 13, 406 5" />
          <path d="M388 14 C 381 17, 373 14, 370 7" />
          <circle cx="370" cy="7" r="3" fill="#D9BC62" stroke="none" />
        </g>
      </svg>

      <div className="text-block">
        <span className="kicker">Chọn Quà Chuẩn</span>
        <h1 className="headline">Trung Thu An Lành</h1>
        <p className="to">
          Gửi tới <strong>{den}</strong>
        </p>
        <p className="msg">&ldquo;{message}&rdquo;</p>
        <p className="from">— Từ {tu}</p>
      </div>

      <style>{`
        .scene {
          position: relative;
          width: 100%;
          max-width: 440px;
          aspect-ratio: 3 / 4;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          background:
            radial-gradient(120% 70% at 50% 100%, rgba(217,188,98,0.10) 0%, transparent 60%),
            linear-gradient(180deg, #001b40 0%, #00337f 45%, #00409a 75%, #0a2f6b 100%);
          box-shadow: 0 20px 50px rgba(0,20,60,0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }
        .stars { position: absolute; inset: 0; }
        .stars span {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          opacity: 0.75;
          animation: twinkle 2.4s ease-in-out infinite;
        }
        .moon-glow {
          position: absolute;
          top: 8%;
          left: 50%;
          width: 150px;
          height: 150px;
          transform: translate(-50%, 0);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251,248,242,0.35) 0%, rgba(251,248,242,0) 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: riseIn 1.6s ease-out both;
        }
        .moon {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 35%, #FFFDF6 0%, #FBF8F2 55%, #E9DFC5 100%);
          box-shadow: 0 0 32px rgba(251,248,242,0.55);
        }
        .bird {
          position: absolute;
          top: 20%;
          left: 8%;
          width: 42%;
          height: auto;
          animation: flyIn 1.4s ease-out 0.5s both;
        }
        .lantern {
          transform-origin: 0px 0px;
          animation: glow 3s ease-in-out infinite alternate;
        }
        .branch {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 22%;
          animation: fadeUp 1s ease-out 0.3s both;
        }
        .text-block {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 22px 26px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }
        .kicker {
          color: #D9BC62;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          animation: fadeUp 0.7s ease-out 0.2s both;
        }
        .headline {
          color: #FBF8F2;
          font-family: var(--font-lora), Georgia, serif;
          font-size: 26px;
          font-weight: 600;
          margin: 2px 0 6px;
          animation: fadeUp 0.7s ease-out 0.5s both;
        }
        .to {
          color: #F5EFDD;
          font-size: 15px;
          animation: fadeUp 0.7s ease-out 0.85s both;
        }
        .msg {
          color: rgba(245,239,221,0.88);
          font-size: 13.5px;
          font-style: italic;
          line-height: 1.55;
          max-width: 320px;
          margin-top: 4px;
          animation: fadeUp 0.7s ease-out 1.15s both;
        }
        .from {
          color: #D9BC62;
          font-size: 13px;
          font-weight: 600;
          margin-top: 8px;
          animation: fadeUp 0.7s ease-out 1.4s both;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.9; }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translate(-50%, 24px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes flyIn {
          from { opacity: 0; transform: translate(-24px, 8px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes glow {
          from { filter: drop-shadow(0 0 2px rgba(217,188,98,0.4)); }
          to { filter: drop-shadow(0 0 8px rgba(217,188,98,0.9)); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .stars span, .moon-glow, .bird, .lantern, .branch, .kicker, .headline, .to, .msg, .from {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
