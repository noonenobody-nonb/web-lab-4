export default function Header({ theme, isManual, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-purple-500/30 p-6 rounded-t-xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-700 dark:text-purple-400 mb-1">
            Волошко Владислав Віталійович
          </h1>
          <p className="text-emerald-700 dark:text-emerald-400 font-medium mb-4">
            Студент спеціальності «Кібербезпека»
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-purple-500 font-semibold text-sm hover:bg-purple-500 hover:text-white transition-colors cursor-pointer"
        >
          <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          {isDark ? 'Денна тема' : 'Нічна тема'}
        </button>
      </div>

      <nav className="flex flex-wrap gap-4 text-sm font-semibold">
        {[
          ['#experience', 'Досвід роботи'],
          ['#education', 'Освіта'],
          ['#reviews', 'Відгуки'],
          ['#contact', 'Контакти'],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-purple-700 dark:text-purple-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <p className="mt-2 text-xs text-neutral-500">
        Тема: {isDark ? 'нічна' : 'денна'} ({isManual ? 'обрано вручну' : 'автоматично за часом доби'})
      </p>
    </header>
  );
}
