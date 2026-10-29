import { useState, useEffect, useCallback } from 'react';
import { ThemePreference, AppliedTheme } from '../types/theme';

const THEME_STORAGE_KEY = 'taskly_theme_preference';

/**
 * Hook para gerenciar as preferências de tema (Light, Dark, Sistema)
 * e a aplicação do tema visual efetivo no DOM.
 */
export function useTheme() {
  // Inicialização segura a partir do LocalStorage com fallback para 'system'
  const [preference, setPreference] = useState<ThemePreference>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch (error) {
      console.warn('Não foi possível ler a preferência de tema do LocalStorage:', error);
    }
    return 'system';
  });

  // Estado que reflete se o sistema operacional atualmente prefere dark mode
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Determina o tema visual efetivo ('light' ou 'dark')
  const appliedTheme: AppliedTheme =
    preference === 'system'
      ? systemPrefersDark
        ? 'dark'
        : 'light'
      : preference;

  // Monitora alterações na preferência do sistema operacional
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    // Adiciona listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para navegadores legados
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Aplica o tema visual efetivo no elemento <html> do DOM e no meta color-scheme
  useEffect(() => {
    const root = document.documentElement;
    if (appliedTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [appliedTheme]);

  // Função para alterar e persistir a preferência
  const changeThemePreference = useCallback((newPreference: ThemePreference) => {
    setPreference(newPreference);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newPreference);
    } catch (error) {
      console.warn('Não foi possível salvar a preferência de tema no LocalStorage:', error);
    }
  }, []);

  return {
    preference,
    appliedTheme,
    changeThemePreference,
  };
}
