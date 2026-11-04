/**
 * Representação de uma tarefa no Taskly
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  dueDate?: string; // Formato YYYY-MM-DD
}

/**
 * Filtros de visualização de tarefas
 */
export type TaskFilter = 'all' | 'pending' | 'completed';

/**
 * Visualizações principais da aplicação
 */
export type AppView = 'home' | 'calendar';

/**
 * Estatísticas calculadas das tarefas
 */
export interface TaskStatsData {
  total: number;
  pending: number;
  completed: number;
  completionRate: number;
}
