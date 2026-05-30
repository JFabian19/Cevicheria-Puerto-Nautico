import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import type { RestaurantInfo } from '../types';

interface HeroProps {
  info: RestaurantInfo;
}

export default function Hero({ info }: HeroProps) {
  // Social icons list based on what is available
  const hasWhatsApp = !!info.whatsapp;
  const hasPhone = info.telefonos && info.telefonos.length > 0;
  const hasMaps = !!info.redes_sociales?.maps;
  const hasFacebook = !!info.redes_sociales?.facebook;
  const hasInstagram = !!info.redes_sociales?.instagram;
  const hasTikTok = !!info.redes_sociales?.tiktok;

  return (
    <div className="relative w-full min-h-[320px] md:min-h-[400px] flex flex-col items-center justify-center overflow-hidden py-12 px-4">
      {/* Decorative background shapes styled with primary/secondary colors */}
      <div 
        className="absolute inset-0 z-0 opacity-10 transition-all duration-500"
        style={{
          backgroundColor: 'var(--color-primary)',
        }}
      />
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />
      
      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full overflow-hidden leading-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[70px]">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,130.42,190.26,120,240.21,111.36,281.33,70.52,321.39,56.44Z" 
            style={{ fill: 'var(--color-bg)', transition: 'fill 0.5s ease' }}
          ></path>
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
      >
        {/* Dynamic Text Logo (Caleteado, without hardcoded images) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <h1 
            style={{ color: 'var(--color-text-title)' }}
            className="text-5xl md:text-7xl font-display tracking-wide drop-shadow-sm select-none"
          >
            {info.nombre}
          </h1>
          {/* Subtle line separator */}
          <div 
            className="h-1 w-24 mx-auto my-3 rounded-full opacity-60" 
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
        </motion.div>

        {/* Dynamic Slogan/Description */}
        {info.descripcion && (
          <p 
            style={{ color: 'var(--color-text-body)' }}
            className="text-base md:text-lg font-medium tracking-wide mb-6 px-6 leading-relaxed max-w-xl"
          >
            {info.descripcion}
          </p>
        )}

        {/* Address tag if available */}
        {info.direccion && (
          <div 
            style={{ color: 'var(--color-text-subtitle)', borderColor: 'var(--color-primary)' }}
            className="flex items-center gap-1.5 mb-6 text-sm font-medium opacity-80 border-b pb-1"
          >
            <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
            <span>{info.direccion}</span>
          </div>
        )}

        {/* Social and Info Dynamic Section */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {hasWhatsApp && (
            <a 
              href={`https://wa.me/${info.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white p-3 rounded-full text-[#25D366] shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              title="WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
          )}
          
          {hasPhone && (
            <a 
              href={`tel:${info.telefonos[0].replace(/\s+/g, '')}`} 
              className="bg-white p-3 rounded-full text-blue-600 shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              title="Llamar"
            >
              <Phone size={24} style={{ color: 'var(--color-primary)' }} />
            </a>
          )}

          {hasMaps && (
            <a 
              href={info.redes_sociales.maps} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              title="Ubicación en Maps"
            >
              <MapPin size={24} className="text-red-500" />
            </a>
          )}

          {hasFacebook && (
            <a 
              href={info.redes_sociales.facebook} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full text-[#1877F2] shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              title="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
          )}

          {hasInstagram && (
            <a 
              href={info.redes_sociales.instagram} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full text-[#E1306C] shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}

          {hasTikTok && (
            <a 
              href={info.redes_sociales.tiktok} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full text-black shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
              title="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31.03 2.61.1 3.9.22v3.74c-.77-.07-1.54-.1-2.31-.1-.77 0-1.54.07-2.31.2v3.8h4.62c.11 1.25.1 2.5 0 3.75h-4.62v8.6c0 1.23-.74 2.37-1.92 2.8-1.18.43-2.52.12-3.37-.8-.85-.92-1.07-2.3-.53-3.42.54-1.12 1.76-1.8 3-1.72.15 0 .3.02.45.05v-3.8c-.3-.04-.6-.06-.9-.06-1.7 0-3.32.74-4.4 2.05-1.08 1.3-1.4 3.06-.88 4.7.53 1.65 1.94 2.8 3.7 3.03 1.76.22 3.5-.47 4.54-1.85 1.04-1.38 1.23-3.23.5-4.8V.02h2.24z"/>
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
