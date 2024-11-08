import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'CryptoKing', points: 2500 },
  { rank: 2, name: 'MoonWalker', points: 2100 },
  { rank: 3, name: 'BitcoinBaron', points: 1800 },
  { rank: 4, name: 'TradeNinja', points: 1600 },
  { rank: 5, name: 'CoinMaster', points: 1400 },
];

export default function Leaderboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </div>

      <div className="space-y-3">
        {leaderboardData.map((item) => (
          <motion.div
            key={item.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.rank * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-8 text-center font-bold text-lg">
              {item.rank}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-400">{item.points} points</div>
            </div>
            {item.rank <= 3 && (
              <Medal className={`w-6 h-6 ${
                item.rank === 1 ? 'text-yellow-500' :
                item.rank === 2 ? 'text-gray-400' :
                'text-amber-700'
              }`} />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}