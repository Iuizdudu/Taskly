import React from 'react';
import { TaskStatsData } from '../types/task';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskStatsProps {
  stats: TaskStatsData;
}

const AnimatedNumber: React.FC<{ value: number; className?: string }> = ({
  value,
  className = '',
}) => {
  return (
    <div className="relative inline-flex items-center overflow-hidden h-8">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`tabular-nums ${className}`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const { total, pending, completed, completionRate } = stats;

  return (
    <div className="mb-6 space-y-3">
      {/* Grade com os 3 indicadores reais com elevação suave no hover */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Total de Tarefas */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow duration-200 cursor-default"
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-gray-400">
            <ListTodo className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">Total</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <AnimatedNumber
              value={total}
              className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            />
            <span className="text-[11px] text-slate-400 dark:text-gray-500 hidden sm:inline">
              tarefas
            </span>
          </div>
        </motion.div>

        {/* Pendentes */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow duration-200 cursor-default"
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Pendentes</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <AnimatedNumber
              value={pending}
              className="text-xl sm:text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400"
            />
            <span className="text-[11px] text-slate-400 dark:text-gray-500 hidden sm:inline">
              ativas
            </span>
          </div>
        </motion.div>

        {/* Concluídas */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-3 sm:p-4 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-md transition-shadow duration-200 cursor-default"
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Concluídas</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <AnimatedNumber
              value={completed}
              className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400"
            />
            <span className="text-[11px] text-slate-400 dark:text-gray-500 hidden sm:inline">
              feitas
            </span>
          </div>
        </motion.div>
      </div>

      {/* Barra de Progresso visual com animação fluida de largura */}
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-xs transition-colors"
        >
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
            <motion.div
              initial={false}
              animate={{ width: `${completionRate}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 dark:from-indigo-500 dark:to-indigo-400 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
