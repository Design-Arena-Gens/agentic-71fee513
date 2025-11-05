import Link from "next/link";
import TestSimulator from "./components/TestSimulator";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-16 px-6 py-12 sm:px-10">
      <header className="grid gap-6 rounded-3xl bg-card/70 p-10 shadow-xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
            جديد
          </span>
          <nav className="flex gap-4 text-sm text-muted">
            <Link href="#guide" className="transition hover:text-primary">
              دليل الاستخدام
            </Link>
            <Link href="#test" className="transition hover:text-primary">
              اختبار سريع
            </Link>
          </nav>
        </div>
        <div className="space-y-6">
          <h1 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            منصة تيست لتجربة التعلم السريع والمتقن
          </h1>
          <p className="text-lg leading-relaxed text-muted sm:max-w-3xl">
            أنشأنا هذه الواجهة المصغّرة لمساعدتك على مراجعة المعلومات بطريقة ممتعة وسريعة.
            جرّب التحدي التفاعلي، تتبع تقدمك، واحصل على نصائح بسيطة لتحسين التعلم.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full border border-border px-3 py-1">
              محتوى عربي بالكامل
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              مخصص للعرض على الويب
            </span>
            <span className="rounded-full border border-border px-3 py-1">
              واجهة تفاعلية
            </span>
          </div>
        </div>
      </header>

      <section
        id="guide"
        className="grid gap-8 rounded-3xl bg-card/80 p-10 shadow-lg backdrop-blur"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">كيف تستفيد من المنصة؟</h2>
          <p className="text-muted leading-relaxed">
            استلهمنا تصميم هذه الصفحة من منصات التدريب المصغّرة. ستجد في الأسفل تجربة
            اختبار قصيرة، وبعد كل إجابة تحصل على تلميح أو ملاحظة سريعة. الهدف أن ترى
            تقدّمك لحظة بلحظة بدون الحاجة إلى أي إعداد مسبق.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">١. اختر جلسة مصغّرة</h3>
            <p className="text-muted leading-relaxed">
              الأسئلة قصيرة وواضحة. في كل مرة تعيد التحميل تتغير صياغة النصائح لتكسر
              الروتين وتضيف شيئًا من التنوع.
            </p>
          </li>
          <li className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">٢. احسب سرعتك</h3>
            <p className="text-muted leading-relaxed">
              العداد الزمني في التحدي يعطيك فكرة عن سرعة الاستجابة. جرّب تحسين نتيجتك
              في كل مرة لتبني عادة تعلم ثابتة.
            </p>
          </li>
          <li className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">٣. راجع الملاحظات</h3>
            <p className="text-muted leading-relaxed">
              بعد كل إجابة تحصل على ملاحظة تلخص السبب. هذه هي القيمة الحقيقية: ليس
              المهم أن تعرف الإجابة الصحيحة فقط، بل أن تفهم السياق.
            </p>
          </li>
          <li className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">٤. شارك التجربة</h3>
            <p className="text-muted leading-relaxed">
              استخدم الرابط، شاركه مع زملائك أو فريقك، واجعلها عادة أسبوعية للاطلاع
              السريع على المفاهيم الأساسية.
            </p>
          </li>
        </ul>
      </section>

      <section
        id="test"
        className="grid gap-8 rounded-3xl bg-card/90 p-10 shadow-xl backdrop-blur"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">التحدي التفاعلي</h2>
          <p className="text-muted leading-relaxed">
            أجب عن الأسئلة بالأسفل، شاهد النتيجة على الفور، واستفد من التغذية الراجعة
            المدمجة. لا تحتاج إلى تسجيل أو تحميل أي شيء.
          </p>
        </div>
        <TestSimulator />
      </section>

      <footer className="grid gap-4 rounded-3xl bg-card/70 p-6 text-sm text-muted shadow-lg backdrop-blur">
        <div>ملاحظة: هذه الصفحة نموذجية وتجريبية ضمن مشروع &quot;تيست&quot;.</div>
        <div>تم البناء باستخدام Next.js ويمكن نشرها مباشرةً على Vercel.</div>
      </footer>
    </main>
  );
}
