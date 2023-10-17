'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Courses', [{
    id: 1,
    title: 'Curso de bartender profesional',
    description: 'El curso de bartender profesional enseña técnicas de preparación de cócteles, manejo de licores, decoración de bebidas y servicio al cliente para convertirse en un experto en mixología',
    price: 5000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso1.jpg',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 2,
    title: 'Curso de bordado punto cruz profesional',
    description: 'El curso de bordado punto cruz profesional enseña habilidades avanzadas en esta técnica, como diseño, combinación de colores y creación de patrones, permitiendo la creación de obras de arte en tela de forma experta.',
    price: 4000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso2.jpg',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 3,
    title: 'Curso de electricidad basica',
    description: 'El curso de electricidad básica introduce conceptos esenciales de circuitos, voltaje, corriente y seguridad. Aprende a cablear, diagnosticar y solucionar problemas eléctricos en sistemas domésticos y comerciales.',
    price: 6000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso3.jpg',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 4,
    title: 'Curso de cocina saludable',
    description: 'El curso de cocina saludable enseña a preparar alimentos nutritivos y equilibrados, promoviendo opciones culinarias beneficiosas para la salud y el bienestar, con énfasis en ingredientes frescos y técnicas de cocción saludables.',
    price: 6000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso4.jpg',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 5,
    title: 'Seminario de lenceria',
    description: 'curso diseñado para educar sobre lencería, ropa interior, corsetería, y otros tipos de prendas íntimas. Estos seminarios tienen como objetivo  proporcionar información sobre la selección, el uso y el cuidado de la lencería, así como promover la confianza y la autoestima de quienes participan. ',
    price: 6000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso5.jpg',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 6,
    title: 'Curso de uñas soft',
    description: 'El curso de uñas soft ofrece formación en técnicas de manicura y pedicura suave, con énfasis en esmaltado y cuidado de uñas naturales. Aprende a crear uñas hermosas y saludables con un enfoque relajante y estético.',
    price: 7000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso6.jpg',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 7,
    title: 'Curso de uñas soft',
    description: 'El curso de uñas soft ofrece formación en técnicas de manicura y pedicura suave, con énfasis en esmaltado y cuidado de uñas naturales. Aprende a crear uñas hermosas y saludables con un enfoque relajante y estético.',
    price: 7000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso7.jpg',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 8,
    title: 'Taller de costura',
    description: 'El taller de costura te brinda habilidades fundamentales para confeccionar y reparar prendas. Aprende a coser a máquina, hacer arreglos y diseñar ropa personalizada, convirtiéndote en un hábil sastre o modista. Ideal para principiantes y amantes de la moda.',
    price: 7000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso8.jpg',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    id: 9,
    title: 'Branding de marca',
    description: 'El curso de branding de marca enseña a construir y gestionar identidades de marca efectivas. Aprende a definir valores, diseñar logotipos y estrategias de comunicación para crear marcas sólidas y atractivas. Potencia la percepción y el éxito de tu negocio.',
    price: 7000,
    startDate: new Date(),
    endDate: new Date(),
    image: '../resources/assets/uploads/curso9.jpg',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
  ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Courses', null, {});

  }
};
