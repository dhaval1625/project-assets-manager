const Project = require('../models/project');
const { genError } = require('../utils/helper');

exports.getProjects = async (req, res, next) => {
   try {
      const projects = await Project.find({ userId: req.userId });
      res.status(200).json({
         data: projects,
         status: 1,
         message: 'Projects fetched successfully!',
      });
   } catch (error) {
      next(error);
   }
};

exports.getProject = async (req, res, next) => {
   try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
      if (!project) {
         genError(404, 'Requested assest does not exist!');
      }
      res.status(200).json({
         data: project,
         status: 1,
         message: 'Project details fetched successfully!',
      });
   } catch (error) {
      next(error);
   }
};

exports.addProject = async (req, res, next) => {
   try {
      const { projectTitle, url, figma, github, additionalDetails } = req.body;

      const project = new Project({
         title: projectTitle,
         primaryUrl: url,
         githubRepo: github,
         figma,
         additionalDetails,
         userId: req.userId,
      });
      const resProject = await project.save();
      res.status(200).json({
         status: 1,
         message: 'Project added successfully!',
         data: resProject,
      });
   } catch (error) {
      next(error);
   }
};

exports.editProject = async (req, res, next) => {
   try {
      const { id } = req.query;
      const { projectTitle, url, figma, github, additionalDetails } = req.body;
      const project = await Project.findById(id);
      if (project.userId.toString() !== req.userId) {
         genError(401, 'You are not authorized to edit this asset!');
      }
      project.title = projectTitle;
      project.primaryUrl = url;
      project.figma = figma;
      project.githubRepo = github;
      project.additionalDetails = additionalDetails;

      const resProject = await project.save();
      res.status(200).json({
         status: 1,
         message: 'Project updated successfully!',
         data: resProject,
      });
   } catch (error) {
      next(error);
   }
};

exports.deleteProject = async (req, res, next) => {
   try {
      const projectId = req.query.id;
      const project = await Project.findById(projectId);
      if (project.userId.toString() !== req.userId) {
         genError(401, 'You are not authorized to edit this asset!');
      }

      await Project.findByIdAndDelete(projectId);
      res.status(200).json({
         status: 1,
         message: 'Project deleted successfully!',
         data: 'Project deleted successfully!',
      });
   } catch (error) {
      next(error);
   }
};
