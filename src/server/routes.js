module.exports = (app, db) => {

  const classrooms = require('./controllers/classrooms')(db);

  app.get('/server_classroom/:id', classrooms.show);
  app.post('/server_classroom/:id', classrooms.update);

};
