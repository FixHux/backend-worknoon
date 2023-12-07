import path from 'path';

import dotenv, { config as dotenv2 } from 'dotenv';
import { IConfig } from './interfaces/iConfig';

const { env } = process;

dotenv.config()

dotenv2({
  path: path.resolve(__dirname, './.env'),
});

export const config: IConfig = {
  JWT: <string>env.JWT_SECRET,
  REFRESH_JWT : <string>env.REFRESH_JWT,
  PORT: parseInt(env.PORT!, 10) || 8000,
  MONGODBURI: <string>env.MONGODBURI,
  FORGOT_PASSWORD :  <string>env.FORGOT_PASSWORD 
};