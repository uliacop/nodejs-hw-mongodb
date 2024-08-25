import { TMP_UPLOAD_DIR, UPLOAD_AVATAR_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_AVATAR_DIR);
  setupServer();
};

bootstrap();
