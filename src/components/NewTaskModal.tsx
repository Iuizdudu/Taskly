import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getTodayDateString } from '../utils/date';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string, dueDate: string) => boolean;
  defaultDueDate?: string;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  defaultDueDate,
}) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(defaultDueDate || getTodayDateString());
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDueDate(defaultDueDate || getTodayDateString());
      setError('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, defaultDueDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Por favor, informe a descrição da tarefa.');
      return;
    }

    const ok = onAddTask(trimmed, dueDate);
    if (ok) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Overlay escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Modal / Bottom Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            className="relative w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-white dark:bg-[#181A1F] p-6 shadow-2xl border border-slate-200/80 dark:border-white/10 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Nova Tarefa
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="task-title-input"
                  className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5"
                >
                  O que precisa ser feito?
                </label>
                <input
                  id="task-title-input"
                  ref={inputRef}
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ex: Estudar programação, Comprar café..."
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                {error && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="task-due-date-input"
                  className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5"
                >
                  Data de vencimento
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    id="task-due-date-input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-slate-900/10 transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Adicionar Tarefa</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
