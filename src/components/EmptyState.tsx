import React from 'react';
import { TaskFilter } from '../types/task';
import { CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface EmptyStateProps {
  filter: TaskFilter;
  hasAnyTasks: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  filter,
  hasAnyTasks,
}) => {
  // Caso 1: Nenhuma tarefa cadastrada no sistema
  if (!hasAnyTasks) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="py-12 px-4 text-center rounded-2xl bg-white/70 dark:bg-[#181A1F]/50 border border-dashed border-slate-200 dark:border-white/10 shadow-xs transition-colors"
      >
        {/* Ilustração geométrica minimalista com movimento de flutuação suave */}
        <div className="w-16 h-16 mx-auto mb-4 relative flex items-center justify-center animate-float">
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 rotate-6 transform transition-transform" />
          <div className="relative w-12 h-12 rounded-xl bg-white dark:bg-[#22252C] border border-indigo-100 dark:border-white/10 shadow-xs flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-800 dark:text-[#F3F4F6]">
          Nenhuma tarefa por enquanto
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
          Adicione sua primeira tarefa para começar.
        </p>
      </motion.div>
    );
  }

  // Caso 2: Existem tarefas no sistema, mas nenhuma corresponde ao filtro atual
  if (filter === 'pending') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="py-10 px-4 text-center rounded-2xl bg-white/70 dark:bg-[#181A1F]/50 border border-dashed border-slate-200 dark:border-white/10 shadow-xs transition-colors"
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3.5 animate-float">
          <CheckCircle2 className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-[#F3F4F6]">
          Tudo em dia!
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
          Você não possui nenhuma tarefa pendente neste momento.
        </p>
      </motion.div>
    );
  }

  if (filter === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="py-10 px-4 text-center rounded-2xl bg-white/70 dark:bg-[#181A1F]/50 border border-dashed border-slate-200 dark:border-white/10 shadow-xs transition-colors"
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-gray-400 mb-3.5 animate-float">
          <Clock className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-[#F3F4F6]">
          Nenhuma tarefa concluída ainda
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
          Marque itens como concluídos para acompanhar suas conquistas.
        </p>
      </motion.div>
    );
  }

  return null;
};
