const fs = require('fs/promises');
const path = require('path');
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
  // eslint-disable-next-line no-unused-vars
  const attendants0 = lesson.LessonsAttendants.map((attendant) => ({
    id: attendant.id,
    lessonId: attendant.lessonId,
    userId: attendant.userId,
    attended: attendant.attended,
    // name: user.name,
    // lastname: user.lastname,
  }));

  // eslint-disable-next-line prefer-const
  let attendants = [];
  for (let index = 0; index < lesson.LessonsAttendants.length; index += 1) {
    const element = lesson.LessonsAttendants[index];
    // eslint-disable-next-line no-await-in-loop
    const user = await db.User.findByPk(element.userId);
    let imageBuffer = null;
    if (user.image) {
      const imagePath = path.join(__dirname, '../resources/assets/uploads', user.image);
      // eslint-disable-next-line no-await-in-loop
      imageBuffer = await fs.readFile(imagePath);
    }
    const ele = {
      id: element.id,
      lessonId: element.lessonId,
      userId: element.userId,
      attended: element.attended,
      name: user.name,
      lastname: user.lastname,
      userImage: imageBuffer,
    };
    attendants.push(ele);
  }
  return {
    lesson: {
      id: lesson.id,
      lessonTitle: lesson.lessonTitle,
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

async function attendedUser(userId, lessonId) {
  const user = await db.LessonsAttendant.findOne({ where: { userId, lessonId } });
  user.attended = !user.attended;
  await user.save();
  // return user;
  return {
    lessonId: user.lessonId,
    userId: user.userId,
    attended: user.attended,
  };
}

async function getAsists(userId, courseId) {
  const userAttendant = await db.LessonsAttendant.findOne({ where: { userId, courseId } });
  return userAttendant;
}

module.exports = {
  create, getLesson, getAllLessons, editLesson, deleteLesson, attendedUser, getAsists,
};
