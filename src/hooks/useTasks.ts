import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, TaskFilter, TaskStatsData } from '../types/task';
import { getTodayDateString } from '../utils/date';

const TASKS_STORAGE_KEY = 'taskly_tasks_data';

/**
 * Gera um ID único de forma resiliente para cada tarefa.
 */
function generateTaskId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Normaliza tarefas legadas adicionando dueDate caso não exista
 */
function normalizeTask(raw: Partial<Task>): Task {
  const createdAt = raw.createdAt || Date.now();
  let dueDate = raw.dueDate;
  if (!dueDate) {
    const d = new Date(createdAt);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dueDate = `${y}-${m}-${day}`;
  }

  return {
    id: raw.id || generateTaskId(),
    title: raw.title || 'Tarefa sem título',
    completed: Boolean(raw.completed),
    createdAt,
    dueDate,
  };
}

/**
 * Tarefas iniciais de exemplo na primeiríssima execução
 */
function getInitialSampleTasks(): Task[] {
  const today = getTodayDateString();
  const dTomorrow = new Date();
  dTomorrow.setDate(dTomorrow.getDate() + 1);
  const tomorrowStr = `${dTomorrow.getFullYear()}-${String(dTomorrow.getMonth() + 1).padStart(2, '0')}-${String(dTomorrow.getDate()).padStart(2, '0')}`;

  const dDayAfter = new Date();
  dDayAfter.setDate(dDayAfter.getDate() + 2);
  const dayAfterStr = `${dDayAfter.getFullYear()}-${String(dDayAfter.getMonth() + 1).padStart(2, '0')}-${String(dDayAfter.getDate()).padStart(2, '0')}`;

  return [
    {
      id: generateTaskId(),
      title: 'Tarefa de Exemplo',
      completed: false,
      createdAt: Date.now() - 3600000,
      dueDate: today,
    },
    {
      id: generateTaskId(),
      title: 'Estudar Programação',
      completed: false,
      createdAt: Date.now() - 7200000,
      dueDate: tomorrowStr,
    },
    {
      id: generateTaskId(),
      title: 'Organizar prioridades da semana',
      completed: false,
      createdAt: Date.now() - 10800000,
      dueDate: dayAfterStr,
    },
  ];
}

/**
 * Hook para gerenciar as tarefas do Taskly com persistência no LocalStorage.
 */
export function useTasks() {
  // Inicialização segura a partir do LocalStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(normalizeTask);
        }
      } else {
        // Se for a primeira visita do usuário, inicializa com tarefas de exemplo inspiradas no design
        return getInitialSampleTasks();
      }
    } catch (error) {
      console.warn('Não foi possível ler as tarefas do LocalStorage:', error);
    }
    return getInitialSampleTasks();
  });

  // Filtro ativo atual ('all', 'pending', 'completed') - padrão: 'pending' (A FAZER)
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('pending');

  // Data selecionada no calendário (padrão: hoje)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(getTodayDateString());

  // Persiste as tarefas com debounce suave para garantir 60fps constantes durante arrastes rápidos
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.warn('Não foi possível salvar as tarefas no LocalStorage:', error);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [tasks]);

  // Garante que qualquer alteração pendente seja salva imediatamente caso a aba/janela seja fechada
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch {
        // Silencia erros no encerramento da página
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [tasks]);

  // Adiciona uma nova tarefa com validação e data de vencimento
  const addTask = useCallback((title: string, customDueDate?: string): boolean => {
    const trimmed = title.trim();
    if (!trimmed) {
      return false;
    }

    const newTask: Task = {
      id: generateTaskId(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
      dueDate: customDueDate || getTodayDateString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    return true;
  }, []);

  // Alterna o estado de conclusão de uma tarefa
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Remove uma tarefa individualmente
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Edita o título de uma tarefa existente preservando seus outros dados
  const editTask = useCallback((id: string, newTitle: string): boolean => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      return false;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: trimmed } : task
      )
    );
    return true;
  }, []);

  // Reordena tarefas respeitando o filtro ativo atual com persistência no LocalStorage
  const reorderTasks = useCallback((newFilteredOrder: Task[]) => {
    setTasks((prev) => {
      if (activeFilter === 'all') {
        return newFilteredOrder;
      }

      // Substitui as tarefas do filtro ativo pelas novas em sua respectiva ordem relativa
      const filteredIds = new Set(newFilteredOrder.map((t) => t.id));
      let newFilteredIndex = 0;

      return prev.map((t) => {
        if (filteredIds.has(t.id)) {
          const replacement = newFilteredOrder[newFilteredIndex];
          newFilteredIndex++;
          return replacement || t;
        }
        return t;
      });
    });
  }, [activeFilter]);

  // Reordena tarefas dentro da visualização de calendário por data selecionada
  const reorderCalendarTasks = useCallback((newOrder: Task[], date: string) => {
    setTasks((prev) => {
      const orderIds = new Set(newOrder.map((t) => t.id));
      let orderIndex = 0;

      return prev.map((t) => {
        if (t.dueDate === date && orderIds.has(t.id)) {
          const replacement = newOrder[orderIndex];
          orderIndex++;
          return replacement || t;
        }
        return t;
      });
    });
  }, []);

  // Move uma tarefa para cima ou para baixo (acessibilidade por teclado)
  const moveTask = useCallback((id: string, direction: 'up' | 'down') => {
    const currentList = activeFilter === 'all'
      ? tasks
      : activeFilter === 'pending'
      ? tasks.filter((t) => !t.completed)
      : tasks.filter((t) => t.completed);

    const index = currentList.findIndex((t) => t.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const newList = [...currentList];
    const [moved] = newList.splice(index, 1);
    newList.splice(targetIndex, 0, moved);

    reorderTasks(newList);
  }, [activeFilter, tasks, reorderTasks]);

  // Move uma tarefa do calendário para cima ou para baixo (teclado)
  const moveCalendarTask = useCallback((id: string, direction: 'up' | 'down', date: string) => {
    const currentList = tasks.filter((t) => t.dueDate === date);
    const index = currentList.findIndex((t) => t.id === id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const newList = [...currentList];
    const [moved] = newList.splice(index, 1);
    newList.splice(targetIndex, 0, moved);

    reorderCalendarTasks(newList, date);
  }, [tasks, reorderCalendarTasks]);

  // Tarefas filtradas de acordo com o filtro ativo (A Fazer / Concluídas / Todas)
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'pending':
        return tasks.filter((t) => !t.completed);
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  // Tarefas filtradas pela data do calendário
  const calendarTasks = useMemo(() => {
    return tasks.filter((t) => t.dueDate === selectedCalendarDate);
  }, [tasks, selectedCalendarDate]);

  // Mapa de contagem de tarefas pendentes por data (YYYY-MM-DD -> número)
  const tasksCountByDate = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of tasks) {
      if (!t.completed && t.dueDate) {
        counts[t.dueDate] = (counts[t.dueDate] || 0) + 1;
      }
    }
    return counts;
  }, [tasks]);

  // Estatísticas calculadas em tempo real com referência estável durante reordenações
  const { totalCount, completedCount } = useMemo(() => {
    let comp = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) comp++;
    }
    return { totalCount: tasks.length, completedCount: comp };
  }, [tasks]);

  const stats: TaskStatsData = useMemo(() => {
    const total = totalCount;
    const completed = completedCount;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      pending,
      completed,
      completionRate,
    };
  }, [totalCount, completedCount]);

  return {
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    selectedCalendarDate,
    setSelectedCalendarDate,
    calendarTasks,
    tasksCountByDate,
    addTask,
    editTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    reorderCalendarTasks,
    moveTask,
    moveCalendarTask,
    stats,
  };
}
