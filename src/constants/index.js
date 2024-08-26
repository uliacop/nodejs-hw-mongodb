import path from 'node:path';
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
export const TEMPLATE_DIR = path.resolve('src', 'templates');
export const TMP_UPLOAD_DIR = path.resolve('src', 'tmp');
export const UPLOAD_AVATAR_DIR = path.resolve('src', 'uploads', 'avatars');
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve(process.cwd(), 'docs', 'swagger.json');
