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
  const lesson = await db.Lessons.findByPk(id, {
    include: [{ model: db.LessonsAttendant, as: 'LessonsAttendants', separate: true }],
  });

  if (!lesson) {
    throw new Error('Leccion no encontrada');
  }
  const attendants = lesson.LessonsAttendants.map((attendant) => ({
    id: attendant.id,
    lessonId: attendant.lessonId,
    userId: attendant.userId,
    attended: attendant.attended,
  }));
  return {
    lesson: {
      id: lesson.id,
      lessonTitle: lesson.title,
      description: lesson.description,
      lessonDateTime: lesson.lessonDateTime,
      courseId: lesson.courseId,
    },
    attendants,
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

async function attendedUser(userId) {
  const user = await db.LessonsAttendant.findOne({ where: { userId } });
  user.attended = true;
  await user.save();
  return user;
}

module.exports = {
  create, getLesson, getAllLessons, editLesson, deleteLesson, attendedUser,
};
