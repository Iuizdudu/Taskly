import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskFormProps {
  onAddTask: (title: string) => boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setErrorMessage('Por favor, digite uma descrição para a tarefa.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 320);
      return;
    }

    const success = onAddTask(trimmed);
    if (success) {
      setInputValue('');
      setErrorMessage('');
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 850);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div
        className={`relative flex items-center transition-transform duration-200 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        <label htmlFor="task-input" className="sr-only">
          Adicionar nova tarefa
        </label>
        <input
          id="task-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Adicione uma tarefa..."
          className={`w-full h-13 pl-4 pr-32 text-sm sm:text-base rounded-xl bg-white dark:bg-[#181A1F] text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-gray-500 border transition-all duration-200 shadow-xs focus:outline-none ${
            errorMessage
              ? 'border-red-400 dark:border-red-500/60 focus:ring-3 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-3 focus:ring-indigo-500/15 focus:shadow-md'
          }`}
        />

        <motion.button
          type="submit"
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          className="absolute right-2 h-9 px-3.5 sm:px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors duration-150 shadow-sm shadow-indigo-600/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#181A1F]"
          aria-label="Adicionar tarefa à lista"
        >
          {justAdded ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-1"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline">Salvo</span>
            </motion.div>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline">Adicionar</span>
            </>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-2 text-xs text-red-500 dark:text-red-400 pl-1"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};
