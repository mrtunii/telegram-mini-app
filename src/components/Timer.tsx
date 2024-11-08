import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
  isActive: boolean;
}

export default function Timer({ seconds, isActive }: TimerProps) {
  return (
    <motion.div
      className="mb-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: isActive ? 1 : 0 }}
    >
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-2 text-white font-mono text-xl text-center">
        {seconds}s
      </div>
    </motion.div>
  );
}