import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface HeaderProps {
  points: number;
}

export default function Header({ points }: HeaderProps) {
  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="bg-gray-900/80 rounded-full px-8 py-3 flex items-center gap-3 backdrop-blur-lg shadow-lg border border-gray-800/50"
        whileHover={{ scale: 1.05 }}
      >
        <Trophy className="text-yellow-500 w-6 h-6" />
        <span className="text-white font-medium text-lg">{points} Points</span>
      </motion.div>
    </motion.div>
  );
}