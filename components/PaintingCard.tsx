import Image from "next/image";
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
      <div className="frame">
        <Image
          src={card.image}
          alt={card.name}
          width={720}
          height={960}
          className="art"
          priority
        />
      </div>

      <div className="text-block">
        <span className="kicker">Chọn Quà Chuẩn · Tranh vẽ tay thật</span>
        <h1 className="headline">{card.name}</h1>
        <p className="to">
          Gửi tới <strong>{den}</strong>
        </p>
        <p className="msg">&ldquo;{message}&rdquo;</p>
        <p className="from">— Từ {tu}</p>
        <p className="brand">chonquachuan.vn</p>
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
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 18px 44px rgba(58, 47, 38, 0.18);
          background: #fff;
          padding: 10px;
          border: 1px solid var(--line);
        }
        .art {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
        }
        .text-block {
          width: 100%;
          padding: 24px 10px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
        }
        .kicker {
          color: var(--accent);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .headline {
          font-family: var(--font-lora), Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--ink);
          margin: 6px 0 4px;
        }
        .to {
          font-size: 15px;
          color: var(--ink);
        }
        .msg {
          font-family: var(--font-lora), Georgia, serif;
          font-style: italic;
          font-size: 13.5px;
          color: var(--ink-soft);
          max-width: 320px;
          line-height: 1.6;
          margin-top: 6px;
        }
        .from {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
          margin-top: 8px;
        }
        .brand {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--ink-soft);
          margin-top: 10px;
          opacity: 0.75;
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
