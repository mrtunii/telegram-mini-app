import { motion } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface GameButtonProps {
  type: 'moon' | 'doom';
  onClick: () => void;
  disabled: boolean;
  isSelected: boolean;
}

export default function GameButton({ type, onClick, disabled, isSelected }: GameButtonProps) {
  const variants = {
    hover: { scale: 1.05, y: -5 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5 }
  };

  const getButtonStyle = () => {
    if (type === 'moon') {
      if (isSelected) return 'bg-green-700 text-white cursor-not-allowed';
      return 'bg-green-500 hover:bg-green-600 text-white';
    } else {
      if (isSelected) return 'bg-red-700 text-white cursor-not-allowed';
      return 'bg-red-500 hover:bg-red-600 text-white';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2
        ${getButtonStyle()}
        disabled:opacity-50 disabled:cursor-not-allowed
        flex-1 transition-colors duration-200
      `}
      variants={variants}
      whileHover={!disabled && !isSelected ? "hover" : undefined}
      whileTap={!disabled && !isSelected ? "tap" : undefined}
      animate={disabled ? "disabled" : ""}
    >
      {type === 'moon' ? (
        <>
          MOON <ArrowUpCircle className="w-5 h-5" />
        </>
      ) : (
        <>
          DOOM <ArrowDownCircle className="w-5 h-5" />
        </>
      )}
    </motion.button>
  );
}