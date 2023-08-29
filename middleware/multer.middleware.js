const multer = require('multer');
const util = require('util');

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
  dest: './resources/assets/uploads/',
}).single('file');

const loginUploadFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single('image');

const loginUploadFileMiddleware = util.promisify(loginUploadFile);
const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = { uploadFileMiddleware, loginUploadFileMiddleware };
