import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PriceDisplay from './components/PriceDisplay';
import GameButton from './components/GameButton';
import Timer from './components/Timer';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import ResultModal from './components/ResultModal';
import Leaderboard from './pages/Leaderboard';
import Tasks from './pages/Tasks';
import BackgroundAnimation from './components/BackgroundAnimation';
import CoinSelector from './components/CoinSelector';

const COINS = [
  { id: 'BTC', name: 'Bitcoin', basePrice: 66296.0 },
  { id: 'ETH', name: 'Ethereum', basePrice: 3800.0 },
  { id: 'SOL', name: 'Solana', basePrice: 145.0 },
  { id: 'DOGE', name: 'Dogecoin', basePrice: 0.12 },
  { id: 'ADA', name: 'Cardano', basePrice: 0.72 },
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [price, setPrice] = useState(selectedCoin.basePrice);
  const [startPrice, setStartPrice] = useState(price);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [prediction, setPrediction] = useState<'moon' | 'doom' | null>(null);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pointsChange, setPointsChange] = useState(0);
  const [currentPage, setCurrentPage] = useState('race');

  useEffect(() => {
    setPrice(selectedCoin.basePrice);
    setStartPrice(selectedCoin.basePrice);
    setFinalPrice(null);
  }, [selectedCoin]);

  const determineResult = useCallback(() => {
    const random = Math.random();
    const priceChange = random > 0.5 ? 1.02 : 0.98;
    const newPrice = price * priceChange;
    setFinalPrice(newPrice);
    
    const won = (prediction === 'moon' && priceChange > 1) || 
                (prediction === 'doom' && priceChange < 1);
    
    setResult(won ? 'win' : 'lose');
    const change = won ? 10 : -10;
    setPointsChange(change);
    setPoints(prev => Math.max(0, prev + change));
    setShowModal(true);
  }, [price, prediction]);

  useEffect(() => {
    if (isPlaying && !showModal) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            determineResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPlaying, showModal, determineResult]);

  const handlePrediction = (type: 'moon' | 'doom') => {
    if (isPlaying) return;
    setStartPrice(price);
    setPrediction(type);
    setIsPlaying(true);
    setCountdown(5);
    setFinalPrice(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPlaying(false);
    setPrediction(null);
    setResult(null);
    setCountdown(5);
    setPrice(finalPrice || price);
    setFinalPrice(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'leaderboard':
        return <Leaderboard />;
      case 'tasks':
        return <Tasks />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4">
            {currentPage === 'race' && <Header points={points} />}
            
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              <CoinSelector
                coins={COINS}
                selectedCoin={selectedCoin}
                onSelect={setSelectedCoin}
                disabled={isPlaying}
              />
              
              <Timer seconds={countdown} isActive={isPlaying && !showModal} />
              
              <PriceDisplay 
                price={finalPrice || price}
                isAnimating={isPlaying && !showModal}
                coinId={selectedCoin.id}
              />
            </div>
            
            <motion.div 
              className="flex flex-row gap-4 w-full max-w-md justify-center px-4 mt-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GameButton
                type="moon"
                onClick={() => handlePrediction('moon')}
                disabled={isPlaying}
                isSelected={prediction === 'moon'}
              />
              <GameButton
                type="doom"
                onClick={() => handlePrediction('doom')}
                disabled={isPlaying}
                isSelected={prediction === 'doom'}
              />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <BackgroundAnimation />
      
      <main className="container mx-auto pb-24">
        {renderContent()}
      </main>

      <NavigationBar activePage={currentPage} onPageChange={setCurrentPage} />

      <ResultModal
        isOpen={showModal}
        onClose={handleCloseModal}
        result={result || 'lose'}
        startPrice={startPrice}
        endPrice={finalPrice || price}
        pointsChange={pointsChange}
        totalPoints={points}
        coinId={selectedCoin.id}
      />
    </div>
  );
}

export default App;