import prisma from '../utils/prismaClient.js'; // IMPORTAR DO UTILS
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_super_segura'

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    })

    res.status(201).json({ message: 'Usuário criado com sucesso!' })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
    }

    // Gera o Token JWT válido por 1 dia
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (error) {
    next(error)
  }
}