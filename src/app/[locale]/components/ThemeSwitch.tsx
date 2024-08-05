"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      type='button'
      className='p-2 focus:outline-none'
      aria-label='Toggle Theme'
      onClick={toggleTheme}
      style={{ backgroundColor: 'transparent' }}
    >
      {isDarkMode ? <FiSun size={24} color='var(--primary)' /> : <FiMoon size={24} color='var(--primary)' />}
    </button>
  );
}
