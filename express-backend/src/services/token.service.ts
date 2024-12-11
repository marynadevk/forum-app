import { envConfig } from '../config';
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: string;
  username: string;
  email: string;
}


class TokenService {
  async generateToken(payload: ITokenPayload) {
    const token = jwt.sign(payload, envConfig.jwtSecret, { expiresIn: envConfig.jwtExpire });

    return { access_token: token };
  };
}

export default new TokenService();
