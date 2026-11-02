import { useEffect, useState } from 'react';

const VARIANT = 6;
const COMMENTS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Порожній масив залежностей — запит виконується один раз при монтуванні
  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch(COMMENTS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadReviews();
    return () => controller.abort(); // скасування запиту при розмонтуванні
  }, []);

  return (
    <section id="reviews" className="md:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        Відгуки попередніх роботодавців
      </h2>

      {isLoading && <p className="text-sm text-neutral-500">Завантаження відгуків…</p>}
      {error && <p className="text-sm text-red-600 dark:text-red-400">Не вдалося завантажити відгуки: {error}</p>}

      {!isLoading && !error && (
        <>
          <p className="text-sm text-neutral-500 mb-3">Отримано відгуків: {reviews.length}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="relative p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 border-l-4 border-l-purple-500 bg-neutral-50 dark:bg-neutral-950"
              >
                <span className="absolute top-3 right-3 text-xs text-neutral-500">#{review.id}</span>
                <h3 className="font-semibold capitalize pr-8 mb-1">{review.name}</h3>
                <a href={`mailto:${review.email}`} className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline">
                  {review.email}
                </a>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 whitespace-pre-line">{review.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
