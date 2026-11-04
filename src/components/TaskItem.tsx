import React from 'react';
import { Task } from '../types/task';
import { Check, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDisplayDate } from '../utils/date';

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
  const { id, title, completed, dueDate } = task;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.96,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: 'hidden',
        transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
      }}
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 480, damping: 32 }}
      className={`group flex items-center justify-between gap-4 p-4 sm:p-5 rounded-[18px] border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        completed
          ? 'bg-slate-50/70 border-slate-200/50 dark:bg-[#16171B]/50 dark:border-white/5'
          : 'bg-white border-slate-200/70 dark:bg-[#16171B] dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Checkbox customizado com clique macio e animação refinada */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        <motion.button
          type="button"
          role="checkbox"
          aria-checked={completed}
          aria-label={completed ? `Desmarcar tarefa: ${title}` : `Concluir tarefa: ${title}`}
          onClick={() => onToggle(id)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className={`w-[22px] h-[22px] rounded-[7px] flex items-center justify-center shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white ${
            completed
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
              : 'border-[1.8px] border-slate-300 dark:border-white/30 hover:border-slate-800 dark:hover:border-white/60 bg-transparent'
          }`}
        >
          {completed && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 28 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </motion.div>
          )}
        </motion.button>

        {/* Conteúdo com risco do texto e micro-escala */}
        <div
          onClick={() => onToggle(id)}
          className="min-w-0 flex-1 cursor-pointer select-none"
        >
          <motion.div
            animate={{ scale: completed ? 0.985 : 1 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block max-w-full origin-left"
          >
            <h4
              className={`text-sm sm:text-base font-semibold leading-tight break-words transition-colors duration-200 ${
                completed
                  ? 'text-slate-400 dark:text-gray-500'
                  : 'text-slate-900 dark:text-[#F3F4F6]'
              }`}
            >
              {title}
            </h4>

            {/* Linha de tachado com expansão fluida ease-[cubic-bezier(0.16,1,0.3,1)] */}
            <motion.span
              initial={false}
              animate={{ width: completed ? '100%' : '0%' }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-1/2 h-[1.5px] bg-slate-400 dark:bg-gray-500 pointer-events-none rounded-full origin-left"
            />
          </motion.div>

          {/* Data de Vencimento com tipografia suave */}
          <span className="block text-xs text-slate-400 dark:text-gray-500 mt-1 font-medium tracking-tight">
            {formatDisplayDate(dueDate)}
          </span>
        </div>
      </div>

      {/* Botão de Exclusão Discreto */}
      <motion.button
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Excluir tarefa: ${title}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 dark:text-gray-600 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        title="Excluir tarefa"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </motion.li>
  );
};
