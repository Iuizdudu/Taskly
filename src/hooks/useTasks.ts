import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, TaskFilter, TaskStatsData } from '../types/task';

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
 * Hook para gerenciar as tarefas do Taskly com persistência no LocalStorage.
 */
export function useTasks() {
  // Inicialização segura a partir do LocalStorage (vazio na primeira execução)
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem(TASKS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('Não foi possível ler as tarefas do LocalStorage:', error);
    }
    return [];
  });

  // Filtro ativo atual
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');

  // Persiste as tarefas sempre que houver alteração
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn('Não foi possível salvar as tarefas no LocalStorage:', error);
    }
  }, [tasks]);

  // Adiciona uma nova tarefa com validação
  const addTask = useCallback((title: string): boolean => {
    const trimmed = title.trim();
    if (!trimmed) {
      return false;
    }

    const newTask: Task = {
      id: generateTaskId(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
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

  // Tarefas filtradas de acordo com o filtro ativo
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

  // Estatísticas calculadas em tempo real
  const stats: TaskStatsData = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      pending,
      completed,
      completionRate,
    };
  }, [tasks]);

  return {
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    addTask,
    toggleTask,
    deleteTask,
    stats,
  };
}
