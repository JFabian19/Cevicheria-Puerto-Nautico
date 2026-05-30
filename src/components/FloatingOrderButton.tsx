import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

interface FloatingOrderButtonProps {
  onClick: () => void;
}

export default function FloatingOrderButton({ onClick }: FloatingOrderButtonProps) {
  const { getTotalItems, getTotalPrice } = useOrder();
  const totalItems = getTotalItems();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={onClick}
          style={{ 
            backgroundColor: 'var(--color-primary)', 
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.15)'
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] text-white px-8 py-4 rounded-full flex items-center gap-3 hover:opacity-95 active:scale-95 transition-all font-body"
          whileTap={{ scale: 0.95 }}
        >
          {/* Badge */}
          <div className="relative">
            <ShoppingCart size={22} />
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ backgroundColor: 'var(--color-secondary)' }}
              className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
            >
              {totalItems}
            </motion.span>
          </div>
          <span className="font-bold text-base md:text-lg">
            Ver Pedido
          </span>
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} className="font-bold text-sm px-3 py-1 rounded-full">
            S/ {getTotalPrice().toFixed(2)}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
