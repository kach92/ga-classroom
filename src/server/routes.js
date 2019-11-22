module.exports = (app, db) => {

  const classrooms = require('./controllers/classrooms')(db);
  const classes = require('./controllers/classes')(db);

  app.get('/server_classrooms',classrooms.index);
  app.post('/server_classrooms',classrooms.update);
  app.get('/server_classroom/:id', classrooms.show);
  app.get('/server_classes',classes.index);
  app.post('/server_classes',classes.create);
  app.get('/server_class/:id',classes.show);
  app.delete('/server_class/:id',classes.deleteClass);




};
