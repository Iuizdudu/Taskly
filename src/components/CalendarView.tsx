import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';
import { getWeekDays, formatMonthYear, getTodayDateString } from '../utils/date';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

interface CalendarViewProps {
  tasks: Task[];
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  tasksCountByDate: Record<string, number>;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  selectedDate,
  onSelectDate,
  onToggleTask,
  onDeleteTask,
  tasksCountByDate,
}) => {
  // Converte selectedDate em objeto Date para cálculo da semana e mês
  const activeDateObj = useMemo(() => {
    if (!selectedDate) return new Date();
    const parts = selectedDate.split('-');
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    return new Date();
  }, [selectedDate]);

  const weekDays = useMemo(() => {
    return getWeekDays(activeDateObj);
  }, [activeDateObj]);

  const monthYearLabel = useMemo(() => {
    return formatMonthYear(activeDateObj);
  }, [activeDateObj]);

  const todayStr = getTodayDateString();
  const isSelectedToday = selectedDate === todayStr;

  // Tarefas da data selecionada
  const tasksForSelectedDate = useMemo(() => {
    return tasks.filter((t) => t.dueDate === selectedDate);
  }, [tasks, selectedDate]);

  return (
    <div className="pb-24">
      {/* Título do Mês e Ano (conforme Referência 2: "June 2023") */}
      <div className="mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {monthYearLabel}
        </h2>
      </div>

      {/* Carrossel Semanal de Dias (DOM, SEG, TER, QUA, QUI, SEX, SÁB) */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#181A1F] border border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] mb-6 select-none">
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map((day) => {
            const isSelected = day.dateStr === selectedDate;
            const count = tasksCountByDate[day.dateStr] || 0;

            return (
              <div key={day.dateStr} className="flex flex-col items-center">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-gray-500 mb-2">
                  {day.dayShort}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectDate(day.dateStr)}
                  className="relative group p-1 focus:outline-none cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900 scale-105'
                        : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {day.dayNumber}
                  </div>

                  {/* Badge numérico de tarefas pendentes (conforme badge azul "1" da referência) */}
                  {count > 0 && (
                    <span className="absolute -top-1 -right-0.5 w-4 h-4 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs border-2 border-white dark:border-[#181A1F]">
                      {count}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Linha de pegada / divisor sutil conforme imagem 2 */}
        <div className="w-12 h-1 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mt-6" />
      </div>

      {/* Seção "Tarefas para hoje" / "Tarefas para esta data" */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isSelectedToday ? 'Tarefas para hoje' : 'Tarefas para esta data'}
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            {tasksForSelectedDate.length}{' '}
            {tasksForSelectedDate.length === 1 ? 'tarefa' : 'tarefas'}
          </span>
        </div>

        {tasksForSelectedDate.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white/60 dark:bg-[#181A1F]/40 border border-dashed border-slate-200 dark:border-white/10">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 mx-auto flex items-center justify-center text-slate-400 mb-3">
              <CheckCircle2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-gray-300">
              Nenhuma tarefa agendada para este dia
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Toque no botão &ldquo;+&rdquo; no canto inferior para agendar.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {tasksForSelectedDate.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
};
