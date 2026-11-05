# NEXO DIGITAL MEXICALI — Experience 2.0
> **«CONECTANDO A MEXICALI AL MUNDO»**

Plataforma comercial interactiva y demostrador de soluciones digitales para pequeños y medianos comercios de **Mexicali, Baja California**. Desarrollada bajo una estética tecnológica inspirada en iOS y Android de nueva generación, combinando acabados en blanco prémium, negro elegante, acentos en rojo metálico, efectos de cristal (*glassmorphism*) y microanimaciones fluidas.

---

## 🚀 Portafolio de Soluciones

### 1. PRODUCTO 01 — NEXO NFC MINI APP START
*«Tu negocio siempre a un toque».*
- **Tarjeta física inteligente personalizada** con logotipo comercial y acabados de lujo.
- **Funcionamiento 100% Offline (NDEF vCard)**: Los datos de contacto se graban directamente en la memoria del chip NTAG216. ¡El cliente puede guardar el contacto en su agenda incluso sin señal de internet!
- **Grabación Web NFC (NDEF Writer)**: Compatible con la API nativa de Google Chrome en Android.
- **Código QR dinámico integrado** para compatibilidad universal con cualquier cámara de smartphone.
- **Simulador 3D interactivo**: Animación de giro de tarjeta a 180° con sonido acústico háptico sintetizado mediante Web Audio API.

### 2. PRODUCTO 02 — MINI APP COMERCIAL PREMIUM
*«Tu negocio, llevado a otra dimensión digital».*
- **Cero descargas en tiendas de apps**: Abre en 0.8 segundos directamente en el navegador móvil sin consumir almacenamiento.
- **Inicio de Impacto**: Portada de alta definición, logotipo, estado de horario en vivo en Mexicali y accesos directos.
- **Catálogo Comercial Vivo**: Categorías dinámicas, buscador en tiempo real, fichas detalladas y botón dinámico *«Pedir por WhatsApp»*.
- **Chatbot Asistente Inteligente (NEXO BOT)**: Asistente virtual conectado a Gemini 2.5 Flash en el backend con motor guiado de reglas locales de respaldo.
- **Galería Multimedia**: Fotografías de alta resolución con visor *lightbox*.
- **Contacto Comercial & Ubicación**: Enlace directo a llamada telefónica, WhatsApp y Google Maps en Mexicali.

### 3. Soluciones por Giro Comercial en Mexicali
Demostraciones pre-cargadas con datos reales de la región:
- 🌮 **Taquerías, Asaderos & Comida Rápida** (*Asadero Los Pioneros - Blvd. Lázaro Cárdenas*).
- 🦷 **Clínicas Dentales & Turismo Médico** (*Dental Vanguardia - Av. Reforma / Garita Centro*).
- ☕ **Cafeterías de Especialidad** (*Bistro Mexicali - Calzada Justo Sierra*).
- 🚗 **Talleres Mecánicos & Clima A/C** (*AutoSpa Cachanilla - Calzada Independencia*).
- ✂️ **Barberías & Salones de Belleza** (*Barber Club - Blvd. Benito Juárez*).
- 👗 **Boutiques & Moda Local** (*Atelier - Plaza San Pedro / Calzada Cetys*).

### 4. Herramientas Comerciales de Alto Impacto
- **Calculadora de Retorno de Inversión (ROI) y Ahorro en Papel**: Demuestra el ahorro anual frente a tarjetas de papel tradicionales (de las cuales el 88% va a la basura) y proyecta ventas adicionales.
- **Generador de Acrílico de Mesa y Mostrador**: Plantilla imprimible en PDF con código QR y zona de toque NFC para restaurantes, bares y recepciones.
- **Panel Administrativo (CMS en Vivo)**: Permite a cualquier negocio personalizar su nombre, logotipo, colores, horarios, productos, FAQs y redes sociales en tiempo real.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Animaciones**: CSS 3D Transforms (`preserve-3d`), Web Audio API Haptics, Canvas Confetti, Motion.
- **Backend**: Node.js + Express (`server.ts`) con Vite Middleware.
- **Inteligencia Artificial**: `@google/genai` (Google Gemini 2.5 Flash) vía proxy server-side seguro.
- **Hardware & Conectividad**: Web NFC API (`NDEFReader`), vCard 3.0 RFC standard, dynamic SVG/Canvas QR Generator.

---

## 📦 Instalación y Ejecución Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/nexo-digital-mexicali.git
   cd nexo-digital-mexicali
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional para IA de Gemini):
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Agrega tu clave de API si deseas activar Gemini 2.5 Flash:
   ```env
   GEMINI_API_KEY="TU_API_KEY_DE_GEMINI"
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5. **Construir para producción**:
   ```bash
   npm run build
   npm start
   ```

---

## 📍 Ubicación y Marca
- **Marca**: NEXO DIGITAL MEXICALI
- **Eslogan**: *CONECTANDO A MEXICALI AL MUNDO*
- **Sede**: Mexicali, Baja California, México.
- **Contacto**: contacto@nexodigital.mx
