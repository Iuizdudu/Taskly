import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { ThemePreference, AppliedTheme } from '../types/theme';

interface ThemeSelectorProps {
  preference: ThemePreference;
  appliedTheme: AppliedTheme;
  onSelectPreference: (preference: ThemePreference) => void;
}

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Escuro', icon: Moon },
  { value: 'system', label: 'Sistema', icon: Monitor },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  preference,
  appliedTheme,
  onSelectPreference,
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Seletor de aparência do tema"
      className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 transition-colors duration-200"
    >
      {themeOptions.map((option) => {
        const isSelected = preference === option.value;
        const IconComponent = option.icon;

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelectPreference(option.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isSelected
                ? 'bg-white text-slate-900 shadow-xs dark:bg-[#22252C] dark:text-[#F3F4F6] dark:shadow-none'
                : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            title={`Alternar para tema ${option.label}${
              option.value === 'system'
                ? ` (atualmente ${appliedTheme === 'dark' ? 'escuro' : 'claro'})`
                : ''
            }`}
          >
            <IconComponent
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                isSelected ? 'scale-105 text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-gray-400'
              }`}
            />
            <span className="whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
