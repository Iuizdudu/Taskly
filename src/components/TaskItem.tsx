import React, { useState, useRef, useEffect, memo } from 'react';
import { Task } from '../types/task';
import { Check, Trash2, Pencil, X, GripVertical } from 'lucide-react';
import { motion, Reorder, useDragControls } from 'motion/react';
import { formatDisplayDate } from '../utils/date';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => boolean;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = memo(({
  task,
  onToggle,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
}) => {
  const { id, title, completed, dueDate } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  // Foca e seleciona o texto ao iniciar edição
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  // Sincroniza valor caso o título mude externamente
  useEffect(() => {
    if (!isEditing) {
      setEditValue(title);
    }
  }, [title, isEditing]);

  const handleStartEdit = () => {
    setEditValue(title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    const success = onEdit(id, trimmed);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleGripKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onMoveUp?.(id);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onMoveDown?.(id);
    }
  };

  return (
    <Reorder.Item
      value={task}
      id={id}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => {
        setIsDragging(true);
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
      }}
      onDragEnd={() => {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }}
      whileDrag={{
        scale: 1.02,
        zIndex: 50,
      }}
      layout
      transition={{
        layout: {
          type: 'spring',
          stiffness: 550,
          damping: 38,
          mass: 0.5,
        },
      }}
      /* NOTA CRÍTICA DE PERFORMANCE: Nunca usar 'transition-all' aqui para não conflitar com a física do transform do Motion */
      className={`group relative flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4.5 rounded-[18px] border transition-colors duration-150 select-none ${
        isDragging
          ? 'bg-white/95 dark:bg-[#1A1C22]/95 border-indigo-500/70 dark:border-indigo-400/70 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.18),0_8px_20px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.7),0_8px_20px_-8px_rgba(0,0,0,0.5)] ring-2 ring-indigo-500/25 dark:ring-indigo-400/25 backdrop-blur-xs'
          : completed
          ? 'bg-slate-50/70 border-slate-200/50 dark:bg-[#16171B]/50 dark:border-white/5'
          : isEditing
          ? 'bg-white border-indigo-500/70 ring-2 ring-indigo-500/20 dark:bg-[#181A20] dark:border-indigo-400/60 dark:ring-indigo-500/30 shadow-[0_6px_20px_rgba(79,70,229,0.08)]'
          : 'bg-white border-slate-200/70 dark:bg-[#16171B] dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* 1. [⠿ Arrastar] Ícone de arraste com 6 pontos e resposta imediata sem atraso */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Reordenar tarefa: ${title}. Use as setas para cima ou para baixo para mover.`}
        title="Arrastar para reordenar (ou use setas ↑ ↓)"
        onPointerDown={(e) => {
          if (e.button === 0 && !isEditing) {
            dragControls.start(e);
          }
        }}
        onKeyDown={handleGripKeyDown}
        className={`p-1.5 -ml-1 sm:-ml-0.5 rounded-lg transition-colors duration-150 shrink-0 touch-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          isEditing
            ? 'opacity-30 cursor-not-allowed'
            : isDragging
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 cursor-grabbing'
            : 'text-slate-300 dark:text-gray-600 cursor-grab active:cursor-grabbing hover:text-slate-700 hover:bg-slate-100 dark:hover:text-gray-200 dark:hover:bg-white/10'
        }`}
      >
        <GripVertical className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      </div>

      {/* 2. [Checkbox] Checkbox customizado */}
      <motion.button
        type="button"
        role="checkbox"
        disabled={isEditing}
        aria-checked={completed}
        aria-label={completed ? `Desmarcar tarefa: ${title}` : `Concluir tarefa: ${title}`}
        onClick={() => !isEditing && onToggle(id)}
        whileHover={isEditing ? undefined : { scale: 1.08 }}
        whileTap={isEditing ? undefined : { scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className={`w-[22px] h-[22px] rounded-[7px] flex items-center justify-center shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white ${
          isEditing ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        } ${
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

      {/* 3. [Título da tarefa / Campo de edição inline] */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <div className="flex flex-col gap-1">
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={140}
              aria-label="Editar título da tarefa"
              placeholder="Título da tarefa..."
              className="w-full bg-slate-100/90 dark:bg-white/10 px-2.5 py-1.5 rounded-xl text-slate-900 dark:text-white border border-slate-300/80 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm sm:text-base leading-tight"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-gray-500 px-1 font-medium">
              <span>Enter salva • Esc cancela</span>
              <span>{editValue.length}/140</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => onToggle(id)}
            className="cursor-pointer select-none"
          >
            <div className="relative inline-block max-w-full origin-left">
              <h4
                className={`text-sm sm:text-base font-semibold leading-tight break-words transition-colors duration-150 ${
                  completed
                    ? 'text-slate-400 dark:text-gray-500'
                    : 'text-slate-900 dark:text-[#F3F4F6]'
                }`}
              >
                {title}
              </h4>

              {/* Linha de tachado fluida */}
              <motion.span
                initial={false}
                animate={{ width: completed ? '100%' : '0%' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-1/2 h-[1.5px] bg-slate-400 dark:bg-gray-500 pointer-events-none rounded-full origin-left"
              />
            </div>

            {/* Data de Vencimento */}
            <span className="block text-xs text-slate-400 dark:text-gray-500 mt-1 font-medium tracking-tight">
              {formatDisplayDate(dueDate)}
            </span>
          </div>
        )}
      </div>

      {/* 4. Ações à direita: [Editar] [Excluir] ou [Salvar] [Cancelar] */}
      <div className="flex items-center gap-1 shrink-0">
        {isEditing ? (
          <>
            {/* Botão Salvar (Enter) */}
            <motion.button
              type="button"
              onClick={handleSave}
              disabled={!editValue.trim()}
              aria-label="Salvar alterações da tarefa"
              title="Salvar alterações (Enter)"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`p-1.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                !editValue.trim() ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </motion.button>

            {/* Botão Cancelar (Esc) */}
            <motion.button
              type="button"
              onClick={handleCancel}
              aria-label="Cancelar edição da tarefa"
              title="Cancelar edição (Esc)"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </motion.button>
          </>
        ) : (
          <>
            {/* Botão Editar (Lápis) */}
            <motion.button
              type="button"
              onClick={handleStartEdit}
              aria-label={`Editar tarefa: ${title}`}
              title="Editar tarefa"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg text-slate-300 hover:text-slate-700 hover:bg-slate-100 dark:text-gray-600 dark:hover:text-gray-200 dark:hover:bg-white/5 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Pencil className="w-4 h-4 stroke-[2]" />
            </motion.button>

            {/* Botão Excluir (Lixeira) */}
            <motion.button
              type="button"
              onClick={() => onDelete(id)}
              aria-label={`Excluir tarefa: ${title}`}
              title="Excluir tarefa"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 dark:text-gray-600 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <Trash2 className="w-4 h-4 stroke-[2]" />
            </motion.button>
          </>
        )}
      </div>
    </Reorder.Item>
  );
});

TaskItem.displayName = 'TaskItem';
