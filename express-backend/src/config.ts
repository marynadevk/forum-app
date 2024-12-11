import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  port: process.env.PORT || 4001,
  dbUrl: process.env.DB_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpire: process.env.JWT_EXPIRE || '3h',
}
