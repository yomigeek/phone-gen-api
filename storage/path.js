import dotenv from 'dotenv';

dotenv.config();

let storageFilePath;

if (process.env.NODE_ENV == 'test') {
  storageFilePath = `./storage/${process.env.TEST_FILE_NAME}`;
}
else  {
   storageFilePath = `./storage/${process.env.FILE_NAME}`;
}

export default storageFilePath;
