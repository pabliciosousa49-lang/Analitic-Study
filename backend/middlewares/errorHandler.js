// Exportação corrigida para o formato ESM
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor.';

  console.error(`🚨 [Erro]: ${message}`);

  return res.status(statusCode).json({
    error: message
  });
};