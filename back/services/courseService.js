const fs = require('fs/promises');
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require('../models');

async function create(title, description, price, startDate, endDate, image, userId, lessons) {
  const course = await db.Course.create({
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
  const course = await db.Course.findByPk(id);

  if (!course) {
    throw new Error('no encontrado');
  }

  let imageBuffer = null;
  if (course.image) {
    const imagePath = path.join(__dirname, '../resources/assets/uploads', course.image);
    imageBuffer = await fs.readFile(imagePath);
  }

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
  };
}

async function getAllCourses() {
  const courses = await db.Course.findAll(
    {
      where: {
        deleted: null,
      },
    },
  );

  // // eslint-disable-next-line no-plusplus
  // for (let index = 0; index < courses.length; index++) {
  //   const element = courses[index];
  // }
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
  const course = await db.Course.findByPk(id);

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
  const course = await db.Course.findByPk(id);
  course.deleted = 1;

  await course.save();
  return course;
}

async function subscribeToCourse(userId, courseId) {
  const subscription = await db.Enrolled.create({
    userId,
    courseId,
  });
  return subscription;
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
  const Courses = await db.Course.findAll({
    where: {
      userId: teacherId,
      deleted: null,
    },
  });
  // const Courses = await db.sequelize.query('select c.title, c.description, c.id, c.image
  // from Courses c WHERE c.userId = :userId;',
  //   {
  //     replacements: { userId: teacherId },
  //     type: QueryTypes.SELECT,
  //   });
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
  // eslint-disable-next-line max-len
  create, getCourse, getAllCourses, editCourse, deleteCourse, subscribeToCourse, getEnrolledCourses, getTeacherCourses,
};
