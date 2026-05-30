import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Footer from './components/Footer';
import OrderPanel from './components/OrderPanel';
import FloatingOrderButton from './components/FloatingOrderButton';
import DynamicTheme from './components/DynamicTheme';
import { OrderProvider } from './context/OrderContext';
import { menuData as initialMenuData } from './data/menu';
import type { DynamicMenuJSON, ProcessedMenuData } from './types';

// Utility to process raw JSON from Gemini (which has no IDs) and inject auto-generated sequential IDs
// This guarantees that all order/cart mechanisms continue to work seamlessly!
function processMenuData(raw: DynamicMenuJSON): ProcessedMenuData {
  let counter = 1;
  const processedMenu = raw.menu.map(cat => ({
    categoria: cat.categoria,
    items: cat.items.map(item => ({
      ...item,
      id: `plate-${counter++}` // Auto-generate simple, unique IDs
    }))
  }));

  return {
    ...raw,
    menu: processedMenu
  };
}

function App() {
  const [rawConfig, setRawConfig] = useState<DynamicMenuJSON>(initialMenuData);
  const [orderOpen, setOrderOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load configuration from local storage on mount
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('dynamicMenuConfig');
      if (savedConfig) {
        setRawConfig(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Failed to load menu config from localStorage, using defaults:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Dynamically update the HTML Document Title to match the restaurant's name
  useEffect(() => {
    if (rawConfig.informacion_restaurante?.nombre) {
      document.title = rawConfig.informacion_restaurante.nombre;
    }
  }, [rawConfig.informacion_restaurante?.nombre]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-slate-200">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-semibold text-sm tracking-widest uppercase opacity-65">Cargando tu carta...</p>
      </div>
    );
  }

  // Pre-process raw config to generate internal IDs
  const processedConfig = processMenuData(rawConfig);

  return (
    <OrderProvider>
      {/* 1. Dynamic Theme Variable and Font Injector */}
      <DynamicTheme config={processedConfig} />

      {/* 2. Page Container with Fixed Background support */}
      {/* We make sure overflow-y-auto is specified and no scroll-locking classes are present */}
      <div className="min-h-screen w-full relative font-body transition-colors duration-500">
        
        {/* Dynamic Fixed Background */}
        <div className="fixed inset-0 z-0 dynamic-bg pointer-events-none" />

        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {/* Hero Header */}
          <Hero info={processedConfig.informacion_restaurante} />
          
          {/* Menu Catalog */}
          <main className="flex-grow w-full">
            <Menu 
              menuData={processedConfig.menu} 
              diseno={processedConfig.diseno} 
            />
          </main>

          {/* Footer Contact Details */}
          <Footer info={processedConfig.informacion_restaurante} />
        </div>

        {/* Floating Order Button */}
        <FloatingOrderButton onClick={() => setOrderOpen(true)} />

        {/* Order Cart Drawer Panel */}
        <OrderPanel 
          isOpen={orderOpen} 
          onClose={() => setOrderOpen(false)} 
          whatsappNumber={processedConfig.informacion_restaurante.whatsapp}
          restaurantName={processedConfig.informacion_restaurante.nombre}
        />
      </div>
    </OrderProvider>
  );
}

export default App;
