const db = require('../models');

async function create(lessonTitle, description, lessonDateTime, courseId, deleted) {
  const lesson = await db.Lessons.create({
    lessonTitle,
    description,
    lessonDateTime,
    courseId,
    deleted,
  });
  return lesson;
}

async function getLesson(id) {
  const lesson = await db.Lessons.findByPk(id);

  if (!lesson) {
    throw new Error('no encontrada');
  }

  return {
    lesson: {
      id: lesson.id,
      lessonTitle: lesson.title,
      description: lesson.description,
      lessonDateTime: lesson.lessonDateTime,
      courseId: lesson.courseId,
    },
  };
}

async function getAllLessons() {
  const lessons = await db.Lessons.findAll();

  if (!lessons) {
    throw new Error('no encontrado');
  }

  return lessons;
}

async function editLesson(id, lessonTitle, description, lessonDateTime, courseId, deleted) {
  const lesson = await db.Lessons.findByPk(id);

  const updatedFields = {
    lessonTitle,
    description,
    lessonDateTime,
    courseId,
    deleted,
  };
  await lesson.update(updatedFields);
  return lesson;
}

async function deleteLesson(id) {
  const lesson = await db.Lessons.findByPk(id);
  lesson.deleted = 1;

  await lesson.save();
  return lesson;
}

module.exports = {
  create, getLesson, getAllLessons, editLesson, deleteLesson,
};
