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

module.exports = {
  create,
};
