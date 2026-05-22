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

const deleteProject = (id)=>{
    return Project.findByIdAndDelete(id)
}
const countProjectsByCreator = async (creatorId) => {
    return await Project.countDocuments({
        "creator.id": creatorId
    });
};


module.exports = {
  CreateProject,
  findProjectByTitle,
  findProjectById,
  findProject,
  findProjectByTechnologies,
  deleteProject,
  countProjectsByCreator
}
