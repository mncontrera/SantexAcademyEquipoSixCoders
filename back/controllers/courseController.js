const courseService = require('../services/courseService');
const multerMiddleware = require('../middleware/multer.middleware');

async function createCourse(req, res, next) {
  try {
    await multerMiddleware.uploadFileMiddleware(req, res);

    const image = req.file ? req.file.originalname : null;
    const {
      title, description, price, startDate, endDate, userId, lessons,
    } = JSON.parse(req.body.data);

    try {
      await courseService.create(title, description, price, startDate, endDate, image, userId,
        lessons);
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
    return res.status(200).json(result);
  } catch (error) {
    next(error);
    return (error);
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
    const isUserRoleValid = await courseService.validateUserRole(userId, '2');

    if (!isUserRoleValid) {
      return res.status(403).json({ error: 'No tienes permiso para suscribirte a cursos' });
    }
    const isSubscribed = await courseService.isSubscribed(userId, courseId);

    if (isSubscribed) {
      return res.status(400).json({ error: 'Ya estás suscrito a este curso' });
    }
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

async function getEnrolledUsers(req, res, next) {
  try {
    const { id } = req.params;
    try {
      const result = await courseService.getEnrolledUsers(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error en la peticion de inscriptos' });
    }
  } catch (error) {
    next(error);
    return (error);
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

async function getTeacherCourses(req, res, next) {
  try {
    const { id } = req.params;
    try {
      const result = await courseService.getTeacherCourses(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error en la peticion de cursos.' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

async function paidRegistration(req, res, next) {
  try {
    const {
      userId, courseId,
    } = req.body;

    try {
      const result = await courseService.paidRegistration(userId, courseId);
      // return res.status(200).json({ message: 'Pago de matricula asignado.' });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error al asignar pago de la matricula.' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

async function getAllPaidRegitrationUsers(req, res, next) {
  const { courseId, paid } = req.body;
  try {
    const result = await courseService.getAllPaidRegitrationUsers(courseId, paid);
    res.status(200).json(result);
  } catch (error) {
    next(error);
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
  getTeacherCourses,
  paidRegistration,
  getAllPaidRegitrationUsers,
  getEnrolledUsers,
};
