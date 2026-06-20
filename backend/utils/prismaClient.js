// Centraliza a instancia do Prisma Client para reutilizacao em services.

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
