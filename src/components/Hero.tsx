import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
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
        {/* Logo Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex justify-center"
        >
          <img 
            src="/logo.webp" 
            alt={info.nombre} 
            className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-full shadow-xl border-2 border-white/20 bg-white/10 backdrop-blur-md p-1.5 transition-transform hover:scale-105"
            onError={(e) => {
              if (e.currentTarget.src.endsWith('/logo.webp')) {
                e.currentTarget.src = '/logo.png';
              } else {
                e.currentTarget.style.display = 'none';
              }
            }}
          />
        </motion.div>

        {/* Dynamic Text Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <h1 
            style={{ color: 'var(--color-text-title)' }}
            className="text-4xl md:text-6xl font-display tracking-wide drop-shadow-sm select-none font-bold"
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

        {/* Principal Call-to-Actions (WhatsApp & Call) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4 mb-6">
          {hasWhatsApp && (
            <a 
              href={`https://wa.me/${info.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-3.5 rounded-full shadow-lg shadow-green-500/20 hover:shadow-green-500/35 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-bold text-base"
              title="WhatsApp"
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.03 2C6.5 2 2.02 6.47 2.02 12c0 1.88.52 3.63 1.43 5.14L2 22l5.01-1.3c1.47.8 3.12 1.25 4.88 1.25 5.53 0 10.02-4.47 10.02-10S17.56 2 12.03 2zm0 18.29c-1.63 0-3.23-.44-4.63-1.27l-.33-.2-3.44.9.92-3.32-.22-.35a8.23 8.23 0 0 1-1.26-4.3c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24.01 4.55-3.69 8.25-8.22 8.25zm4.75-5.63c-.26-.13-1.53-.76-1.77-.85-.23-.09-.4-.13-.57.13-.17.25-.66.85-.81 1.02-.15.17-.3.19-.56.06-1.23-.62-2.18-1.5-2.97-2.86-.16-.27-.02-.42.12-.55.12-.12.26-.3.4-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45s-.57-1.37-.78-1.88c-.2-.5-.41-.43-.56-.44l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.29z"/>
              </svg>
              <span>Escríbenos</span>
            </a>
          )}
          
          {hasPhone && (
            <a 
              href={`tel:${info.telefonos[0].replace(/\s+/g, '')}`} 
              style={{ backgroundColor: 'var(--color-primary)' }}
              className="w-full sm:w-auto text-white px-8 py-3.5 rounded-full shadow-lg hover:brightness-110 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-bold text-base border border-white/10"
              title="Llamar"
            >
              <Phone size={20} className="stroke-white fill-none animate-pulse" />
              <span>Llamar ahora</span>
            </a>
          )}
        </div>

        {/* Secondary Social/Info Links */}
        {(hasMaps || hasFacebook || hasInstagram || hasTikTok) && (
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {hasMaps && (
              <a 
                href={info.redes_sociales.maps} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center justify-center border border-gray-100"
                title="Ubicación en Maps"
              >
                <MapPin size={22} className="text-red-500" />
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31.03 2.61.1 3.9.22v3.74c-.77-.07-1.54-.1-2.31-.1-.77 0-1.54.07-2.31.2v3.8h4.62c.11 1.25.1 2.5 0 3.75h-4.62v8.6c0 1.23-.74 2.37-1.92 2.8-1.18.43-2.52.12-3.37-.8-.85-.92-1.07-2.3-.53-3.42.54-1.12 1.76-1.8 3-1.72.15 0 .3.02.45.05v-3.8c-.3-.04-.6-.06-.9-.06-1.7 0-3.32.74-4.4 2.05-1.08 1.3-1.4 3.06-.88 4.7.53 1.65 1.94 2.8 3.7 3.03 1.76.22 3.5-.47 4.54-1.85 1.04-1.38 1.23-3.23.5-4.8V.02h2.24z"/>
                </svg>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
