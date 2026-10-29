import React from 'react';
import { motion } from 'motion/react';
import { TaskFilter, TaskStatsData } from '../types/task';

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onSelectFilter: (filter: TaskFilter) => void;
  stats: TaskStatsData;
}

interface FilterOption {
  key: TaskFilter;
  label: string;
  getCount: (stats: TaskStatsData) => number;
}

const filters: FilterOption[] = [
  { key: 'all', label: 'Todas', getCount: (s) => s.total },
  { key: 'pending', label: 'Pendentes', getCount: (s) => s.pending },
  { key: 'completed', label: 'Concluídas', getCount: (s) => s.completed },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  activeFilter,
  onSelectFilter,
  stats,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filtro de tarefas"
      className="relative grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 mb-5 select-none"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;
        const count = filter.getCount(stats);

        return (
          <button
            key={filter.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectFilter(filter.key)}
            className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-[#22252C] -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span
              className={`transition-colors duration-150 truncate ${
                isActive
                  ? 'text-indigo-600 dark:text-[#F3F4F6] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {filter.label}
            </span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-md tabular-nums transition-colors duration-150 shrink-0 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-gray-200 font-semibold'
                  : 'bg-slate-200/60 text-slate-600 dark:bg-white/5 dark:text-gray-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
