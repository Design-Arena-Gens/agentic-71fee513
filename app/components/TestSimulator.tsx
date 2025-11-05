"use client";

import { useEffect, useMemo, useState } from "react";

type Option = {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
};

type Question = {
  id: string;
  title: string;
  prompt: string;
  options: Option[];
  tip: string;
};

const QUESTIONS: Question[] = [
  {
    id: "focus",
    title: "تنظيم جلسة التعلم",
    prompt: "ما أفضل افتتاحية لجلسة تعلم مدتها ٢٥ دقيقة؟",
    options: [
      {
        id: "a",
        label: "قراءة سريعة للملخص ثم الانتقال مباشرة إلى حل الأسئلة",
        correct: false,
        explanation:
          "الانتقال لحل الأسئلة دون تحديد الأهداف يشتت الانتباه ويقلل من الاستفادة."
      },
      {
        id: "b",
        label: "تحديد هدف واضح للجلسة مع تجهيز كل المصادر قبل البدء",
        correct: true,
        explanation:
          "تحديد هدف واحد وتجهيز المصادر يضمن بداية مركزة ويوفر الوقت أثناء الجلسة."
      },
      {
        id: "c",
        label: "الاستماع إلى بودكاست متعلق بالموضوع أثناء فتح الملاحظات",
        correct: false,
        explanation:
          "تعدد المهام يضعف القدرة على التركيز ويطيل مدة التعلم دون فائدة تذكر."
      }
    ],
    tip: "نصائح الباحثين تؤكد أن توحيد الهدف وتقسيمه لفترات قصيرة يزيد معدل التذكر."
  },
  {
    id: "reflection",
    title: "المراجعة الذكية",
    prompt:
      "بعد الانتهاء من جلسة تعلم، ما الخطوة التي ترفع معدل التذكر خلال الأسبوع التالي؟",
    options: [
      {
        id: "a",
        label: "إعادة قراءة كل الملاحظات مرة واحدة في نهاية الأسبوع",
        correct: false,
        explanation:
          "إعادة القراءة مرة واحدة تؤجل النسيان لكنها لا تخلق تكرارًا متباعدًا فعالًا."
      },
      {
        id: "b",
        label: "كتابة ملخص مختصر وإرسال سؤال مفتوح لنفسك عبر البريد",
        correct: true,
        explanation:
          "المراجعة النشطة عبر صياغة سؤال مفتوح تعزز الاستدعاء وتربط المعرفة بسياق عملي."
      },
      {
        id: "c",
        label: "حفظ كل النقاط المهمة في تطبيق قوائم بدون مراجعتها لاحقًا",
        correct: false,
        explanation:
          "تكديس الملاحظات بدون إعادة استدعاء فعلي يجعل المعلومات تتلاشى سريعًا."
      }
    ],
    tip: "تقنية الاسترجاع الذاتي بعد الجلسة تدعم ذاكرة طويلة المدى وتكشف الثغرات بسرعة."
  },
  {
    id: "energy",
    title: "إدارة الطاقة",
    prompt: "في أي حالة يُنصح بتفادي جلسات التعلم المكثفة؟",
    options: [
      {
        id: "a",
        label: "بعد ممارسة رياضة خفيفة وتمارين تنفس لمدة عشر دقائق",
        correct: false,
        explanation:
          "النشاط البدني الخفيف يحسن تدفق الدم للدماغ ويهيئك لتعلم أكثر عمقًا."
      },
      {
        id: "b",
        label: "بعد وجبة ثقيلة مباشرة ومع شعور بالنعاس",
        correct: true,
        explanation:
          "الجهاز الهضمي يستهلك طاقة إضافية، لذلك ينخفض التركيز بعد الوجبات الثقيلة."
      },
      {
        id: "c",
        label: "صباحًا بعد نوم سبع ساعات متواصلة",
        correct: false,
        explanation:
          "النوم الكافي يمنح الدماغ القدرة على بناء روابط جديدة، ما يجعل التعلم صباحًا فعالًا."
      }
    ],
    tip: "راقب مستويات الطاقة قبل كل جلسة، فجودة الاستيعاب مرتبطة باستقرار السياق الحيوي."
  }
];

const HINTS_POOL = [
  "الحماس لا يغني عن وجود خطة قصيرة وواضحة.",
  "التكرار الذكي أهم من الكم الهائل من الملاحظات.",
  "تتبع الطاقة لا يقل أهمية عن تتبع الوقت.",
  "الذاكرة تحب الأسئلة المفتوحة أكثر من الملاحظات المنسوخة.",
  "ليشعر دماغك بالأمان، اجعل الهدف محددًا ومتحكمًا فيه."
];

const formatSeconds = (value: number) => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function TestSimulator() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const question = QUESTIONS[questionIndex];
  const total = QUESTIONS.length;

  useEffect(() => {
    if (startedAt === null) {
      setStartedAt(Date.now());
    }
  }, [startedAt]);

  useEffect(() => {
    if (startedAt === null) {
      return;
    }
    const tick = () => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(seconds);
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [startedAt]);

  useEffect(() => {
    setFeedback("");
    setHint(
      HINTS_POOL[Math.floor(Math.random() * HINTS_POOL.length)]
    );
    setStatus("idle");
    setStartedAt(Date.now());
    setElapsed(0);
  }, [questionIndex]);

  const progressValue = useMemo(() => {
    if (total === 0) {
      return 0;
    }
    return Math.round(((questionIndex + (status !== "idle" ? 1 : 0)) / total) * 100);
  }, [questionIndex, status, total]);

  const accuracy = useMemo(() => {
    if (attempts === 0) {
      return 0;
    }
    return Math.round((score / attempts) * 100);
  }, [attempts, score]);

  const handleAnswer = (option: Option) => {
    if (status !== "idle") {
      return;
    }
    setAttempts((prev) => prev + 1);
    if (option.correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setStatus("correct");
      setFeedback(option.explanation);
    } else {
      setStreak(0);
      setStatus("wrong");
      setFeedback(option.explanation);
    }
  };

  const handleNext = () => {
    setQuestionIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 rounded-2xl border border-border bg-background/80 p-6 text-sm shadow-inner sm:grid-cols-3">
        <div>
          <div className="text-muted">السؤال الحالي</div>
          <div className="text-xl font-semibold">
            {questionIndex + 1} / {total}
          </div>
        </div>
        <div>
          <div className="text-muted">الدقة</div>
          <div className="text-xl font-semibold">{accuracy}%</div>
        </div>
        <div>
          <div className="text-muted">الوقت المنقضي</div>
          <div className="text-xl font-semibold">{formatSeconds(elapsed)}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-background/90 shadow-xl">
        <div className="bg-gradient-to-l from-accent to-accent-soft px-6 py-4 text-sm font-medium text-accent-foreground">
          {hint}
        </div>
        <div className="grid gap-6 p-6">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wide text-muted">
              {question.title}
            </div>
            <h3 className="text-xl font-semibold leading-relaxed">
              {question.prompt}
            </h3>
          </div>

          <div className="grid gap-3">
            {question.options.map((option) => {
              const isWrongSelection =
                status === "wrong" && option.correct === false && feedback === option.explanation;
              let stateClass = "border-border bg-surface hover:border-primary";
              if (status !== "idle") {
                if (option.correct) {
                  stateClass = "border-emerald-500/70 bg-emerald-500/10";
                } else if (isWrongSelection) {
                  stateClass = "border-rose-500/70 bg-rose-500/10";
                } else {
                  stateClass = "border-border bg-surface";
                }
              }
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  disabled={status !== "idle"}
                  className={`rounded-2xl border px-5 py-4 text-right text-base transition focus:outline-none focus:ring-2 focus:ring-accent ${stateClass} ${
                    status === "idle" ? "hover:-translate-y-0.5 hover:shadow-md" : ""
                  }`}
                  aria-label={`الإجابة ${option.label}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {status !== "idle" && (
            <div className="grid gap-4 rounded-2xl border border-border bg-surface/90 p-5">
              <div
                className={`text-sm font-semibold ${
                  status === "correct" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {status === "correct" ? "إجابة صحيحة!" : "إجابة تحتاج مراجعة."}
              </div>
              <p className="text-sm leading-relaxed text-muted">{feedback}</p>
              <button
                type="button"
                onClick={handleNext}
                className="self-start rounded-full bg-primary px-6 py-2 text-sm font-medium text-background transition hover:bg-primary/90"
              >
                السؤال التالي
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl border border-border bg-background/80 p-6 text-sm shadow-inner">
        <div className="flex items-center justify-between">
          <span>التقدم</span>
          <span>{progressValue}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${progressValue}%` }}
            aria-hidden
          />
        </div>
        <div className="flex justify-between text-muted">
          <div>إجابات صحيحة: {score}</div>
          <div>سلسلة متواصلة: {streak}</div>
        </div>
      </div>
    </div>
  );
}
