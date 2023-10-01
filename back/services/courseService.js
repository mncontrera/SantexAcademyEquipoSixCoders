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
  if (userRol.rolId === '1') {
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

  const userNames = await db.sequelize.query('select u.name, u.lastname from Users u where u.id = :userId;',
    {
      replacements: { userId: course.userId },
      type: QueryTypes.SELECT,
    });

  const teacher = `${userNames[0].name} ${userNames[0].lastname}`;

  return {
    course: {
      id: course.id,
      title: course.title,
      image: imageBuffer,
      description: course.description,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
      teacher,
    },
    lessons,
  };
}

async function getAllCourses() {
  const courses = await db.Courses.findAll(
    {
      where: {
        deleted: null,
      },
    },
  );

  if (!courses) {
    throw new Error('no encontrado');
  }

  for (let index = 0; index < courses.length; index += 1) {
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
  if (userRol.rolId === '1') {
    throw new Error('No tienes permiso para suscribirte a cursos');
  }
  const course = await db.Courses.findByPk(id);

  if (image) {
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
  } else {
    const updatedFields = {
      title,
      description,
      price,
      startDate,
      endDate,
      lessons,
    };
    await course.update(updatedFields);
  }
  return course;
}

async function deleteCourse(id) {
  const userRol = await validateUserRole(id);
  if (userRol.rolId === '1') {
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

  const course = await db.Courses.findByPk(courseId);

  if (!course) {
    throw new Error('Curso no encontrado');
  }
  const lessons = await db.Lessons.findAll({
    where: { courseId },
  });

  const processedRecords = new Set();

  const enrollment = await db.Enrolled.create({
    userId,
    courseId,
  });

  // eslint-disable-next-line no-plusplus
  for (let j = 0; j < lessons.length; j++) {
    const lesson = lessons[j];
    const recordKey = `${enrollment.id}-${lesson.id}`;

    if (!processedRecords.has(recordKey)) {
      // eslint-disable-next-line no-await-in-loop
      await db.LessonsAttendant.create({
        courseId,
        lessonId: lesson.id,
        userId,
        attended: false,
      });

      processedRecords.add(recordKey);
    }
  }

  return {
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
    },
    enrollmentId: enrollment.id,
  };
}

async function getEnrolledCourses(userId) {
  // const Courses = await db.Course.findAll({
  //   where: {
  //     userId,
  //     deleted: null,
  //   },
  // });
  const Courses = await db.sequelize.query('SELECT c.* FROM Enrolleds JOIN Courses c ON Enrolleds.courseId = c.id JOIN Users u ON Enrolleds.userId = u.id WHERE Enrolleds.userId = :userId;',
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });
  // console.log(JSON.stringify(Courses, null, 2));
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < Courses.length; index++) {
    const element = Courses[index];
    let imageBuffer = null;
    if (element.image) {
      const imagePath = path.join(__dirname, '../resources/assets/uploads', element.image);
      // eslint-disable-next-line no-await-in-loop
      imageBuffer = await fs.readFile(imagePath);
      element.image = imageBuffer;
    }
  }
  return Courses;
}

async function getTeacherCourses(teacherId) {
  const Courses = await db.Courses.findAll({
    where: {
      userId: teacherId,
      deleted: null,
    },
  });

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < Courses.length; index++) {
    const element = Courses[index];
    let imageBuffer = null;
    if (element.image) {
      const imagePath = path.join(__dirname, '../resources/assets/uploads', element.image);
      // eslint-disable-next-line no-await-in-loop
      imageBuffer = await fs.readFile(imagePath);
      element.image = imageBuffer;
    }
  }
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
  getTeacherCourses,
  isSubscribed,
  validateUserRole,
};
