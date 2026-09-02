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
            toi uu hoa anh cua Next co the gay tre/loi khi chup. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt={card.name} className="art" crossOrigin="anonymous" />
        <div className="brand-badge">🎁 chonquachuan.vn</div>
        <div className="text-block">
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
          text-shadow: none;
        }
        .text-block {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 20px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: left;
        }
        .to, .msg, .from {
          text-shadow: 0 1px 4px rgba(0,0,0,0.85), 0 1px 14px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.9);
        }
        .to {
          font-size: 15.5px;
          font-weight: 600;
          color: #FFFFFF;
        }
        .msg {
          font-family: var(--font-lora), Georgia, serif;
          font-style: italic;
          font-size: 13.5px;
          color: #F4EFE8;
          line-height: 1.55;
          margin-top: 6px;
        }
        .from {
          font-size: 13px;
          font-weight: 700;
          color: #FFD8A8;
          margin-top: 8px;
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
