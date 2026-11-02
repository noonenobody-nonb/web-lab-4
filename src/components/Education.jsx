export default function Education() {
  return (
    <section id="education" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-md hover:border-purple-500/50 transition-all flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
          Освіта
        </h2>

        <article className="mb-6">
          <h3 className="text-xl font-semibold mb-1">
            Бакалавр, Кібербезпека
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Національний університет «Львівська політехніка» | 2025 — 2029 (очікуваний випуск)
          </p>
        </article>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
        <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400 mb-2">Навички</h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-1">
          <strong>Мови програмування:</strong> C#, Python, SQL
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm">
          <strong>Вебтехнології:</strong> HTML5, CSS3, JavaScript, React, Node.js
        </p>
      </div>
    </section>
  );
}
