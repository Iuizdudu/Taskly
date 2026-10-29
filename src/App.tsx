import { motion } from 'motion/react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskStats } from './components/TaskStats';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { useTheme } from './hooks/useTheme';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const { preference, appliedTheme, changeThemePreference } = useTheme();
  const {
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    addTask,
    toggleTask,
    deleteTask,
    stats,
  } = useTasks();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D0E11] text-slate-900 dark:text-[#F3F4F6] transition-colors duration-200">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 1. Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Header
            preference={preference}
            appliedTheme={appliedTheme}
            onSelectPreference={changeThemePreference}
          />
        </motion.div>

        {/* 2. Campo de Criação de Tarefas */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <TaskForm onAddTask={addTask} />
        </motion.div>

        {/* 3. Indicadores de Métricas Reais */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <TaskStats stats={stats} />
        </motion.div>

        {/* 4. Filtros de Tarefas */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <TaskFilters
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            stats={stats}
          />
        </motion.div>

        {/* 5. Lista de Tarefas ou Estado Vazio */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <TaskList
            tasks={filteredTasks}
            totalTasksCount={tasks.length}
            activeFilter={activeFilter}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </motion.div>

        {/* Rodapé discreto */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/5 text-center text-xs text-slate-500 dark:text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <span>Taskly &bull; Foco e produtividade</span>
          <span>Dados salvos localmente no seu navegador</span>
        </motion.footer>
      </main>
    </div>
  );
}
