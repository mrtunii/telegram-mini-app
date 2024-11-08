import { motion } from 'framer-motion';
import { Home, Trophy, CheckSquare, Users, Gift } from 'lucide-react';

interface NavigationBarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function NavigationBar({ activePage, onPageChange }: NavigationBarProps) {
  const navItems = [
    { id: 'race', icon: Home, label: 'Race' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'invite', icon: Users, label: 'Invite', disabled: true },
    { id: 'surprises', icon: Gift, label: 'Surprises', disabled: true }
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <nav className="max-w-lg mx-auto px-4 py-2 flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onPageChange(item.id)}
            className={`flex flex-col items-center gap-1 py-2 transition-colors ${
              item.disabled 
                ? 'text-gray-600 cursor-not-allowed' 
                : activePage === item.id
                ? 'text-white' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    </motion.div>
  );
}