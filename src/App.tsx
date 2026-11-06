import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeaderNav } from './components/HeaderNav';
import { GreetingSection } from './components/GreetingSection';
import { DailyFocusCard } from './components/DailyFocusCard';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { CalendarView } from './components/CalendarView';
import { NavigationDrawer } from './components/NavigationDrawer';
import { EditUserModal } from './components/EditUserModal';
import { NewTaskModal } from './components/NewTaskModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { useTheme } from './hooks/useTheme';
import { useTasks } from './hooks/useTasks';
import { useUser } from './hooks/useUser';
import { AppView } from './types/task';
import { getTodayDateString } from './utils/date';

export default function App() {
  const { preference, appliedTheme, changeThemePreference } = useTheme();
  const { userName, userAvatar, updateUserName, updateUserAvatar } = useUser();
  const {
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    selectedCalendarDate,
    setSelectedCalendarDate,
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
  } = useTasks();

  // Estados de navegação e modais
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'home' ? 'calendar' : 'home'));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0D0E11] text-slate-900 dark:text-[#F3F4F6] transition-colors duration-200">
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        {/* Barra Superior Minimalista (Menu | Título | Atalho de Visão) */}
        <HeaderNav
          currentView={currentView}
          onToggleView={toggleView}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        {/* Transição Suave entre Telas (Home vs Calendário) */}
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Saudação Personalizada com Avatar Interativo e Upload */}
              <GreetingSection
                userName={userName}
                userAvatar={userAvatar}
                pendingCount={stats.pending}
                onOpenProfile={() => setIsEditUserModalOpen(true)}
              />

              {/* Novo Card Principal Coeso: "Progresso & Foco Diário" (Things 3 / Linear / Apple Design) */}
              <DailyFocusCard
                stats={stats}
                onAddTask={(title) => addTask(title, getTodayDateString())}
              />

              {/* Abas Discretas com Sliding Pill: A Fazer | Concluídas | Todas */}
              <TaskFilters
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
                stats={stats}
              />

              {/* Lista de Tarefas Individuais Elevadas com Drag and Drop e Edição */}
              <TaskList
                tasks={filteredTasks}
                totalTasksCount={tasks.length}
                activeFilter={activeFilter}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
                onReorderTasks={reorderTasks}
                onMoveTask={moveTask}
              />
            </motion.div>
          ) : (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tela de Calendário com Edição e Reordenação por Data */}
              <CalendarView
                tasks={tasks}
                selectedDate={selectedCalendarDate}
                onSelectDate={setSelectedCalendarDate}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
                onReorderCalendarTasks={reorderCalendarTasks}
                onMoveCalendarTask={moveCalendarTask}
                tasksCountByDate={tasksCountByDate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Botão de Ação Flutuante (FAB) Preto no Canto Inferior Direito */}
      <FloatingActionButton
        onClick={() => setIsNewTaskModalOpen(true)}
        label="Adicionar nova tarefa"
      />

      {/* Drawer / Sidebar Lateral com Perfil e Temas */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentView={currentView}
        onSelectView={setCurrentView}
        userName={userName}
        userAvatar={userAvatar}
        onOpenProfile={() => setIsEditUserModalOpen(true)}
        preference={preference}
        appliedTheme={appliedTheme}
        onSelectTheme={changeThemePreference}
        stats={stats}
      />

      {/* Modal para Personalizar Nome e Foto de Perfil Localmente */}
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
        currentName={userName}
        currentAvatar={userAvatar}
        onSaveName={updateUserName}
        onSaveAvatar={updateUserAvatar}
      />

      {/* Modal para Criar Nova Tarefa com Data */}
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onAddTask={addTask}
        defaultDueDate={
          currentView === 'calendar' ? selectedCalendarDate : getTodayDateString()
        }
      />
    </div>
  );
}
