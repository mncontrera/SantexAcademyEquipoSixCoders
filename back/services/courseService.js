const fs = require('fs/promises');
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require('../models');

async function validateUserRole(userId) {
  const user = await db.User.findByPk(userId);

  return user;
}

async function create(title, description, price, startDate, endDate, image, userId, lessons) {
  const userRol = await validateUserRole(userId);
  if (userRol.rolId === '2') {
    throw new Error('No tienes permiso para suscribirte a cursos');
  }
  const course = await db.Courses.create({
    title,
    description,
    price,
    startDate,
    endDate,
    image,
    userId,
    lessons,
  });
  return course;
}

async function getCourse(id) {
  const course = await db.Courses.findByPk(id, {
    include: db.Lessons,
  });

  if (!course) {
    throw new Error('no encontrado');
  }

  let imageBuffer = null;
  if (course.image) {
    const imagePath = path.join(__dirname, '../resources/assets/uploads', course.image);
    imageBuffer = await fs.readFile(imagePath);
  }
  const lessons = course.Lessons.map((lesson) => ({
    id: lesson.id,
    lessonTitle: lesson.lessonTitle,
    description: lesson.description,
    lessonDateTime: lesson.lessonDateTime,
    courseId: lesson.courseId,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  }));

  return {
    course: {
      id: course.id,
      title: course.title,
      image: imageBuffer,
      description: course.description,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
      userId: course.userId,
    },
    lessons,
  };
}

async function getAllCourses() {
  const courses = await db.Courses.findAll();

  if (!courses) {
    throw new Error('no encontrado');
  }

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < courses.length; index++) {
    const element = courses[index];
    let imageBuffer = null;
    if (element.image) {
      const imagePath = path.join(__dirname, '../resources/assets/uploads', element.image);
      // eslint-disable-next-line no-await-in-loop
      imageBuffer = await fs.readFile(imagePath);
      element.image = imageBuffer;
    }
  }
  return courses;
}

async function editCourse(id, title, description, price, startDate, endDate, image, lessons) {
  const userRol = await validateUserRole(id);
  if (userRol.rolId === '2') {
    throw new Error('No tienes permiso para suscribirte a cursos');
  }
  const course = await db.Courses.findByPk(id);
  const updatedFields = {
    title,
    description,
    price,
    startDate,
    endDate,
    image,
    lessons,
  };
  await course.update(updatedFields);
  return course;
}

async function deleteCourse(id) {
  const userRol = await validateUserRole(id);
  if (userRol.rolId === '2') {
    throw new Error('No tienes permiso para suscribirte a cursos');
  }
  const course = await db.Courses.findByPk(id);
  course.deleted = 1;

  await course.save();
  return course;
}

async function isSubscribed(userId, courseId) {
  const enrollment = await db.Enrolled.findOne({
    where: {
      userId,
      courseId,
    },
  });

  return !!enrollment;
}

async function subscribeToCourse(userId, courseId) {
  const userRol = await validateUserRole(userId);
  if (userRol.rolId === '2') {
    throw new Error('No tienes permiso para suscribirte a cursos');
  }

  const alreadySubscribed = await isSubscribed(userId, courseId);

  if (alreadySubscribed) {
    throw new Error('Ya estás suscrito a este curso');
  }
  await db.Enrolled.create({
    userId,
    courseId,
  });

  const enrolledUsers = await db.Enrolled.findAll({
    where: { courseId },
    include: { association: 'UserEnrollments' },
  });

  const course = await db.Courses.findByPk(courseId);

  if (!course) {
    throw new Error('Curso no encontrado');
  }
  const lessons = await db.Lessons.findAll({
    where: { courseId },
  });

  const attendanceRecords = await Promise.all(
    enrolledUsers.map(async (enrollment) => {
      const enrolledUserId = enrollment.userId;
      const lessonAttendants = await Promise.all(
        lessons.map(async (lesson) => {
          const lessonAttendant = await db.LessonsAttendant.create({
            courseId,
            lessonId: lesson.id,
            userId: enrolledUserId,
            attended: false,
          });
          return lessonAttendant;
        }),
      );
      return lessonAttendants;
    }),
  );

  return {
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
    },
    attendanceRecords,
  };
}

async function getEnrolledCourses(userId) {
  const Courses = await db.sequelize.query('SELECT c.title, c.description FROM Enrolleds JOIN Courses c ON Enrolleds.courseId = c.id JOIN Users u ON Enrolleds.userId = u.id WHERE Enrolleds.userId = :userId;',
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });
  // console.log(JSON.stringify(Courses, null, 2));
  return Courses;
}

module.exports = {
  create,
  getCourse,
  getAllCourses,
  editCourse,
  deleteCourse,
  subscribeToCourse,
  getEnrolledCourses,
  isSubscribed,
  validateUserRole,
};
