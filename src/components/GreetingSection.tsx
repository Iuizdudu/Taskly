import React from 'react';
import { Pencil, Camera } from 'lucide-react';

interface GreetingSectionProps {
  userName: string;
  userAvatar: string | null;
  pendingCount: number;
  onOpenProfile: () => void;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({
  userName,
  userAvatar,
  pendingCount,
  onOpenProfile,
}) => {
  const getInitials = (name: string) => {
    if (!name || name === 'Visitante') return 'V';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="min-w-0">
        <span className="text-xl sm:text-2xl font-light text-slate-600 dark:text-gray-400 block">
          Olá,
        </span>
        <button
          type="button"
          onClick={onOpenProfile}
          className="group text-left inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          title="Clique para editar seu nome ou foto"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
            {userName}!
          </h1>
          <Pencil className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white opacity-0 group-hover:opacity-100 transition-all shrink-0" />
        </button>

        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
          {pendingCount === 0
            ? 'Todas as suas tarefas estão concluídas!'
            : pendingCount === 1
            ? 'Você tem 1 tarefa pendente.'
            : `Você tem ${pendingCount} tarefas pendentes.`}
        </p>
      </div>

      {/* Avatar circular interativo com upload/feedback visual */}
      <button
        type="button"
        onClick={onOpenProfile}
        className="relative group shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full"
        title="Clique para alterar foto ou nome de perfil"
        aria-label="Perfil do usuário - clique para alterar foto ou nome"
      >
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-1 bg-linear-to-tr from-slate-200 via-indigo-100 to-slate-100 dark:from-white/10 dark:via-indigo-900/30 dark:to-white/5 shadow-md transition-all group-hover:scale-105 group-hover:shadow-lg">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-inner">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={`Foto de perfil de ${userName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{getInitials(userName)}</span>
            )}

            {/* Overlay sutil ao passar o mouse para indicar que é clicável */}
            <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Camera className="w-5 h-5 text-white stroke-[2.2]" />
              <span className="text-[9px] text-white font-semibold mt-0.5 tracking-tight">Foto</span>
            </div>
          </div>
        </div>

        {/* Badge inferior com ícone de câmera indicando ação */}
        <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-white dark:bg-[#181A1F] border border-slate-200 dark:border-white/10 shadow-xs flex items-center justify-center text-slate-600 dark:text-gray-300 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-indigo-600 transition-colors">
          <Camera className="w-2.5 h-2.5" />
        </div>
      </button>
    </div>
  );
};
