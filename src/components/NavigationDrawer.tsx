import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Calendar, User, Sun, Moon, Monitor } from 'lucide-react';
import { AppView, TaskStatsData } from '../types/task';
import { ThemePreference, AppliedTheme } from '../types/theme';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  userName: string;
  userAvatar: string | null;
  onOpenProfile: () => void;
  preference: ThemePreference;
  appliedTheme: AppliedTheme;
  onSelectTheme: (pref: ThemePreference) => void;
  stats: TaskStatsData;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  userName,
  userAvatar,
  onOpenProfile,
  preference,
  appliedTheme,
  onSelectTheme,
  stats,
}) => {
  const getInitials = (name: string) => {
    if (!name || name === 'Convidado' || name === 'Visitante') return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay escurecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Lateral */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#121316] text-slate-900 dark:text-[#F3F4F6] shadow-2xl z-10 flex flex-col justify-between border-r border-slate-200/80 dark:border-white/10"
          >
            <div>
              {/* Header do Drawer */}
              <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-xs transition-colors">
                    <svg
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-bold tracking-tight text-lg">Taskly</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Perfil Local do Usuário */}
              <div className="p-6 bg-slate-50/70 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-900 dark:bg-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-sm shrink-0">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={`Foto de ${userName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{getInitials(userName)}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-gray-400 block uppercase tracking-wider">
                      Perfil local
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {userName}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenProfile();
                  }}
                  className="mt-3.5 w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-semibold text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Editar Perfil & Foto</span>
                </button>
              </div>

              {/* Navegação entre Telas */}
              <div className="p-4 space-y-1">
                <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Navegação
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onSelectView('home');
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    currentView === 'home'
                      ? 'bg-slate-900 text-white dark:bg-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-white/5'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Início</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectView('calendar');
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    currentView === 'calendar'
                      ? 'bg-slate-900 text-white dark:bg-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-white/5'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Calendário</span>
                </button>
              </div>

              {/* Resumo de Produtividade */}
              <div className="p-4 border-t border-slate-100 dark:border-white/10">
                <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Métricas Rápidas
                </span>
                <div className="grid grid-cols-3 gap-2 px-1 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <span className="text-[10px] text-slate-400 font-medium block">Total</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {stats.total}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-500/10 border border-amber-100/60 dark:border-amber-500/10">
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium block">A fazer</span>
                    <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                      {stats.pending}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-100/60 dark:border-emerald-500/10">
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium block">Feitas</span>
                    <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {stats.completed}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seletor de Tema no Rodapé do Drawer */}
            <div className="p-6 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
              <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 block mb-2.5">
                Aparência do Tema
              </span>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-white/10">
                <button
                  type="button"
                  onClick={() => onSelectTheme('light')}
                  className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    preference === 'light'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 dark:text-gray-300'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Claro</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectTheme('dark')}
                  className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    preference === 'dark'
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-[#181A1F] dark:text-white'
                      : 'text-slate-600 dark:text-gray-300'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Escuro</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectTheme('system')}
                  className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    preference === 'system'
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-[#181A1F] dark:text-white'
                      : 'text-slate-600 dark:text-gray-300'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Auto</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
