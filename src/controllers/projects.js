import mongoose from 'mongoose';
import response from '../helpers/response';

const Project = mongoose.model('Project');

exports.list = function(req, res) {
  // if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  // const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  // Project.paginate(query, request.getRequestOptions(req), function(err, result) {
  //   if (err) return response.sendNotFound(res);
  //   pagination.setPaginationHeaders(res, result);
  //   res.json(result.docs);
  // });
};

exports.create = function(req, res) {
    const user = req.locals.user;
    if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);

    const project = new Project(req.body);
    project.owner = user;
    project.save(function(err, project) {
      if (err) return response.sendBadRequest(res, err);

      user.items.push(project);
      user.save(function(err, user) {
        if (err) return response.sendBadRequest(res, err);
        response.sendCreated(res, project);
      });
    });
};

exports.read = function(req, res) {
  Project.findById(req.params.id, function(err, project) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(project)) return response.sendForbidden(res);
    res.json(project);
  });
};

exports.update = function(req, res) {
  Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, project) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(project)) return response.sendForbidden(res);
    res.json(project);
  });
};

exports.delete = function(req, res) {
  Project.remove({ _id: req.params.id }, function(err, project) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(project)) return response.sendForbidden(res);
    res.json({ message: 'Project successfully deleted' });
  });
};
