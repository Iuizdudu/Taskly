import React from 'react';
import { Task } from '../types/task';
import { Check, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  const { id, title, completed } = task;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.96,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: 'hidden',
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      className={`group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-colors duration-200 ${
        completed
          ? 'bg-slate-50/70 border-slate-200/60 dark:bg-[#181A1F]/50 dark:border-white/5'
          : 'bg-white border-slate-200/90 dark:bg-[#181A1F] dark:border-white/10 shadow-xs hover:border-slate-300 dark:hover:border-white/20 hover:shadow-sm'
      }`}
    >
      {/* Checkbox Circular e Descrição */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <motion.button
          type="button"
          role="checkbox"
          aria-checked={completed}
          aria-label={completed ? `Desmarcar tarefa: ${title}` : `Concluir tarefa: ${title}`}
          onClick={() => onToggle(id)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#181A1F] ${
            completed
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs'
              : 'border-[1.5px] border-slate-300 dark:border-white/30 hover:border-indigo-500 dark:hover:border-indigo-400 bg-transparent'
          }`}
        >
          {completed && (
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 28 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.div>
          )}
        </motion.button>

        <div
          onClick={() => onToggle(id)}
          className="relative inline-block min-w-0 flex-1 cursor-pointer select-none"
        >
          <span
            className={`text-sm sm:text-base leading-snug break-words transition-colors duration-200 ${
              completed
                ? 'text-slate-400 dark:text-gray-500'
                : 'text-slate-800 dark:text-[#F3F4F6] font-normal'
            }`}
          >
            {title}
          </span>

          {/* Linha de tachado com expansão animada suave */}
          <motion.span
            initial={false}
            animate={{ width: completed ? '100%' : '0%' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-1/2 h-[1.5px] bg-slate-400 dark:bg-gray-500 pointer-events-none rounded-full origin-left"
          />
        </div>
      </div>

      {/* Botão de Exclusão */}
      <motion.button
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Excluir tarefa: ${title}`}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        title="Excluir tarefa"
      >
        <Trash2 className="w-4 h-4 stroke-[1.8]" />
      </motion.button>
    </motion.li>
  );
};
