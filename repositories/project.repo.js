const Project = require('../models/projects.model')

const CreateProject = data => {
  return Project.create(data)
}

const findProjectById = id => {
  return Project.findById(id)
}

const findProjectByTitle = title => {
  return Project.findOne({ title })
}
const findProject = () => {
  return Project.find()
}
const findProjectByTechnologies = (technologies)=>{
  return Project.find({technologies});
}

const deleteProject = async(id)=>{
    return await Project.findByIdAndDelete(id)
}
const countProjectsByCreator = async (creatorId) => {
    return await Project.countDocuments({
        "creator.id": creatorId
    });
};
const countSolutionByProblem = async (problemId) => {
    return await Project.countDocuments({
        "linkedProblem": problemId
    });
};
const getSolutionByProblem = async (problemId) => {
    return await Project.find({
        "linkedProblem": problemId
    });
};


module.exports = {
  CreateProject,
  findProjectByTitle,
  findProjectById,
  findProject,
  findProjectByTechnologies,
  deleteProject,
  countProjectsByCreator,
  countSolutionByProblem,
  getSolutionByProblem
}
