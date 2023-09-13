const fs = require('fs/promises');
const path = require('path');
const { QueryTypes } = require('sequelize');
const db = require('../models');

async function create(title, description, price, startDate, endDate, image) {
  const course = await db.Course.create({
    title,
    description,
    price,
    startDate,
    endDate,
    image,
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

  return {
    course: {
      id: course.id,
      title: course.title,
      image: imageBuffer,
      description: course.description,
      price: course.price,
      startDate: course.startDate,
      endDate: course.endDate,
    },
  };
}

async function getAllCourses() {
  const courses = await db.Course.findAll();

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

async function editCourse(id, title, description, price, startDate, endDate, image) {
  const course = await db.Course.findByPk(id);

  const updatedFields = {
    title,
    description,
    price,
    startDate,
    endDate,
    image,
  };
  await course.update(updatedFields);
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
  const Courses = await db.sequelize.query('SELECT c.title, c.description FROM Enrolleds JOIN Courses c ON Enrolleds.courseId = c.id JOIN Users u ON Enrolleds.userId = u.id WHERE Enrolleds.userId = :userId;',
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });
  // console.log(JSON.stringify(Courses, null, 2));
  return Courses;
}

module.exports = {
  create, getCourse, getAllCourses, editCourse, deleteCourse, subscribeToCourse, getEnrolledCourses,
};
