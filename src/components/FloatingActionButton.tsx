import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingActionButtonProps {
  onClick: () => void;
  label?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  label = 'Adicionar nova tarefa',
}) => {
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={label}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#181A20] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.15)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30"
        title={label}
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </motion.button>
    </div>
  );
};
