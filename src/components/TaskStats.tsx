import React from 'react';
import { TaskStatsData } from '../types/task';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatsData;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const { total, pending, completed, completionRate } = stats;

  return (
    <div className="mb-6 space-y-3">
      {/* Grade com os 3 indicadores reais */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Total de Tarefas */}
        <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-gray-400">
            <ListTodo className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">Total</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {total}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-gray-500 hidden sm:inline">
              tarefas
            </span>
          </div>
        </div>

        {/* Pendentes */}
        <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Pendentes</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 tabular-nums">
              {pending}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-gray-500 hidden sm:inline">
              ativas
            </span>
          </div>
        </div>

        {/* Concluídas */}
        <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Concluídas</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 tabular-nums">
              {completed}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-gray-500 hidden sm:inline">
              feitas
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Progresso visual discreta quando houver tarefas */}
      {total > 0 && (
        <div className="p-3 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-gray-400 mb-2 font-medium">
            <span>Progresso geral</span>
            <span className="tabular-nums font-semibold text-slate-900 dark:text-white">
              {completionRate}%
            </span>
          </div>
          <div
            className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={completionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso de conclusão: ${completionRate}%`}
          >
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
