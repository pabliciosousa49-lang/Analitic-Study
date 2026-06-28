// Service responsavel por validar entradas, gerar analises mockadas e acessar o banco.
// Versão otimizada: Sem dependências de PDF.

import prisma from '../utils/prismaClient.js';
import AppError from '../utils/AppError.js';

function buildMockAnalysis(language, code) {
  const trimmedCode = code.trim();
  const lines = trimmedCode.length === 0 ? 0 : trimmedCode.split(/\r?\n/).length;
  const hasFunction = /function|=>|def |class |public |private |const |let |var /.test(trimmedCode);
  const hasCondition = /\bif\b|\bswitch\b|\belse\b|\?/.test(trimmedCode);
  const hasLoop = /\bfor\b|\bwhile\b|\bmap\b|\bforEach\b/.test(trimmedCode);

  const strengths = [];

  if (hasFunction) {
    strengths.push('boa separacao de responsabilidades em funcoes ou blocos reutilizaveis');
  }

  if (hasCondition) {
    strengths.push('uso de fluxo condicional para tratar cenarios diferentes');
  }

  if (hasLoop) {
    strengths.push('uso de repeticao ou iteracao para processar colecoes');
  }

  if (strengths.length === 0) {
    strengths.push('estrutura simples e facil de acompanhar');
  }

  return {
    summary: `Analise simulada de codigo ${language} com ${lines} linha(s). O codigo apresenta ${strengths[0]}.`,
    explanation: [
      'Esta analise e um mock local, sem chamada para OpenAI ou API paga.',
      `Linguagem informada: ${language}.`,
      `Quantidade aproximada de linhas: ${lines}.`,
      `Pontos positivos identificados: ${strengths.join('; ')}.`,
      'Sugestoes: revise nomes de variaveis, extraia trechos repetidos, adicione comentarios apenas quando ajudarem a explicar regras de negocio e cubra os fluxos principais com testes.'
    ].join('\n')
  };
}

export async function createAnalysis({ language, code }) {
  if (!language || typeof language !== 'string') {
    throw new AppError('O campo language e obrigatorio.', 400);
  }

  if (!code || typeof code !== 'string') {
    throw new AppError('O campo code e obrigatorio.', 400);
  }

  const mockAnalysis = buildMockAnalysis(language.trim(), code);

  return prisma.analysis.create({
    data: {
      language: language.trim(),
      code,
      summary: mockAnalysis.summary,
      explanation: mockAnalysis.explanation
    }
  });
}

export async function listAnalyses() {
  return prisma.analysis.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getAnalysisById(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new AppError('ID de analise invalido.', 400);
  }

  const analysis = await prisma.analysis.findUnique({
    where: {
      id: parsedId
    }
  });

  if (!analysis) {
    throw new AppError('Analise nao encontrada.', 404);
  }

  return analysis;
}