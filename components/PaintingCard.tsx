import type { TrungThuCard } from "@/lib/trungThuCards";

export default function PaintingCard({
  card,
  tu,
  den,
  loiNhan,
}: {
  card: TrungThuCard;
  tu: string;
  den: string;
  loiNhan: string;
}) {
  const message = loiNhan || card.defaultMessage;

  return (
    <div className="painting-card">
      <div className="frame" id="thiep-capture-frame">
        {/* Dung the img thuong (khong qua next/image) de dam bao chup anh
            bang html-to-image luon lay dung file goc, khong qua endpoint
            toi uu hoa anh cua Next co the gay tre/loi khi chup. KHONG dat
            crossOrigin vi anh la cung goc (/public) — vai trinh duyet trong
            app (Zalo) xu ly nghiem ngat che do CORS nay, khien anh bi coi
            la "nhiem ban" va xuat ra trang/xam khi chup thanh PNG. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt={card.name} className="art" />
        <div className="brand-badge">🎁 chonquachuan.vn</div>
        <div className="text-panel">
          <p className="to">
            Gửi tới <strong>{den}</strong>
          </p>
          <p className="msg">&ldquo;{message}&rdquo;</p>
          <p className="from">— Từ {tu}</p>
        </div>
      </div>

      <style>{`
        .painting-card {
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: rise 0.8s ease-out both;
        }
        .frame {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 18px 44px rgba(58, 47, 38, 0.18);
          background: #fff;
        }
        .art {
          width: 100%;
          height: auto;
          display: block;
        }
        .brand-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(20,15,10,0.5);
          color: #fff;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .text-panel {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          padding: 11px 16px 13px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
          border-radius: 14px;
          background: rgba(35, 26, 18, 0.42);
          border: 1px solid rgba(255,255,255,0.28);
          box-shadow: 0 8px 28px rgba(20,15,10,0.28), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .to {
          font-family: var(--font-lora), Georgia, serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #FFFFFF;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .to strong {
          font-weight: 700;
        }
        .msg {
          font-family: var(--font-lora), Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: 12px;
          color: #FBF6EE;
          line-height: 1.5;
          margin-top: 4px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .from {
          font-family: var(--font-lora), Georgia, serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #FFD8A8;
          margin-top: 6px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .painting-card { animation: none; }
        }
      `}</style>
    </div>
  );
}
