import React from 'react';
import { Reorder } from 'motion/react';
import { Task, TaskFilter } from '../types/task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  totalTasksCount: number;
  activeFilter: TaskFilter;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => boolean;
  onReorderTasks: (newTasks: Task[]) => void;
  onMoveTask?: (id: string, direction: 'up' | 'down') => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalTasksCount,
  activeFilter,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onReorderTasks,
  onMoveTask,
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
    <Reorder.Group
      axis="y"
      values={tasks}
      onReorder={onReorderTasks}
      className="space-y-3.5 pb-24"
      aria-label="Lista de tarefas reordenáveis"
    >
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onMoveUp={(id) => onMoveTask?.(id, 'up')}
          onMoveDown={(id) => onMoveTask?.(id, 'down')}
          isFirst={index === 0}
          isLast={index === tasks.length - 1}
        />
      ))}
    </Reorder.Group>
  );
};
