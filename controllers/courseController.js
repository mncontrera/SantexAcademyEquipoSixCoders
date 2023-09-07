const courseService = require('../services/courseService');
const multerMiddleware = require('../middleware/multer.middleware');

async function createCourse(req, res, next) {
  try {
    await multerMiddleware.uploadFileMiddleware(req, res);

    const image = req.file ? req.file.originalname : null;
    const {
      title, description, price, startDate, endDate,
    } = JSON.parse(req.body.data);

    try {
      await courseService.create(title, description, price, startDate, endDate, image);
      return res.status(200).json({ message: 'Curso creado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear curso' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

module.exports = {
  createCourse,
};
