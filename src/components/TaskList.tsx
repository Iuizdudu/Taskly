import React from 'react';
import { Task, TaskFilter } from '../types/task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  totalTasksCount: number;
  activeFilter: TaskFilter;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalTasksCount,
  activeFilter,
  onToggleTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        filter={activeFilter}
        hasAnyTasks={totalTasksCount > 0}
      />
    );
  }

  return (
    <ul className="space-y-2.5" aria-label="Lista de tarefas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
};
