import { motion } from 'framer-motion';
import { CheckSquare, Lock } from 'lucide-react';

const tasks = [
  {
    title: 'First Prediction',
    description: 'Make your first price prediction',
    reward: 50,
    completed: true
  },
  {
    title: 'Win Streak',
    description: 'Get 3 correct predictions in a row',
    reward: 100,
    completed: false
  },
  {
    title: 'High Roller',
    description: 'Accumulate 1000 points',
    reward: 200,
    completed: false
  },
  {
    title: 'Perfect Day',
    description: 'Win 10 predictions in one day',
    reward: 500,
    locked: true
  }
];

export default function Tasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <CheckSquare className="w-8 h-8 text-green-500" />
        <h1 className="text-2xl font-bold">Daily Tasks</h1>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 ${
              task.locked ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold flex items-center gap-2">
                {task.title}
                {task.locked && <Lock className="w-4 h-4" />}
              </div>
              <div className="text-yellow-500 font-medium">+{task.reward}</div>
            </div>
            <div className="text-sm text-gray-400 mb-3">{task.description}</div>
            {!task.locked && (
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-full rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: task.completed ? '100%' : '60%' }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}