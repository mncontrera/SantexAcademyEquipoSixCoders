const Express = require('express');
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const { initializeAuthetication } = require('../auth/auth');

initializeAuthetication();
const app = Express();

// Rutas

// use=
app.use('/user', userRoutes);
app.use('/course', courseRoutes);

app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
