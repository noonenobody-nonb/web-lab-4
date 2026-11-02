import { useEffect, useState } from 'react';

const STORAGE_KEY = 'systemInfo';

export default function Footer() {
  const [systemInfo, setSystemInfo] = useState(null);

  // При монтуванні зчитуємо дані про систему, зберігаємо в localStorage і читаємо назад
  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: String(navigator.cookieEnabled),
      hardwareConcurrency: String(navigator.hardwareConcurrency ?? 'невідомо'),
      screenResolution: `${window.screen.width}×${window.screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    setSystemInfo(saved);
  }, []);

  return (
    <footer id="contact" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-b-xl p-6 mt-6 shadow-lg">
      <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        Контакти
      </h2>
      <p className="text-neutral-500 text-sm mb-2">Зв'язатися зі мною:</p>
      <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
        <p>
          Email: <a href="mailto:vladyslav.voloshko.kb.2025@lpnu.ua" className="text-emerald-700 dark:text-emerald-400 hover:underline">vladyslav.voloshko.kb.2025@lpnu.ua</a>
        </p>
        <p>
          GitHub: <a href="https://github.com/noonenobody-nonb" target="_blank" rel="noreferrer" className="text-emerald-700 dark:text-emerald-400 hover:underline">github.com</a>
        </p>
      </div>

      {systemInfo && (
        <div className="mt-5 border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
            Системна інформація <span className="text-xs text-neutral-500 font-normal">(з localStorage)</span>
          </h3>
          <dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-4 gap-y-1 text-xs">
            {Object.entries(systemInfo).map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="font-mono text-purple-700 dark:text-purple-400">{key}</dt>
                <dd className="text-neutral-700 dark:text-neutral-300 break-words">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <p className="text-xs text-neutral-500 mt-6 border-t border-neutral-200 dark:border-neutral-800 pt-4 text-center">
        &copy; 2026 Лабораторна робота №4. Усі права захищено.
      </p>
    </footer>
  );
}
