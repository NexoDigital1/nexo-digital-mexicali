import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Chat endpoint with optional Gemini AI integration
app.post('/api/chat', async (req, res) => {
  try {
    const { message, profile, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Check if real Gemini API key is configured
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const { context = 'business' } = req.body;
        
        let systemInstruction = '';

        if (context === 'nexo_platform') {
          systemInstruction = `Eres NEXO BOT, el asesor comercial oficial de inteligencia artificial de NEXO DIGITAL MEXICALI en Mexicali, Baja California.
Eslogan oficial: "CONECTANDO A MEXICALI AL MUNDO".
Misión: Asesorar a empresarios y profesionistas de Mexicali sobre las dos soluciones digitales:
1. NFC MINI APP START:
   - Tarjeta física personalizada de lujo con chip NDEF NTAG y código QR impreso.
   - Comparte datos de contacto con 1 toque al celular sin necesidad de internet (vCard offline) o con enlace a redes sociales.
   - Ideal para directores, profesionistas independientes y asesores de venta.
2. MINI APP COMERCIAL PREMIUM:
   - Experiencia comercial web completa, cero descargas en tiendas de apps (abre en 1 segundo).
   - Catálogo interactivo con fotos, fichas individuales y botón "Pedir por WhatsApp".
   - Asistente virtual para responder preguntas frecuentes y orientar a clientes.
   - Galería multimedia con fotos y videos.
   - Contacto comercial con llamada, WhatsApp, horarios en tiempo real y mapa en Mexicali.
   - Ideal para restaurantes, clínicas dentales, boutiques, talleres y empresas.

Directrices:
- Sé conciso, ejecutivo, cálido y profesional.
- Destaca que ambas soluciones están optimizadas para Android e iOS y son diseñadas en Mexicali.
- Orienta siempre a solicitar una propuesta personalizada por WhatsApp.`;
        } else {
          const catalogSummary = (profile?.products || [])
            .map((p: any) => `- ${p.name} (${p.category}): ${p.description}. Precio: ${p.price || 'Consultar'}`)
            .join('\n');

          const faqsSummary = (profile?.faqs || [])
            .map((f: any) => `Q: ${f.question}\nA: ${f.answer}`)
            .join('\n\n');

          systemInstruction = `Eres el asistente virtual interactivo de ${profile?.businessName || 'NEXO DIGITAL MEXICALI'} en Mexicali, Baja California.
Eslogan: "${profile?.slogan || 'Conectando a Mexicali al Mundo'}".
Giro: ${profile?.industry || 'Comercial'}.
Dirección en Mexicali: ${profile?.address || 'Mexicali, B.C.'}.
Horario: ${profile?.schedule || 'Horario regular'}.
Teléfono: ${profile?.contacts?.phone || ''}.
WhatsApp: ${profile?.contacts?.whatsapp || ''}.

Catálogo disponible:
${catalogSummary}

Preguntas Frecuentes:
${faqsSummary}

Directrices de respuesta:
1. Responde de forma amable, moderna, ejecutiva y concisa (máximo 2 a 3 párrafos cortos).
2. Si el usuario pregunta por un producto o servicio del catálogo, menciónalo con su nombre exacto y descripción.
3. Invita siempre a dar clic en el botón de WhatsApp para atención personalizada o agendar pedidos/citas.
4. Mantén un tono cálido y profesional propio de Mexicali.`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nPregunta del cliente: ${message}` }],
            },
          ],
        });

        const replyText = response.text || 'Con gusto te oriento. ¿En qué podemos ayudarte el día de hoy?';

        return res.json({
          reply: replyText,
          isLiveAi: true,
          model: 'gemini-2.5-flash',
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to rule engine:', geminiError?.message);
        // Fallback gracefully
      }
    }

    // Fallback rule-based response when Gemini API key is not configured
    return res.json({
      reply: null,
      isLiveAi: false,
      message: 'No active AI key configured, using client rule-based knowledge engine',
    });
  } catch (error: any) {
    console.error('API Chat error:', error);
    res.status(500).json({ error: error?.message || 'Error interno' });
  }
});

// Endpoint to inspect AI Status
app.get('/api/ai-status', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10);
  res.json({
    hasGeminiKey: isConfigured,
    model: isConfigured ? 'gemini-2.5-flash' : 'knowledge-engine-local',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`NEXO DIGITAL server running on port ${port}`);
  });
}

startServer();
