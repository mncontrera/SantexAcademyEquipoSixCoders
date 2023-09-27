const lessonService = require('../services/lessonService');

async function createLesson(req, res, next) {
  try {
    const {
      lessonTitle, description, lessonDateTime, courseId, deleted,
    } = JSON.parse(req.body.data);

    try {
      await lessonService.create(lessonTitle, description, lessonDateTime, courseId, deleted);
      return res.status(200).json({ message: 'Clase creada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear clase' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

async function getLesson(req, res, next) {
  const { id } = req.params;
  try {
    const result = await lessonService.getLesson(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getAllLessons(req, res, next) {
  try {
    const result = await lessonService.getAllLessons();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function editLesson(req, res, next) {
  try {
    const { id } = req.params;
    const {
      lessonTitle, description, lessonDateTime, courseId, deleted,
    } = JSON.parse(req.body.data);

    try {
      await lessonService.editLesson(id, lessonTitle, description,
        lessonDateTime, courseId, deleted);
      return res.status(200).json({ message: 'Clase editada correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al editar la clase' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

async function deleteLesson(req, res) {
  const { id } = req.params;
  try {
    await lessonService.deleteLesson(id);
    return res.status(200).json({ message: `La clase ${id} fue eliminada correctamente` });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la clase' });
  }
}

async function attendedLesson(req, res, next) {
  try {
    const {
      userId, lessonId,
    } = req.body;

    try {
      await lessonService.attendedUser(userId, lessonId);
      return res.status(200).json({ message: 'Asistencia asignada.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al asignar asistencia.' });
    }
  } catch (error) {
    next(error);
    return error;
  }
}

module.exports = {
  createLesson,
  getLesson,
  getAllLessons,
  editLesson,
  deleteLesson,
  attendedLesson,
};
