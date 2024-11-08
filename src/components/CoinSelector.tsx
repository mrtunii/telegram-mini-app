import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Coin {
  id: string;
  name: string;
  basePrice: number;
}

interface CoinSelectorProps {
  coins: Coin[];
  selectedCoin: Coin;
  onSelect: (coin: Coin) => void;
  disabled?: boolean;
}

export default function CoinSelector({ coins, selectedCoin, onSelect, disabled }: CoinSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          bg-gray-800 rounded-xl px-4 py-2 flex items-center gap-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="font-medium">{selectedCoin.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg z-20"
          >
            {coins.map((coin) => (
              <button
                key={coin.id}
                className={`
                  w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors
                  ${selectedCoin.id === coin.id ? 'bg-gray-700' : ''}
                `}
                onClick={() => {
                  onSelect(coin);
                  setIsOpen(false);
                }}
              >
                {coin.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}