import { NODE_ENV } from 'src/constants';
import type { AuthenticationConfig, Config } from './config.interface';

export * from './config.interface';

export default (): Config => ({
  app: {
    nodeEnv: (process.env.NODE_ENV as NODE_ENV) || NODE_ENV.PRODUCTION,
    port: +process.env.APP_PORT || 3000,
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  },
  database: {
    type: process.env.DATABASE_TYPE || 'mysql',
    database: process.env.DATABASE_NAME || 'todo',
    host: process.env.DATABASE_HOST || 'localhost',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    port: +process.env.DATABASE_PORT || 3306,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: +process.env.REDIS_PORT || 6379,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshIn: process.env.JWT_REFRESH_IN || '30d',
    bcryptSaltOrRound: 10,
  },
  authentication: {
    sendConfirmationEmail: Boolean(process.env.AUTH_SEND_CONFIRMATION_EMAIL) || false,
    confirmationUrl: process.env.AUTH_CONFIRMATION_URL || 'http://localhost:3000/confirm',
    confirmationIn: +process.env.AUTH_CONFIRMATION_IN || 24,
    resetPasswordUrl: process.env.AUTH_RESET_PASSWORD_URL || 'http://localhost:3000/reset-password',
    resetPasswordIn: +process.env.AUTH_RESET_PASSWORD_IN || 1,
  },
  mail: {
    provider: process.env.MAIL_PROVIDER || 'ses',
    mailFrom: process.env.MAIL_FROM || '',
    ses: {
      username: process.env.SES_USERNAME || '',
      password: process.env.SES_PASSWORD || '',
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY || '',
    },
  },
  swagger: {
    path: process.env.SWAGGER_PATH || 'api-docs',
    username: process.env.SWAGGER_USERNAME || 'swagger',
    password: process.env.SWAGGER_PASSWORD || 'swagger',
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME || 'admin',
    password: process.env.BASIC_AUTH_PASSWORD || 'admin',
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    verificationServiceSid: process.env.TWILIO_VERIFICATION_SERVICE_SID,
  },
  deepLink: {
    iosAppStoreId: process.env.IOS_APP_STORE_ID,
    iosBundleId: process.env.IOS_BUNDLE_ID,
    androidPackageName: process.env.ANDROID_PACKAGE_NAME,
    androidAppLink: process.env.ANDROID_APP_LINK,
    iosAppLink: process.env.IOS_APP_LINK,
    firebaseDomain: process.env.FIREBASE_DOMAIN,
    androidCertFingerprints: process.env.ANDROID_CERT_FINGERPRINTS,
  },
  line: {
    clientId: process.env.LINE_CLIENT_ID || 'clientId',
    clientSecret: process.env.LINE_CLIENT_SECRET || 'clientSecret',
  },
  rollbar: {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  },
});
