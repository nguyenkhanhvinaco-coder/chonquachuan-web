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
        <div className="scrim" />
        <div className="brand-badge">🏮 chonquachuan.vn</div>
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
        .scrim {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 62%;
          background: linear-gradient(to top, rgba(20,15,10,0.92) 0%, rgba(20,15,10,0.75) 32%, rgba(20,15,10,0) 100%);
          pointer-events: none;
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
        .to {
          font-size: 15.5px;
          font-weight: 600;
          color: #F3EAE0;
        }
        .msg {
          font-family: var(--font-lora), Georgia, serif;
          font-style: italic;
          font-size: 13px;
          color: #D9CFC4;
          line-height: 1.55;
          margin-top: 6px;
        }
        .from {
          font-size: 13px;
          font-weight: 600;
          color: #F0B27A;
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
