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
}).single('file');

const uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
