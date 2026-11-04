import React, { useState } from 'react';
import { TaskStatsData } from '../types/task';
import { ArrowUp, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface DailyFocusCardProps {
  stats: TaskStatsData;
  onAddTask: (title: string) => boolean;
}

export const DailyFocusCard: React.FC<DailyFocusCardProps> = ({
  stats,
  onAddTask,
}) => {
  const { total, pending, completed, completionRate } = stats;
  const [taskText, setTaskText] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = taskText.trim();
    if (!trimmed) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
      return;
    }

    const success = onAddTask(trimmed);
    if (success) {
      setTaskText('');
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 850);
    }
  };

  const hasText = taskText.trim().length > 0;

  return (
    <div className="rounded-[20px] bg-white dark:bg-[#16171B] border border-slate-200/70 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] p-5 sm:p-6 mb-6 transition-all duration-300">
      {/* Cabeçalho do Card: Título e Status de Conclusão */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
          <h2 className="text-xs sm:text-sm font-semibold tracking-wide text-slate-800 dark:text-gray-200 uppercase">
            Progresso & Foco Diário
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
          <span className="tabular-nums">
            {total > 0 ? `${completed} de ${total} concluídas` : 'Sem tarefas'}
          </span>
          <span className="text-slate-300 dark:text-gray-600">&bull;</span>
          <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
            {completionRate}%
          </span>
        </div>
      </div>

      {/* Barra de Progresso Dinâmica Fina e Elegante */}
      <div className="relative mb-4">
        <div
          className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Métricas Integradas: Inline Pills Minimalistas */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {/* Total */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[11px]">
          <span className="text-slate-500 dark:text-gray-400">Total:</span>
          <span className="font-semibold text-slate-800 dark:text-gray-200 tabular-nums">
            {total}
          </span>
        </div>

        {/* Pendentes */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/40 dark:border-amber-500/10 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span className="text-amber-800 dark:text-amber-300">Pendentes:</span>
          <span className="font-semibold text-amber-900 dark:text-amber-200 tabular-nums">
            {pending}
          </span>
        </div>

        {/* Concluídas */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200/40 dark:border-emerald-500/10 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-emerald-800 dark:text-emerald-300">Concluídas:</span>
          <span className="font-semibold text-emerald-900 dark:text-emerald-200 tabular-nums">
            {completed}
          </span>
        </div>
      </div>

      {/* Input de Criação Rápida Integrado (Floating Input Style) */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center bg-[#F4F4F6] dark:bg-[#202227] rounded-[12px] p-1.5 pl-3.5 pr-2 transition-all duration-200 ${
            isShaking ? 'animate-shake' : ''
          } focus-within:ring-2 focus-within:ring-slate-900/10 dark:focus-within:ring-white/15`}
        >
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Escreva uma tarefa e pressione Enter..."
            className="w-full text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none py-1"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : hasText
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-200/80 dark:bg-white/10 text-slate-400 dark:text-gray-500'
            }`}
            title="Criar tarefa rápida"
            aria-label="Adicionar tarefa rápida"
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : hasText ? (
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};
