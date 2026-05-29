const Project = require('../models/projects.model')

// COMMON PROJECTION

const SEARCH_PROJECTION = {
  title: 1,
  slug: 1,
  technologies: 1,
  icon: 1,
  projectType: 1,
  linkedProblem: 1,
  createdAt: 1,
  creator: 1,
  score: {
    $meta: 'textScore'
  }
}

// CREATE

const CreateProject = async data => {
  return await Project.create(data)
}

// FIND BY ID

const findProjectById = async id => {

  return await Project.findById(id)
    .lean()
}

// FIND BY TITLE

const findProjectByTitle = async title => {

  return await Project.findOne({title})
  .lean()
}

// GET ALL PROJECTS

const findProject = async (
  skip = 0,
  limit = 10
) => {

  return await Project.find()
    .sort({
      createdAt: -1
    })
    .skip(skip)
    .limit(limit)
    .select('title slug technologies icon creator createdAt')
    .lean()
}

// SEARCH BY TECHNOLOGIES

const findProjectByTechnologies =
async (
  technologies,
  skip = 0,
  limit = 10
) => {
  return await Project.find({
    technologies: {
      $in: technologies
    }

  })
  .sort({
    createdAt: -1
  })
  .skip(skip)
  .limit(limit)
  .select('title slug technologies icon creator')
  .lean()
}

// DELETE PROJECT

const deleteProject = async id => {

  return await Project.findByIdAndDelete(id)
}



// COUNT PROJECTS

const countProjectsByCreator =
async (creatorId,skip,limit) => {

  return await Project.countDocuments({
    'creator.id': creatorId
  }) .skip(skip)
  .limit(limit)
  .select(`title slug technologies creator createdAt`)
  .lean()
}



// COUNT SOLUTIONS

const countSolutionByProblem =
async problemId => {

  return await Project.countDocuments({
    linkedProblem: problemId
  })
}



// GET SOLUTIONS

const getSolutionByProblem =
async (
  problemId,
  skip = 0,
  limit = 10
) => {
  return await Project.find({
    linkedProblem: problemId
  })
  .sort({
    createdAt: -1
  })
  .skip(skip)
  .limit(limit)
  .select(`title slug technologies creator createdAt`)
  .lean()
}



// GLOBAL SEARCH

const SearchProjectsRepository =
async (
  query,
  skip = 0,
  limit = 10
) => {
  return await Project.find({
    $text: {
      $search: query
    }
  })
  .select(SEARCH_PROJECTION)
  .sort({
    score: {
      $meta: 'textScore'
    }
  })
  .skip(skip)
  .limit(limit)
  .lean()
}



module.exports = {
  CreateProject,
  findProjectByTitle,
  findProjectById,
  findProject,
  findProjectByTechnologies,
  deleteProject,
  countProjectsByCreator,
  countSolutionByProblem,
  getSolutionByProblem,
  SearchProjectsRepository
}