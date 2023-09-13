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

async function getCourse(req, res, next) {
  const { id } = req.params;
  try {
    const result = await courseService.getCourse(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getAllCourses(req, res, next) {
  try {
    const result = await courseService.getAllCourses();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function editCourse(req, res, next) {
  try {
    await multerMiddleware.uploadFileMiddleware(req, res);

    const { id } = req.params;
    const image = req.file ? req.file.originalname : null;
    const {
      title, description, price, startDate, endDate,
    } = JSON.parse(req.body.data);

    try {
      await courseService.editCourse(id, title, description, price, startDate, endDate, image);
      return res.status(200).json({ message: 'Curso editado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al editar el curso' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;
  try {
    await courseService.deleteCourse(id);
    return res.status(200).json({ message: `El curso ${id} fue eliminado correctamente` });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el curso' });
  }
}

async function subscribeToCourse(req, res, next) {
  try {
    const {
      userId, courseId,
    } = req.body;

    try {
      await courseService.subscribeToCourse(userId, courseId);
      return res.status(200).json({ message: 'Se ha subscripto a curso correctamente.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error en la subscripción al curso.' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

async function getEnrolledCourses(req, res, next) {
  try {
    const { id } = req.params;
    try {
      const result = await courseService.getEnrolledCourses(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error en la peticion de cursos.' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

module.exports = {
  createCourse,
  getCourse,
  getAllCourses,
  editCourse,
  deleteCourse,
  subscribeToCourse,
  getEnrolledCourses,
};
