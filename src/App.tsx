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
        {/* Cabeçalho com Marca, Título e Seletor de Tema */}
        <Header
          preference={preference}
          appliedTheme={appliedTheme}
          onSelectPreference={changeThemePreference}
        />

        {/* Formulário de Criação de Tarefas */}
        <TaskForm onAddTask={addTask} />

        {/* Indicadores de Métricas Reais */}
        <TaskStats stats={stats} />

        {/* Filtros Funcionais (Todas, Pendentes, Concluídas) */}
        <TaskFilters
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          stats={stats}
        />

        {/* Lista de Tarefas ou Estado Vazio */}
        <TaskList
          tasks={filteredTasks}
          totalTasksCount={tasks.length}
          activeFilter={activeFilter}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />

        {/* Rodapé discreto com dicas de navegação */}
        <footer className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/5 text-center text-xs text-slate-500 dark:text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Taskly &bull; Foco e produtividade</span>
          <span>Dados salvos localmente no seu navegador</span>
        </footer>
      </main>
    </div>
  );
}
