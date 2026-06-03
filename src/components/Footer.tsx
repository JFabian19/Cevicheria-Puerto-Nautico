import { motion } from 'framer-motion';
import { Smartphone, Copy, Check, MapPin, Info } from 'lucide-react';
import { useState } from 'react';
import type { RestaurantInfo } from '../types';

interface FooterProps {
  info: RestaurantInfo;
}

export default function Footer({ info }: FooterProps) {
  const [copied, setCopied] = useState(false);
  const phoneNumber = info.telefonos[0] || "";

  const handleCopy = () => {
    if (!phoneNumber) return;
    navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer 
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }} // Sleek dark charcoal footer
      className="w-full text-slate-200 py-16 px-4 mt-20 relative border-t border-slate-800"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Address Section */}
        {info.direccion && (
          <div className="flex flex-col items-center mb-10 text-center">
            <div 
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} 
              className="p-3 rounded-full mb-3 border border-slate-800"
            >
              <MapPin size={24} style={{ color: 'var(--color-primary)' }} />
            </div>
            <p className="text-base md:text-lg font-medium max-w-md font-body text-slate-300">
              {info.direccion}
            </p>
          </div>
        )}

        {/* Dynamic Contact Notes */}
        {info.notas_contacto && (
          <div className="flex gap-3 max-w-2xl bg-white/5 rounded-2xl p-5 mb-10 border border-white/10 text-left text-sm text-slate-300">
            <Info size={24} className="shrink-0" style={{ color: 'var(--color-primary)' }} />
            <p className="font-body leading-relaxed">
              {info.notas_contacto}
            </p>
          </div>
        )}

        {/* Payment Methods Section (Caleteado - Premium SVG Badges) */}
        <div className="w-full max-w-md bg-white/[0.02] rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Smartphone size={24} style={{ color: 'var(--color-primary)' }} />
            <h3 className="text-xl font-bold uppercase tracking-widest font-body text-slate-200">
              Métodos de Pago
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 select-none">
            {/* Visa Image */}
            <div className="bg-slate-900/60 rounded-2xl p-3.5 flex items-center justify-center h-16 border border-slate-800 hover:border-slate-700/80 transition-all hover:bg-slate-900">
              <img src="/visa.png" alt="Visa" className="h-8 md:h-9 w-auto object-contain" />
            </div>
            {/* Mastercard Image */}
            <div className="bg-slate-900/60 rounded-2xl p-3.5 flex items-center justify-center h-16 border border-slate-800 hover:border-slate-700/80 transition-all hover:bg-slate-900">
              <img src="/mastercard.webp" alt="Mastercard" className="h-9 md:h-10 w-auto object-contain" />
            </div>
            {/* Plin Image */}
            <div className="bg-slate-900/60 rounded-2xl p-3.5 flex items-center justify-center h-16 border border-slate-800 hover:border-slate-700/80 transition-all hover:bg-slate-900">
              <img src="/plin.png" alt="Plin" className="h-7 md:h-8 w-auto object-contain" />
            </div>
            {/* Yape Image */}
            <div className="bg-slate-900/60 rounded-2xl p-3.5 flex items-center justify-center h-16 border border-slate-800 hover:border-slate-700/80 transition-all hover:bg-slate-900">
              <img src="/yape.png" alt="Yape" className="h-8 md:h-9 w-auto object-contain" />
            </div>
          </div>

          {phoneNumber && (
            <>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="w-full text-white py-3.5 rounded-2xl flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90 shadow-md group font-body"
              >
                {copied ? (
                  <Check size={20} className="text-emerald-300" />
                ) : (
                  <Copy size={20} className="group-hover:scale-105 transition-transform" />
                )}
                <span className="text-lg font-bold tracking-wider">
                  {phoneNumber}
                </span>
              </motion.button>
              
              <p className="text-center mt-4 text-xs text-slate-500 font-body">
                Haz clic para copiar el número de transferencias
              </p>
            </>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 w-full text-center text-slate-500 text-xs font-body">
          <p>© {new Date().getFullYear()} {info.nombre}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
