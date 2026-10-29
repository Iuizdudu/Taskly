import React from 'react';
import { Task } from '../types/task';
import { Check, Trash2 } from 'lucide-react';

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
    <li
      className={`group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 ${
        completed
          ? 'bg-slate-50/70 border-slate-200/60 dark:bg-[#181A1F]/50 dark:border-white/5'
          : 'bg-white border-slate-200/90 dark:bg-[#181A1F] dark:border-white/10 shadow-xs hover:border-slate-300 dark:hover:border-white/20'
      }`}
    >
      {/* Checkbox Circular e Descrição */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <button
          type="button"
          role="checkbox"
          aria-checked={completed}
          aria-label={completed ? `Desmarcar tarefa: ${title}` : `Concluir tarefa: ${title}`}
          onClick={() => onToggle(id)}
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#181A1F] ${
            completed
              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs'
              : 'border-[1.5px] border-slate-300 dark:border-white/30 hover:border-indigo-500 dark:hover:border-indigo-400 bg-transparent'
          }`}
        >
          {completed && (
            <Check className="w-3.5 h-3.5 stroke-[2.5] animate-scaleIn" />
          )}
        </button>

        <span
          onClick={() => onToggle(id)}
          className={`text-sm sm:text-base leading-snug break-words select-none cursor-pointer transition-colors duration-150 ${
            completed
              ? 'line-through text-slate-400 dark:text-gray-500'
              : 'text-slate-800 dark:text-[#F3F4F6] font-normal'
          }`}
        >
          {title}
        </span>
      </div>

      {/* Botão de Exclusão */}
      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label={`Excluir tarefa: ${title}`}
        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        title="Excluir tarefa"
      >
        <Trash2 className="w-4 h-4 stroke-[1.8]" />
      </button>
    </li>
  );
};
