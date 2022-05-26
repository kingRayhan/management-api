import { ConfigService } from '@nestjs/config';
const config = new ConfigService();
import * as JWT from 'jsonwebtoken';
export function generateOTP() {
  const value = Math.floor(1000 + Math.random() * 9000).toString();
  const hashOTP = JWT.sign({ otp: value }, config.get('APP_SECRET'), {
    expiresIn: config.get('OTP_EXPIRATION'),
  });

  return {
    raw_otp: value,
    hash_otp: hashOTP,
  };
}
