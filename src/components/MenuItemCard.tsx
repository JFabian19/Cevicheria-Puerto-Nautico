import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';

interface MenuItemCardProps {
  item: MenuItem;
  categoria: string;
}

export default function MenuItemCard({ item, categoria }: MenuItemCardProps) {
  const { addItem, removeItem, getItemQuantity } = useOrder();
  const qty = getItemQuantity(item.id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="layout-card p-5 relative flex flex-col justify-between h-full select-none"
    >
      <div>
        <div className="flex justify-between items-start gap-4 mb-2">
          {/* Subtitle / Plate Name style from theme */}
          <h3 
            style={{ color: 'var(--color-text-subtitle)' }}
            className="text-lg md:text-xl font-semibold leading-snug font-display"
          >
            {item.nombre}
          </h3>
          {/* Price style from theme */}
          <span 
            style={{ color: 'var(--color-text-price)' }}
            className="font-bold whitespace-nowrap text-lg font-body"
          >
            S/ {item.precio.toFixed(2)}
          </span>
        </div>
        
        {item.descripcion && (
          <p 
            style={{ color: 'var(--color-text-body)' }}
            className="text-sm opacity-85 mt-1 font-body leading-relaxed"
          >
            {item.descripcion}
          </p>
        )}
      </div>

      {/* Add to order controls */}
      <div className="flex items-center justify-end mt-4 gap-2">
        {qty > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => removeItem(item.id)}
              className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors active:scale-90"
            >
              <Minus size={16} />
            </button>
            <motion.span
              key={qty}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              style={{ color: 'var(--color-text-subtitle)' }}
              className="w-6 text-center font-bold"
            >
              {qty}
            </motion.span>
          </motion.div>
        )}
        <button
          onClick={() => addItem(item, categoria)}
          style={{
            backgroundColor: qty > 0 ? 'var(--color-primary)' : 'rgba(var(--color-primary), 0.1)',
            color: qty > 0 ? '#FFFFFF' : 'var(--color-primary)'
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-sm ${
            qty > 0
              ? 'hover:opacity-90'
              : 'bg-opacity-10 hover:bg-opacity-20'
          }`}
        >
          {qty > 0 ? (
            <Plus size={18} className="text-white" />
          ) : (
            <Plus size={18} style={{ color: 'var(--color-primary)' }} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
