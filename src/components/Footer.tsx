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
            {/* Visa SVG */}
            <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-center h-14 border border-slate-800">
              <svg className="h-7 w-auto" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0.5L1.5 8H3.5L2 0.5H0ZM9.5 0.5C8.8 0.5 8.2 0.9 8 1.5L5.5 8H7.5L8 6.5H10.5L11 8H13L11.5 0.5H9.5ZM8.5 5L9.5 2L10.2 5H8.5ZM17 3.5C17.8 3.5 18.2 3.1 18.2 2.5C18.2 1.9 17.8 1.5 17 1.5H14.5L15.2 3.5H17ZM15.5 8H17.5C19 8 20.2 7.2 20.2 5.5C20.2 4.2 19.2 3.8 19.5 3C19.5 2.5 18.8 2.2 18.2 2.2H16L15.5 8ZM4.5 0.5L2.8 8H4.8L6.5 0.5H4.5Z" fill="#1A73E8"/>
              </svg>
            </div>
            {/* Mastercard SVG */}
            <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-center h-14 border border-slate-800">
              <div className="flex items-center gap-1.5">
                <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="9" fill="#EB001B"/>
                  <circle cx="19" cy="9" r="9" fill="#FF5F00" fillOpacity="0.8"/>
                </svg>
                <span className="text-xs font-bold font-body text-slate-400">Card</span>
              </div>
            </div>
            {/* Plin Badge */}
            <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-center h-14 border border-slate-800">
              <span className="text-cyan-400 font-extrabold text-sm tracking-wider uppercase font-body">PLIN</span>
            </div>
            {/* Yape Badge */}
            <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-center h-14 border border-slate-800">
              <span className="text-purple-400 font-extrabold text-sm tracking-wider uppercase font-body">YAPE</span>
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
