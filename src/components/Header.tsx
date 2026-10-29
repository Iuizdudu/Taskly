import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { ThemePreference, AppliedTheme } from '../types/theme';

interface HeaderProps {
  preference: ThemePreference;
  appliedTheme: AppliedTheme;
  onSelectPreference: (preference: ThemePreference) => void;
}

export const Header: React.FC<HeaderProps> = ({
  preference,
  appliedTheme,
  onSelectPreference,
}) => {
  return (
    <header className="mb-8">
      {/* Barra superior de marca e controle de tema */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
          {/* Símbolo geométrico moderno da Taskly */}
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs dark:bg-indigo-500 shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Taskly
            </span>
          </div>
        </div>

        {/* Seletor de Tema no canto superior direito */}
        <ThemeSelector
          preference={preference}
          appliedTheme={appliedTheme}
          onSelectPreference={onSelectPreference}
        />
      </div>

      {/* Título e Subtítulo principal */}
      <div className="pt-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Minhas tarefas
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-gray-400">
          Organize suas prioridades e acompanhe seu progresso.
        </p>
      </div>
    </header>
  );
};
