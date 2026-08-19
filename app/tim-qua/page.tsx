"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

type StepDef = {
  key: string;
  label: string;
  question: string;
  hint: string;
  options: string[];
};

const STEPS: StepDef[] = [
  {
    key: "doi-tuong",
    label: "Đối tượng",
    question: "Bạn muốn tặng quà cho ai?",
    hint: "Giúp chúng tôi gợi ý đúng nhóm sản phẩm phù hợp.",
    options: ["Cá nhân / người thân", "Đối tác doanh nghiệp", "Đồng nghiệp nội bộ", "Khách hàng"],
  },
  {
    key: "dip-tang",
    label: "Dịp tặng",
    question: "Dịp tặng quà lần này là gì?",
    hint: "Mỗi dịp sẽ hợp với một phong cách quà khác nhau.",
    options: ["Sinh nhật", "Khai trương", "Lễ / Tết", "Tri ân cuối năm", "Khác"],
  },
  {
    key: "ngan-sach",
    label: "Ngân sách",
    question: "Ngân sách dự kiến cho mỗi phần quà là bao nhiêu?",
    hint: "Giúp chúng tôi gợi ý set quà phù hợp nhất với ngân sách của bạn.",
    options: [
      "Dưới 200.000đ",
      "200.000đ - 500.000đ",
      "500.000đ - 1.000.000đ",
      "Trên 1.000.000đ",
      "Chưa xác định, tư vấn giúp tôi",
    ],
  },
  {
    key: "so-luong",
    label: "Số lượng",
    question: "Bạn cần bao nhiêu phần quà?",
    hint: "Số lượng lớn có thể được hỗ trợ giá tốt hơn.",
    options: ["1 phần", "2 - 10 phần", "11 - 50 phần", "Trên 50 phần"],
  },
  {
    key: "phong-cach",
    label: "Phong cách",
    question: "Phong cách quà bạn muốn hướng tới?",
    hint: "Chọn phong cách gần nhất với ý bạn, có thể chỉnh lại sau.",
    options: ["Sang trọng", "Ấm áp, gần gũi", "Trẻ trung, sáng tạo", "Tối giản"],
  },
];

export default function WizardPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const step = STEPS[current];
  const selected = answers[step.key];

  function pick(option: string) {
    setAnswers((a) => ({ ...a, [step.key]: option }));
  }

  function next() {
    if (current < STEPS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      const params = new URLSearchParams();
      STEPS.forEach((s) => {
        if (answers[s.key]) params.set(s.key, answers[s.key]);
      });
      router.push(`/tim-qua/ket-qua?${params.toString()}`);
    }
  }

  function back() {
    setCurrent((c) => Math.max(0, c - 1));
  }

  return (
    <div className="flex flex-col">
      <Header minimal />

      <div className="flex-1 flex justify-center px-6 py-14">
        <div className="w-full max-w-[680px] flex flex-col gap-10">
          {/* Step indicator */}
          <div className="flex items-start">
            {STEPS.map((s, i) => {
              const n = i + 1;
              const done = n < current + 1;
              const active = i === current;
              return (
                <div key={s.key} className="flex items-center" style={{ flex: i === STEPS.length - 1 ? "0 0 auto" : "1 1 0" }}>
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div
                      className="w-[38px] h-[38px] rounded-full flex items-center justify-center border-[1.5px]"
                      style={{
                        background: done ? "var(--sage)" : active ? "var(--accent)" : "var(--surface)",
                        borderColor: done ? "var(--sage)" : active ? "var(--accent)" : "var(--line)",
                        color: done || active ? "var(--accent-ink)" : "var(--ink-soft)",
                      }}
                    >
                      {done ? <CheckIcon /> : <span className="text-[13px] font-bold">{n}</span>}
                    </div>
                    <span
                      className="text-xs whitespace-nowrap"
                      style={{ color: active ? "var(--ink)" : "var(--ink-soft)", fontWeight: active ? 600 : 400 }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-2 mb-[22px]"
                      style={{ background: done ? "var(--sage)" : "var(--line)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Question */}
          <div className="flex flex-col gap-2.5">
            <span className="text-ink-soft text-[13px] font-semibold uppercase tracking-wide">
              Bước {current + 1}/{STEPS.length}
            </span>
            <h1 className="text-[28px] md:text-[30px] leading-snug">{step.question}</h1>
            <p className="text-ink-soft text-[15px]">{step.hint}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {step.options.map((opt) => {
              const isSelected = selected === opt;
              return (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className="flex items-center justify-between px-[22px] py-[18px] rounded-xl border-[1.5px] text-left"
                  style={{
                    borderColor: isSelected ? "var(--accent)" : "var(--line)",
                    background: isSelected ? "var(--accent-soft)" : "var(--surface)",
                  }}
                >
                  <span className="text-base font-medium">{opt}</span>
                  <div
                    className="w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: isSelected ? "var(--accent)" : "var(--line)",
                      background: isSelected ? "var(--accent)" : "transparent",
                    }}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent-ink" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between mt-2">
            <button
              onClick={back}
              disabled={current === 0}
              className="border-[1.5px] border-line rounded-xl px-7 py-3.5 text-[15px] font-semibold disabled:opacity-40"
            >
              Quay lại
            </button>
            <button
              onClick={next}
              disabled={!selected}
              className="bg-accent text-accent-ink rounded-xl px-8 py-3.5 text-[15px] font-semibold flex items-center gap-2 disabled:opacity-40"
            >
              {current === STEPS.length - 1 ? "Xem gợi ý" : "Tiếp tục"}
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
