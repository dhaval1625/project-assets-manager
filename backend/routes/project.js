const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project');
const isAuth = require('../middlewares/is-auth');

router.get('/all', isAuth, projectController.getProjects);
router.get('/details/:projectId', isAuth, projectController.getProject);
router.post('/add', isAuth, projectController.addProject);
router.delete('/delete', isAuth, projectController.deleteProject);
router.put('/edit', isAuth, projectController.editProject);

module.exports = router;
