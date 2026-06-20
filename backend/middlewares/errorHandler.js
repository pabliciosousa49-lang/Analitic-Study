// Middleware global de erros para respostas JSON consistentes.

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Erro interno do servidor.'
  });
}

module.exports = errorHandler;
