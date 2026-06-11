import type { DynamicMenuJSON } from '../types';

export const menuData: DynamicMenuJSON = {
  "informacion_restaurante": {
    "nombre": "Cevichería Puerto Náutico",
    "descripcion": "Bienvenidos a nuestro local Puerto Náutico. Relájese y disfrute de nuestros deliciosos platos marinos.",
    "telefonos": [
      "982048116"
    ],
    "whatsapp": "51982048116",
    "direccion": "Av. Tambopata con Jirón Cusco",
    "redes_sociales": {
      "facebook": "",
      "instagram": "",
      "tiktok": "",
      "maps": ""
    },
    "notas_contacto": "Cortesía: Refresco + Leche de Tigre. Para evitar demoras, agradecemos realizar un solo pedido por mesa. Consultar antes de pagar con billetes de 100 o 200 soles para dar su oportuno vuelto."
  },
  "diseno": {
    "estilo_layout": "moderno",
    "columnas_items": 2,
    "redondeado": "xl",
    "con_borde": true,
    "con_sombra": true
  },
  "colores": {
    "principal": "#0284C7",
    "secundario": "#E11D48",
    "fondo": "#F0F9FF",
    "tarjeta_bg": "#FFFFFF",
    "destacado": "#F59E0B"
  },
  "tipo_de_fondo": {
    "tipo": "degradado",
    "valor": "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)"
  },
  "tipografia": {
    "fuente_cuerpo": "Poppins",
    "url": "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
  },
  "color_de_letras": {
    "titulo": "#0369A1",
    "subtitulo": "#0F172A",
    "cuerpo": "#475569",
    "precio": "#E11D48"
  },
  "tipografia_de_titulos": {
    "fuente_titulo": "Pacifico",
    "url": "https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
  },
  "menu": [
    {
      "categoria": "RECOMENDADOS",
      "items": [
        {
          "nombre": "Leche de Tigre",
          "descripcion": "Fresco concentrado de limón, pescado del día y especias, servido con choclo y camote.",
          "precio": 18,
          "imagen": "/images/leche_de_tigre.png"
        },
        {
          "nombre": "Ceviche Clásico",
          "descripcion": "Cubos de pescado marinado en zumo de limón y ají limo, acompañado de cebolla roja, choclo, camote y yuca cocida.",
          "precio": 20,
          "imagen": "/images/ceviche_clasico.png"
        },
        {
          "nombre": "Pescado Frito",
          "descripcion": "Pescado frito dorado acompañado de su arroz blanco, yuca frita, platanito frito y su ensalada.",
          "precio": 18,
          "imagen": "/images/pescado_frito.png"
        },
        {
          "nombre": "Trío Marino",
          "descripcion": "Combinación perfecta de Ceviche Clásico, Arroz con Mariscos y Chicharrón de Pescado.",
          "precio": 28,
          "imagen": "/images/trio_marino.png"
        },
        {
          "nombre": "Ronda Marina",
          "descripcion": "Un exquisito banquete para compartir: Ceviche, Arroz con Mariscos, Chicharrón de Pescado, Chicharrón de Pota y Leche de Tigre.",
          "precio": 42,
          "imagen": "/images/ronda_marina.png"
        },
        {
          "nombre": "Chicharrón de Pescado + Ceviche",
          "descripcion": "El dúo marino preferido de la casa, combinando ceviche fresco con crocante chicharrón. Viene con yuquitas fritas.",
          "precio": 25,
          "imagen": "/images/chicharron_ceviche.png"
        }
      ]
    },
    {
      "categoria": "CEVICHES",
      "items": [
        {
          "nombre": "Leche de Tigre",
          "descripcion": "",
          "precio": 18
        },
        {
          "nombre": "Ceviche Clásico",
          "descripcion": "",
          "precio": 20
        },
        {
          "nombre": "Ceviche Carretillero",
          "descripcion": "+ Chicharrón de Pescado o Chicharrón de Pota.",
          "precio": 24
        }
      ]
    },
    {
      "categoria": "Frituras & Chicharrón",
      "items": [
        {
          "nombre": "Chicharrón de Pescado o Chicharrón de Pota",
          "descripcion": "Promoción: + S/.5 con Ceviche.",
          "precio": 20
        },
        {
          "nombre": "Pescado Frito",
          "descripcion": "Pescado frito dorado acompañado de su arroz blanco, yuca frita, platanito frito y su ensalada. Promoción: + S/.5 con Ceviche.",
          "precio": 18
        },
        {
          "nombre": "Pollo Crispy",
          "descripcion": "Trozos de pollo súper crocantes, acompañados de papas andinas fritas y cremas.",
          "precio": 16,
          "imagen": "/images/pollo_crispy.png"
        }
      ]
    },
    {
      "categoria": "COMBOS & ARROCES",
      "items": [
        {
          "nombre": "Combo Chiwán",
          "descripcion": "S/. 16 o S/. 20. Porciones: Ceviche + Chicharrón de Pota + Arroz con Guiso de Mariscos.",
          "precio": 16
        },
        {
          "nombre": "Arroz con Mariscos o Chaufa de Mariscos",
          "descripcion": "Promoción: + S/. 5 con Ceviche, Chicharrón de Pescado o Chicharrón de Pota.",
          "precio": 20
        }
      ]
    },
    {
      "categoria": "COMBINADOS",
      "items": [
        {
          "nombre": "Trío Marino",
          "descripcion": "Ceviche + Arroz con Mariscos + Chicharrón de Pescado",
          "precio": 28
        },
        {
          "nombre": "Ronda Marina",
          "descripcion": "Ceviche + Arroz con Mariscos + Chicharrón de Pescado + Chicharrón de Pota + Leche de Tigre",
          "precio": 48
        }
      ]
    },
    {
      "categoria": "PLATOS ESPECIALES",
      "items": [
        {
          "nombre": "KRAKEN",
          "descripcion": "Plato Grande de Ceviche acompañado de Chicharrón de Pescado, Chicharrón de Pota + Leche de Tigre",
          "precio": 48
        },
        {
          "nombre": "Godzilla",
          "descripcion": "Plato Grande: Ceviche, Chicharrón de Pescado, Chicharrón de Pota, Arroz con Mariscos + Leche de Tigre.",
          "precio": 52
        }
      ]
    },
    {
      "categoria": "PORCIONES",
      "items": [
        {
          "nombre": "Arroz",
          "descripcion": "",
          "precio": 4
        },
        {
          "nombre": "Yuca Frita",
          "descripcion": "",
          "precio": 4
        },
        {
          "nombre": "Leche de Tigre",
          "descripcion": "",
          "precio": 10
        },
        {
          "nombre": "Porción de platos",
          "descripcion": "",
          "precio": 10
        }
      ]
    },
    {
      "categoria": "BEBIDAS & POSTRES",
      "items": [
        {
          "nombre": "Vaso de Refresco",
          "descripcion": "",
          "precio": 3
        },
        {
          "nombre": "Jarra de Refresco",
          "descripcion": "",
          "precio": 10
        },
        {
          "nombre": "Agua Mineral (1/2 L)",
          "descripcion": "",
          "precio": 4
        },
        {
          "nombre": "Gaseosa (1/2 L)",
          "descripcion": "",
          "precio": 5
        },
        {
          "nombre": "Gaseosa (2 L)",
          "descripcion": "",
          "precio": 14
        },
        {
          "nombre": "Cerveza Pilsen",
          "descripcion": "",
          "precio": 10
        },
        {
          "nombre": "Helado de Crema en Copa",
          "descripcion": "",
          "precio": 7
        }
      ]
    }
  ]
};
