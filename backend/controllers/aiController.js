import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Função protegida para obter o modelo. 
 * Se a API Key faltar, ela retorna null sem disparar erros que quebrem o servidor.
 */
const getModel = () => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("AVISO: GEMINI_API_KEY não encontrada no .env");
            return null;
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    } catch (err) {
        console.error("Erro ao inicializar o modelo:", err.message);
        return null;
    }
};

export const analyzeCode = async (req, res) => {
    try {
        const model = getModel();
        
        // Se o modelo falhar (por chave ausente ou erro de config), 
        // em vez de travar o servidor, retornamos uma resposta amigável
        if (!model) {
            return res.status(503).json({ 
                error: "IA indisponível no momento. Por favor, tente novamente mais tarde." 
            });
        }

        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "O campo 'code' é obrigatório." });

        // Chamada assíncrona com timeout implícito do SDK
        const result = await model.generateContent(`Analise este código: ${code}`);
        const response = await result.response;
        
        return res.json({ analysis: response.text() });
        
    } catch (error) {
        // Logamos o erro detalhado no backend para você ver no terminal
        console.error("Erro na rota analyzeCode:", error.message);
        
        // Retornamos 500 sem derrubar o processo do servidor
        return res.status(500).json({ error: "Falha ao processar a análise com a IA." });
    }
};

export const generateQuiz = async (req, res) => {
    return res.json({ message: "Funcionalidade de Quiz em desenvolvimento." });
};