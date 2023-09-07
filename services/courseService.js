const fs = require('fs/promises');
const path = require('path');
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

module.exports = {
  create, getCourse, getAllCourses, editCourse, deleteCourse,
};
