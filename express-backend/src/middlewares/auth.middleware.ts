import { envConfig } from '../config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).send('Access denied. No token provided.');
    return;
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    res.locals.user = decoded as { id: string; username: string; };
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).send('Invalid token.');
  }
};

