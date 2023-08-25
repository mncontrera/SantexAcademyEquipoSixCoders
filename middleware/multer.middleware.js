const multer = require('multer');
const util = require('util');
const { readFile, getAsByteArray } = require('../helpers/handlerArrayBufer');

const maxSize = 20 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './resources/assets/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
}).single('file');

const uploadFileMiddleware = util.promisify(async (req, res) => {
  try {
    await uploadFile(req, res);

    if (!req.file) {
      throw new Error('No file uploaded.');
    }

    const fileBuffer = await readFile(req.file.path);
    const imageBytes = await getAsByteArray(fileBuffer);

    req.imageBytes = imageBytes;
  } catch (error) {
    throw new Error(`Could not upload the file: ${req.file}. ${error}`);
  }
});
module.exports = uploadFileMiddleware;
