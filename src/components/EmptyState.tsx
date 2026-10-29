import React from 'react';
import { TaskFilter } from '../types/task';
import { Inbox, CheckCircle2, Clock } from 'lucide-react';

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
      <div className="py-12 px-4 text-center rounded-2xl bg-white/60 dark:bg-[#181A1F]/40 border border-dashed border-slate-200 dark:border-white/10 transition-colors">
        <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3.5">
          <Inbox className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-[#F3F4F6]">
          Nenhuma tarefa por enquanto
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
          Adicione sua primeira tarefa para começar.
        </p>
      </div>
    );
  }

  // Caso 2: Existem tarefas no sistema, mas nenhuma corresponde ao filtro atual
  if (filter === 'pending') {
    return (
      <div className="py-10 px-4 text-center rounded-2xl bg-white/60 dark:bg-[#181A1F]/40 border border-dashed border-slate-200 dark:border-white/10 transition-colors">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3.5">
          <CheckCircle2 className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-[#F3F4F6]">
          Tudo em dia!
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
          Você não possui nenhuma tarefa pendente neste momento.
        </p>
      </div>
    );
  }

  if (filter === 'completed') {
    return (
      <div className="py-10 px-4 text-center rounded-2xl bg-white/60 dark:bg-[#181A1F]/40 border border-dashed border-slate-200 dark:border-white/10 transition-colors">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-gray-400 mb-3.5">
          <Clock className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-[#F3F4F6]">
          Nenhuma tarefa concluída ainda
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto">
          Marque itens como concluídos para acompanhar suas conquistas.
        </p>
      </div>
    );
  }

  return null;
};
