import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: 'win' | 'lose';
  startPrice: number;
  endPrice: number;
  pointsChange: number;
  totalPoints: number;
}

export default function ResultModal({
  isOpen,
  onClose,
  result,
  startPrice,
  endPrice,
  pointsChange,
  totalPoints,
}: ResultModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-3xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                className={`rounded-full p-4 ${
                  result === 'win' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}
              >
                {result === 'win' ? (
                  <Check className="w-12 h-12 text-green-500" />
                ) : (
                  <X className="w-12 h-12 text-red-500" />
                )}
              </motion.div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">
              {result === 'win' ? 'You Won!' : 'You Lost!'}
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-sm text-gray-400">Starting Price</div>
                <NumericFormat
                  value={startPrice}
                  displayType="text"
                  thousandSeparator=","
                  prefix="$"
                  decimalScale={2}
                  className="text-xl font-mono"
                />
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-sm text-gray-400">Final Price</div>
                <NumericFormat
                  value={endPrice}
                  displayType="text"
                  thousandSeparator=","
                  prefix="$"
                  decimalScale={2}
                  className="text-xl font-mono"
                />
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-sm text-gray-400">Points Change</div>
                <div className={`text-xl font-bold ${
                  pointsChange >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {pointsChange >= 0 ? '+' : ''}{pointsChange}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-sm text-gray-400">Total Points</div>
                <div className="text-xl font-bold">{totalPoints}</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 mt-6 font-bold"
              onClick={onClose}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}