import { useEffect } from 'react';
import type { ProcessedMenuData } from '../types';

interface DynamicThemeProps {
  config: ProcessedMenuData;
}

export default function DynamicTheme({ config }: DynamicThemeProps) {
  // Load fonts dynamically
  useEffect(() => {
    const urlsToLoad = [config.tipografia.url, config.tipografia_de_titulos.url].filter(Boolean) as string[];
    const elementsAdded: HTMLLinkElement[] = [];

    urlsToLoad.forEach(url => {
      // Avoid duplicates
      if (document.querySelector(`link[href="${url}"]`)) return;

      // Google Font requires preconnect tags for best performance, but the stylesheet link is enough to load
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
      elementsAdded.push(link);
    });

    return () => {
      // Optional: keep fonts loaded to prevent layout shifts/flickering
    };
  }, [config.tipografia.url, config.tipografia_de_titulos.url]);

  // Apply layout design-specific properties
  const getRadius = (redondeado: string) => {
    switch (redondeado) {
      case 'none': return '0px';
      case 'md': return '0.75rem';
      case 'xl': return '1.25rem';
      case '3xl': return '2rem';
      case 'full': return '9999px';
      default: return '1.25rem';
    }
  };

  const borderStyle = config.diseno.con_borde ? '1px solid rgba(0, 0, 0, 0.08)' : 'none';
  const shadowStyle = config.diseno.con_sombra ? '0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.06)' : 'none';
  const shadowHoverStyle = config.diseno.con_sombra ? '0 20px 25px -5px rgba(0,0,0,0.12), 0 10px 10px -5px rgba(0,0,0,0.08)' : 'none';

  // Build raw CSS injection for variables and global styles
  const cssStyles = `
    :root {
      --color-primary: ${config.colores.principal};
      --color-secondary: ${config.colores.secundario};
      --color-bg: ${config.colores.fondo};
      --color-card-bg: ${config.colores.tarjeta_bg};
      --color-accent: ${config.colores.destacado};

      --font-body: '${config.tipografia.fuente_cuerpo}', sans-serif;
      --font-display: '${config.tipografia_de_titulos.fuente_titulo}', cursive, sans-serif;

      --color-text-title: ${config.color_de_letras.titulo};
      --color-text-subtitle: ${config.color_de_letras.subtitulo};
      --color-text-body: ${config.color_de_letras.cuerpo};
      --color-text-price: ${config.color_de_letras.precio};

      --radius-custom: ${getRadius(config.diseno.redondeado)};
      --custom-border: ${borderStyle};
      --custom-shadow: ${shadowStyle};
      --custom-shadow-hover: ${shadowHoverStyle};
    }

    /* Apply global font variables */
    body {
      font-family: var(--font-body) !important;
      background-color: var(--color-bg) !important;
      color: var(--color-text-body) !important;
    }

    h1, h2, h3, h4, h5, h6, .font-display {
      font-family: var(--font-display) !important;
    }

    /* Set custom backgrounds */
    .dynamic-bg {
      background: ${config.tipo_de_fondo.tipo === 'degradado' ? config.tipo_de_fondo.valor : 'var(--color-bg)'} !important;
      background-attachment: fixed !important;
    }

    /* Layout specific fine tuning */
    .layout-card {
      border: var(--custom-border);
      border-radius: var(--radius-custom);
      box-shadow: var(--custom-shadow);
      background-color: var(--color-card-bg);
      transition: all 0.3s ease;
    }
    
    .layout-card:hover {
      box-shadow: var(--custom-shadow-hover);
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssStyles }} />;
}
