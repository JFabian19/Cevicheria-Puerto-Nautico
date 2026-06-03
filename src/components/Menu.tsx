import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import type { MenuCategory, LayoutDesign } from '../types';

const getCategoryImageSrc = (categoria: string) => {
  const mapping: Record<string, string> = {
    'CEVICHES': 'ceviches.webp',
    'Frituras & Chicharrón': 'frituras-chicharron.webp',
    'COMBOS & ARROCES': 'combos-arroces.webp',
    'COMBINADOS': 'combinados.webp',
    'PLATOS ESPECIALES': 'platos-especiales.webp',
    'PORCIONES': 'porciones.webp',
    'BEBIDAS & POSTRES': 'bebidas-postres.webp'
  };
  return mapping[categoria] ? `/${mapping[categoria]}` : null;
};

interface MenuProps {
  menuData: MenuCategory[];
  diseno: LayoutDesign;
}

export default function Menu({ menuData, diseno }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(menuData[0]?.categoria || '');
  const categoryNavRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // ScrollSpy observer
    observerRef.current = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by how much of the element is visible
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisible = visibleEntries[0].target.getAttribute('data-category');
        if (mostVisible && mostVisible !== activeCategory) {
          setActiveCategory(mostVisible);
        }
      }
    }, {
      rootMargin: '-20% 0px -70% 0px', // Trigger when element hits top part of screen
      threshold: 0
    });

    const elements = document.querySelectorAll('.category-section');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [menuData, activeCategory]);

  // Auto-scroll the pill bar when active category changes
  useEffect(() => {
    if (categoryNavRef.current) {
      const activeBtn = categoryNavRef.current.querySelector(`button[data-active="true"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoria: string) => {
    setActiveCategory(categoria);
    const element = document.getElementById(`category-${categoria.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredMenuData = menuData.filter(cat => cat.items.length > 0);

  // Dynamic grid class based on JSON design
  const getGridColsClass = (cols: number) => {
    switch (cols) {
      case 1:
        return 'grid-cols-1 max-w-2xl mx-auto';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 2:
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  return (
    <div id="menu-section" className="max-w-5xl mx-auto px-4 py-8 relative">
      
      {/* Categories Bar */}
      <div 
        ref={categoryNavRef}
        className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 sticky top-0 z-40 pt-4 backdrop-blur-md border-b border-black/5 rounded-2xl transition-colors duration-300"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        {menuData.map((cat) => {
          const isActive = activeCategory === cat.categoria;
          
          return (
            <button
              key={cat.categoria}
              data-active={isActive}
              onClick={() => handleCategoryClick(cat.categoria)}
              style={{
                backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-card-bg)',
                borderColor: isActive ? 'var(--color-primary)' : 'rgba(0, 0, 0, 0.05)',
                color: isActive ? '#FFFFFF' : 'var(--color-text-subtitle)',
              }}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-body text-sm md:text-base transition-all duration-300 font-semibold border shadow-sm ${
                isActive 
                  ? 'scale-105 shadow-md' 
                  : 'hover:border-black/10'
              }`}
            >
              {cat.categoria}
            </button>
          );
        })}
      </div>

      {/* Categories Sections */}
      <div className="space-y-16 mt-8">
        {filteredMenuData.length > 0 ? (
          filteredMenuData.map((cat) => {
            return (
              <div 
                key={cat.categoria} 
                id={`category-${cat.categoria.replace(/[^a-zA-Z0-9]/g, '-')}`}
                className="category-section scroll-mt-32"
                data-category={cat.categoria}
              >
                {/* Header Category with dynamic title color and font */}
                <div className="flex justify-between items-center mb-6">
                  <h2 
                    style={{ color: 'var(--color-text-title)' }}
                    className="text-3xl md:text-5xl font-bold font-display"
                  >
                    {cat.categoria}
                  </h2>
                </div>

                {/* Category Banner Image with Fallback */}
                {(() => {
                  const imgSrc = getCategoryImageSrc(cat.categoria);
                  
                  return imgSrc ? (
                    <div 
                      style={{ borderRadius: 'var(--radius-custom)' }}
                      className="w-full mb-8 relative group overflow-hidden select-none shadow-md border border-black/5 bg-black/[0.01]"
                    >
                      <img 
                        src={imgSrc} 
                        alt={cat.categoria} 
                        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Premium subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Decorative tag */}
                      <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6 z-10">
                        <span className="text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 font-body">
                          Especialidad
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Elegant Placeholder for "Aca va imagen" (Caleteado) */
                    <div 
                      style={{ borderRadius: 'var(--radius-custom)' }}
                      className="w-full h-36 md:h-48 mb-8 flex flex-col items-center justify-center border-2 border-dashed border-black/15 bg-black/[0.02] relative group overflow-hidden select-none"
                    >
                      <ImageIcon size={32} className="text-black/20 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span 
                        style={{ color: 'var(--color-text-body)' }}
                        className="font-medium text-xs md:text-sm tracking-widest uppercase opacity-40 font-body"
                      >
                        acá va imagen de {cat.categoria.toLowerCase()}
                      </span>
                    </div>
                  );
                })()}

                {/* Grid of items (responsive columns based on design settings) */}
                <motion.div 
                  layout
                  className={`grid gap-5 ${getGridColsClass(diseno.columnas_items)}`}
                >
                  <AnimatePresence mode="popLayout">
                    {cat.items.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MenuItemCard
                          item={item}
                          categoria={cat.categoria}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })
        ) : (
          <div 
            style={{ color: 'var(--color-text-body)' }}
            className="col-span-full py-20 text-center font-medium opacity-60"
          >
            No se encontraron productos en la carta.
          </div>
        )}
      </div>
    </div>
  );
}
