import { useEffect, useState } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

/** Денна тема з 07:00 до 21:00, нічна — в увесь інший час. */
function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [isManual, setIsManual] = useState(false);

  // Автоматичне перемикання: при початковому завантаженні перевіряємо поточний час
  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  // Поки користувач не обрав тему вручну — щохвилини звіряємося з часом
  useEffect(() => {
    if (isManual) return undefined;
    const id = setInterval(() => setTheme(getThemeByTime()), 60_000);
    return () => clearInterval(id);
  }, [isManual]);

  // Клас dark на <html>, щоб фон усієї сторінки (включно з overscroll) теж змінювався
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setIsManual(true);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans p-4 md:p-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <Header theme={theme} isManual={isManual} onToggleTheme={toggleTheme} />
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Experience />
          <Education />
          <Reviews />
        </main>
        <Footer />
      </div>
      <ContactForm />
    </div>
  );
}
