const {
  findById,
  findByEmail,
  deleteMyId
} = require('../repositories/user.repo')
const { countProjectsByCreator } = require('../repositories/project.repo')


const fetchMyProfile = async userId => {
  const user = await findById(userId)
  if (!user) {
    return "User doesn't exist"
  }
  const projectCount = await countProjectsByCreator(userId)
  return {
    message: 'User found successfully',
    user,
    stats: { projects: projectCount }
  }
}

const DeleteMyProfile = async id => {
  const user = await deleteMyId(id)
  if (!user) {
    return 'User not found'
  }
  return {
    success: true,
    message: 'Profile Deleted'
  }
}

module.exports = { fetchMyProfile, DeleteMyProfile }
