import { motion } from 'framer-motion';
import { NumericFormat } from 'react-number-format';
import { useEffect, useState, useCallback } from 'react';

interface PriceDisplayProps {
  price: number;
  isAnimating: boolean;
  coinId: string;
}

export default function PriceDisplay({ price, isAnimating, coinId }: PriceDisplayProps) {
  const [displayPrice, setDisplayPrice] = useState(price);

  const updatePrice = useCallback(() => {
    if (isAnimating) {
      setDisplayPrice(Math.random() * (price * 1.1 - price * 0.9) + price * 0.9);
    } else {
      setDisplayPrice(price);
    }
  }, [isAnimating, price]);

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(updatePrice, 100);
      return () => clearInterval(interval);
    } else {
      updatePrice();
    }
  }, [isAnimating, updatePrice]);

  return (
    <motion.div
      className="bg-gray-900 rounded-3xl p-8 backdrop-blur-lg bg-opacity-90 shadow-2xl border border-gray-800/50 w-full max-w-md mx-auto"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div 
        className="text-center"
        animate={{ 
          scale: isAnimating ? [1, 1.02, 1] : 1,
        }}
        transition={{ 
          duration: 0.5,
          repeat: isAnimating ? Infinity : 0,
        }}
      >
        <div className="text-gray-400 mb-2 text-sm font-medium">{coinId} Price</div>
        <div className="font-mono text-4xl md:text-6xl text-white tracking-wider">
          <NumericFormat
            value={displayPrice}
            displayType="text"
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            className={`transition-all ${isAnimating ? 'blur-sm' : ''}`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}