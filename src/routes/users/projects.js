import express from 'express';

import projects from '../../controllers/projects';
import auth from '../../controllers/auth';

const routes  = express.Router({ mergeParams: true });

routes.use(auth.verifyToken);

routes.route('/')
  .get(projects.list)
  .post(projects.create);

routes.route('/:id')
  .get(projects.read)
  .put(projects.update)
  .delete(projects.delete);

module.exports = routes;
