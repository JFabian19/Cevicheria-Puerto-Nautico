import type { MenuCategory, MenuItem } from '../types';

const SPREADSHEET_ID = '19adQfxWvSixCVNU9EATyz5WvolwK1B_xTMXSNeZTAww';

// Map of dish names to local image paths to use if the spreadsheet does not provide an image URL
const LOCAL_IMAGES: Record<string, string> = {
  "leche de tigre": "/images/leche_de_tigre.png",
  "ceviche clásico": "/images/ceviche_clasico.png",
  "ceviche clasico": "/images/ceviche_clasico.png",
  "pescado frito": "/images/pescado_frito.png",
  "trío marino": "/images/trio_marino.png",
  "trio marino": "/images/trio_marino.png",
  "ronda marina": "/images/ronda_marina.png",
  "chicharrón de pescado + ceviche": "/images/chicharron_ceviche.png",
  "chicharron de pescado + ceviche": "/images/chicharron_ceviche.png",
  "pollo crispy": "/images/pollo_crispy.png"
};

// Simple CSV parser that handles basic quotes and commas
function parseCSV(csvText: string) {
  const lines: string[][] = [];
  const rows = csvText.split(/\r?\n/);
  
  for (let row of rows) {
    if (!row.trim()) continue;
    
    const columns: string[] = [];
    let currentColumn = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        columns.push(currentColumn.trim().replace(/^"|"$/g, ''));
        currentColumn = '';
      } else {
        currentColumn += char;
      }
    }
    columns.push(currentColumn.trim().replace(/^"|"$/g, ''));
    lines.push(columns);
  }
  
  return lines;
}

export async function fetchMenuFromGoogleSheets(): Promise<MenuCategory[]> {
  try {
    const categoriesUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=categorias`;
    const itemsUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=platos`;

    const [categoriesRes, itemsRes] = await Promise.all([
      fetch(categoriesUrl),
      fetch(itemsUrl)
    ]);

    if (!categoriesRes.ok || !itemsRes.ok) {
      throw new Error('Failed to fetch from Google Sheets');
    }

    const categoriesCsv = await categoriesRes.text();
    const itemsCsv = await itemsRes.text();

    const categoriesData = parseCSV(categoriesCsv);
    const itemsData = parseCSV(itemsCsv);

    // Skip headers (assuming Categoria)
    const categoriesList: string[] = [];
    for (let i = 1; i < categoriesData.length; i++) {
      const [name] = categoriesData[i];
      if (name && !categoriesList.includes(name)) {
        categoriesList.push(name);
      }
    }

    // Skip headers (assuming Categoria, Nombre de plato, Descripción, Precio, Imagen URL)
    const itemsByCategory = new Map<string, MenuItem[]>();
    for (let i = 1; i < itemsData.length; i++) {
      const [category, name, description, priceStr, imageUrl] = itemsData[i];
      if (!category || !name) continue;

      const price = parseFloat(priceStr.replace(/[^\d.-]/g, '')) || 0;

      // Determine image URL
      let imagen: string | undefined = undefined;
      if (imageUrl && imageUrl.trim()) {
        imagen = imageUrl.trim();
      } else {
        const normalizedName = name.toLowerCase().trim();
        imagen = LOCAL_IMAGES[normalizedName];
      }

      const item: MenuItem = {
        id: `gs-${i}`,
        nombre: name,
        descripcion: description || '',
        precio: price,
        ...(imagen ? { imagen } : {})
      };

      if (!itemsByCategory.has(category)) {
        itemsByCategory.set(category, []);
      }
      itemsByCategory.get(category)?.push(item);
    }

    // Combine into MenuCategory array
    const result: MenuCategory[] = [];
    
    // We prioritize categories from the categories sheet to maintain order
    for (const catName of categoriesList) {
      const items = itemsByCategory.get(catName) || [];
      result.push({
        categoria: catName,
        items: items
      });
    }

    // Add any categories from items sheet not in categories sheet
    for (const [catName, items] of itemsByCategory.entries()) {
      if (!categoriesList.includes(catName)) {
        result.push({
          categoria: catName,
          items: items
        });
      }
    }

    return result;
  } catch (error) {
    console.error('Error fetching menu from Google Sheets:', error);
    throw error;
  }
}
