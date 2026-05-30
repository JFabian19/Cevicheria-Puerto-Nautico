export interface InputMenuItem {
  nombre: string;
  descripcion?: string;
  precio: number;
}

export interface MenuItem extends InputMenuItem {
  id: string; // Auto-generated in frontend
}

export interface InputMenuCategory {
  categoria: string;
  items: InputMenuItem[];
}

export interface MenuCategory {
  categoria: string;
  imagen?: string; // Optional if they decide to specify one later
  items: MenuItem[];
}

export interface RestaurantInfo {
  nombre: string;
  descripcion: string;
  telefonos: string[];
  whatsapp: string;
  direccion?: string;
  redes_sociales: {
    facebook: string;
    instagram: string;
    tiktok: string;
    maps: string;
  };
  notas_contacto: string;
}

export interface LayoutDesign {
  estilo_layout: 'minimalista' | 'moderno' | 'rustico' | 'elegante' | 'neon';
  columnas_items: number;
  redondeado: 'none' | 'md' | 'xl' | '3xl' | 'full';
  con_borde: boolean;
  con_sombra: boolean;
}

export interface ColorPalette {
  principal: string;
  secundario: string;
  fondo: string;
  tarjeta_bg: string;
  destacado: string;
}

export interface BackgroundStyle {
  tipo: 'solido' | 'degradado';
  valor: string;
}

export interface FontConfig {
  fuente_cuerpo: string;
  url?: string;
}

export interface TitleFontConfig {
  fuente_titulo: string;
  url?: string;
}

export interface TextColors {
  titulo: string;
  subtitulo: string;
  cuerpo: string;
  precio: string;
}

export interface DynamicMenuJSON {
  informacion_restaurante: RestaurantInfo;
  diseno: LayoutDesign;
  colores: ColorPalette;
  tipo_de_fondo: BackgroundStyle;
  tipografia: FontConfig;
  color_de_letras: TextColors;
  tipografia_de_titulos: TitleFontConfig;
  menu: InputMenuCategory[];
}

// Internal menu data containing fully processed categories with IDs
export interface ProcessedMenuData {
  informacion_restaurante: RestaurantInfo;
  diseno: LayoutDesign;
  colores: ColorPalette;
  tipo_de_fondo: BackgroundStyle;
  tipografia: FontConfig;
  color_de_letras: TextColors;
  tipografia_de_titulos: TitleFontConfig;
  menu: MenuCategory[];
}
