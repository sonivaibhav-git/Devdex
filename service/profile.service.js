const {
  findById,
  findByEmail,
  deleteMyId,
  addTechnologiesRepository
} = require('../repositories/user.repo')
const { countProjectsByCreator } = require('../repositories/project.repo')


const fetchMyProfile = async userId => {
  const user = await findById(userId)
  if (!user) {
    return {message:"User already exists"}
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

const addTechnologiesService = async (userId, technologies) => {

    if (!technologies) {
        return {
            status: 400,
            message: "technologies required"
        };
    }

    // HANDLE SINGLE STRING
    if (typeof technologies === "string") {
        technologies = [technologies];
    }

    // VALIDATE ARRAY
    if (!Array.isArray(technologies)) {
        return {
            status: 400,
            message: "technologies must be array"
        };
    }

    // CLEAN DATA
    const cleanedTechnologies = technologies.map(technology =>
        technology.trim().toLowerCase()
    );
    const updatedProfile = await addTechnologiesRepository(
        userId,
        cleanedTechnologies
    );

    if (!updatedProfile) {
        return {
            status: 404,
            message: "Profile not found"
        };
    }

    return {
        status: 200,
        message: "Technologies added successfully",
        profile: updatedProfile
    };
};

module.exports = { fetchMyProfile, DeleteMyProfile,addTechnologiesService }
