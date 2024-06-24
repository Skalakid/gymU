import { Request, Response } from 'express';
import { prisma } from '../config/db.server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CONST from '../constants/CONST';
import { checkEmailUniqueness } from '../services/user.service';
import { ReturnUser } from '../types/user';

function generateAuthenticationToken(data: string | object | Buffer) {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    return null;
  }
  return jwt.sign(data, accessTokenSecret, { expiresIn: '1h' });
}

function generateRefreshToken(data: string | object | Buffer) {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshTokenSecret) {
    return null;
  }
  return jwt.sign(data, refreshTokenSecret);
}

async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const token = await prisma.refresh_token.findFirst({
    where: {
      token: refreshToken as string,
    },
  });
  if (token === null) {
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken as string,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err || !decoded) {
        return res.sendStatus(403);
      }

      const user = decoded as ReturnUser;
      const accessToken = generateAuthenticationToken({
        user_id: user.user_id,
        email: user.email,
        username: user.username,
      });
      if (!accessToken) {
        return res.status(500).send('Internal server error');
      }

      res.status(200).send({ accessToken });
    },
  );
}

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

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).send('Invalid password');
    }

    const returnUser: ReturnUser = {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    };

    const accessToken = generateAuthenticationToken(returnUser);

    const storedRefreshToken = await prisma.refresh_token.findFirst({
      where: {
        user_id: user.user_id,
      },
    });

    const refreshToken =
      storedRefreshToken?.token || generateRefreshToken(returnUser);
    if (!accessToken || !refreshToken) {
      return res.status(500).send('Internal server error');
    }

    if (!storedRefreshToken?.token) {
      await prisma.refresh_token.create({
        data: {
          user_id: user.user_id,
          token: refreshToken,
        },
      });
    }

    res.status(200).send({ accessToken, refreshToken, ...returnUser });
  } catch (error) {
    res.status(500).send('Internal server error');
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
    const hashedPassword = await bcrypt.hash(
      password,
      CONST.AUTH.SALT_OR_ROUNDS,
    );
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
    res.status(500).send('Internal server error');
  }
}

async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const deletedTokens = await prisma.refresh_token.deleteMany({
      where: {
        token: refreshToken as string,
      },
    });

    if (deletedTokens.count === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

export { login, signup, refreshToken, logout };
