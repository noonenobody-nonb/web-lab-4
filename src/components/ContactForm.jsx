import { useEffect, useState } from 'react';

// Той самий endpoint Formspree, що й у Частині 1
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/moeepykl';
const MODAL_DELAY_MS = 60_000; // 1 хвилина
const SESSION_KEY = 'feedbackShown';

const inputClass =
  'px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-normal focus:outline-2 focus:outline-purple-500';

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  // Через 1 хвилину відкриваємо модальне вікно (лише якщо його ще не закривали в цій сесії)
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') return undefined;
    const timerId = setTimeout(() => setIsOpen(true), MODAL_DELAY_MS);
    return () => clearTimeout(timerId);
  }, []);

  // Закриття клавішею Escape
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ type: 'loading', message: 'Надсилання…' });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus({ type: 'success', message: 'Дякую! Повідомлення надіслано.' });
      form.reset();
      setTimeout(close, 2000);
    } catch (err) {
      setStatus({ type: 'error', message: `Помилка надсилання: ${err.message}` });
    }
  }

  const statusColor = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
  }[status.type] ?? 'text-neutral-500';

  return (
    <>
      {/* Кнопка для ручного відкриття форми */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 px-4 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-500 transition-colors cursor-pointer"
      >
        ✉ Зворотний зв'язок
      </button>

      {/* Умовний рендеринг: модальне вікно існує в DOM лише коли isOpen === true */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={close} />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            className="relative w-full max-w-md max-h-full overflow-y-auto rounded-xl p-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-2xl"
          >
            <h2 id="feedback-title" className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">
              Зворотний зв'язок
            </h2>
            <p className="text-sm text-neutral-500 mb-4">Залиште повідомлення — я обов'язково відповім.</p>

            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm font-semibold">
              <label className="flex flex-col gap-1">
                Ім’я
                <input name="name" type="text" required placeholder="Іван Петренко" className={inputClass} autoFocus />
              </label>
              <label className="flex flex-col gap-1">
                Email
                <input name="email" type="email" required placeholder="ivan@example.com" className={inputClass} />
              </label>
              <label className="flex flex-col gap-1">
                Номер телефону
                <input name="phone" type="tel" required placeholder="+380 XX XXX XX XX" pattern="^\+?[0-9\s\(\)\-]{10,18}$" className={inputClass} />
              </label>
              <label className="flex flex-col gap-1">
                Повідомлення
                <textarea name="message" rows={4} required placeholder="Ваше повідомлення…" className={inputClass} />
              </label>
              <input type="hidden" name="_subject" value="Нове повідомлення з CV-сайту (ЛР №4, React)" />

              <div className="flex gap-3 mt-1">
                <button type="submit" disabled={status.type === 'loading'} className="flex-1 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-60 cursor-pointer">
                  Надіслати
                </button>
                <button type="button" onClick={close} className="flex-1 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                  Закрити
                </button>
              </div>
              {status.message && <p className={`font-normal ${statusColor}`} role="status">{status.message}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
