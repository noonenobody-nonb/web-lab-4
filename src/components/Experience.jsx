import experienceImg from '../assets/experience.jpeg';

export default function Experience() {
  return (
    <section id="experience" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-md hover:border-purple-500/50 transition-all">
      <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        Досвід роботи
      </h2>
      <article>
        <h3 className="text-xl font-semibold mb-3">
          Сертифіковане нічого
        </h3>
        <img src={experienceImg} alt="Secret is here" className="max-h-80 rounded-lg" />
      </article>
    </section>
  );
}
