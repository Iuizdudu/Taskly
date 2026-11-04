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
  { key: 'pending', label: 'A Fazer', getCount: (s) => s.pending },
  { key: 'completed', label: 'Concluídas', getCount: (s) => s.completed },
  { key: 'all', label: 'Todas', getCount: (s) => s.total },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  activeFilter,
  onSelectFilter,
  stats,
}) => {
  return (
    <div className="mb-6 flex items-center justify-center">
      <div
        role="tablist"
        aria-label="Filtro de tarefas"
        className="inline-flex items-center p-1 rounded-full bg-[#F4F4F6] dark:bg-[#1A1C21] border border-slate-200/60 dark:border-white/5 select-none"
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
              className="relative px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none flex items-center gap-1.5 rounded-full"
            >
              {/* Sliding Pill animada de fundo */}
              {isActive && (
                <motion.div
                  layoutId="activeFilterSlidingPill"
                  className="absolute inset-0 rounded-full bg-white dark:bg-[#252830] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}

              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-bold'
                    : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200'
                }`}
              >
                {filter.label}
              </span>

              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white'
                    : 'bg-transparent text-slate-400 dark:text-gray-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
