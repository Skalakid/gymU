import { Request, Response } from 'express';
import { prisma } from '../config/db.server';
import { compare, hash } from 'bcrypt';
import { checkEmailUniqueness } from './userController';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const user = await prisma.app_user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send({
      id: user.user_id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

async function signup(req: Request, res: Response) {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).send('Missing required fields');
  }

  if (!(await checkEmailUniqueness(email))) {
    return res.status(409).send('Email already in use');
  }

  try {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.app_user.create({
      data: {
        email,
        username,
        password_hash: hashedPassword,
      },
    });

    res.status(201).send({
      id: user.user_id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export default { login, signup };
