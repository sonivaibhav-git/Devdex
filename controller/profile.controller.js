const {
  fetchMyProfile,
  DeleteMyProfile,
  addTechnologiesService
} = require('../service/profile.service')
const { myProjects } = require('../service/project.service')

const Profile = async (req, res) => {
  try {
    const { id, username } = req.user
    const response = await fetchMyProfile(id)
    if (!response) {
      return res.status(404).json({ message: 'Something went wrong' })
    }
    return res.status(200).json({
      response
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', err })
  }
}

const getMyProjects = async (req, res) => {
  try {
    const { id } = req.user
    const projects = await myProjects(id)
    if (!projects) return { message: "Projects doesn't exist" }
    return res.status(200).json({
      projects
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', err })
  }
}

const DeleteProfile = async (req, res) => {
  try {
    const result = await DeleteMyProfile(req.user.id)
    if (!result.success) {
      return { message: 'Internal Server Error' }
    }
    return res.status(200).json({
      message: result.message
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', err })
  }
}

const addTechnologies = async (req, res) => {
  try {
    const userId = req.user.id
  
    const { technologies } = req.body || {};

    const result = await addTechnologiesService(userId, technologies)

    return res.status(result.status).json(result)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = { Profile, DeleteProfile, getMyProjects, addTechnologies }
