/**
 * Representação de uma tarefa no Taskly
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

/**
 * Filtros de visualização de tarefas
 */
export type TaskFilter = 'all' | 'pending' | 'completed';

/**
 * Estatísticas calculadas das tarefas
 */
export interface TaskStatsData {
  total: number;
  pending: number;
  completed: number;
  completionRate: number;
}
