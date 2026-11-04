import React from 'react';
import { Menu, Calendar as CalendarIcon, Home } from 'lucide-react';
import { AppView } from '../types/task';

interface HeaderNavProps {
  currentView: AppView;
  onToggleView: () => void;
  onOpenDrawer: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onToggleView,
  onOpenDrawer,
}) => {
  return (
    <nav className="flex items-center justify-between py-4 mb-4 select-none">
      {/* Botão de Menu Hambúrguer à esquerda */}
      <button
        type="button"
        onClick={onOpenDrawer}
        aria-label="Abrir menu de opções"
        className="p-2 -ml-2 rounded-xl text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
      >
        <Menu className="w-6 h-6 stroke-[2.2]" />
      </button>

      {/* Título Centralizado em Caixa Alta */}
      <h2 className="text-sm font-bold tracking-widest text-slate-900 dark:text-white uppercase">
        {currentView === 'home' ? 'INÍCIO' : 'CALENDÁRIO'}
      </h2>

      {/* Botão de Alternância de Tela à direita */}
      <button
        type="button"
        onClick={onToggleView}
        aria-label={currentView === 'home' ? 'Ir para o Calendário' : 'Voltar para o Início'}
        className="p-2 -mr-2 rounded-xl text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        title={currentView === 'home' ? 'Ver calendário' : 'Voltar ao início'}
      >
        {currentView === 'home' ? (
          <CalendarIcon className="w-6 h-6 stroke-[2.2]" />
        ) : (
          <Home className="w-6 h-6 stroke-[2.2]" />
        )}
      </button>
    </nav>
  );
};
