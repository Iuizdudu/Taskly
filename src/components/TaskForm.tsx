import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string) => boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (!trimmed) {
      setErrorMessage('Por favor, digite uma descrição para a tarefa.');
      return;
    }

    const success = onAddTask(trimmed);
    if (success) {
      setInputValue('');
      setErrorMessage('');
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
      <div className="relative flex items-center">
        <label htmlFor="task-input" className="sr-only">
          Adicionar nova tarefa
        </label>
        <input
          id="task-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Adicione uma tarefa..."
          className="w-full h-13 pl-4 pr-32 text-sm sm:text-base rounded-xl bg-white dark:bg-[#181A1F] text-slate-900 dark:text-[#F3F4F6] placeholder-slate-400 dark:placeholder-gray-500 border border-slate-200 dark:border-white/10 shadow-xs focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 transition-all duration-150"
        />

        <button
          type="submit"
          className="absolute right-2 h-9 px-3.5 sm:px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors duration-150 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#181A1F]"
          aria-label="Adicionar tarefa à lista"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden xs:inline">Adicionar</span>
        </button>
      </div>

      {errorMessage && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400 animate-fadeIn pl-1">
          {errorMessage}
        </p>
      )}
    </form>
  );
};
