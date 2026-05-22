const {
  findById,
  findByEmail,
  deleteMyId,
  addSkillsRepository
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

const addSkillsService = async (userId, skills) => {

    if (!skills) {
        return {
            status: 400,
            message: "Skills required"
        };
    }

    // HANDLE SINGLE STRING
    if (typeof skills === "string") {
        skills = [skills];
    }

    // VALIDATE ARRAY
    if (!Array.isArray(skills)) {
        return {
            status: 400,
            message: "Skills must be array"
        };
    }

    // CLEAN DATA
    const cleanedSkills = skills.map(skill =>
        skill.trim().toLowerCase()
    );
    const updatedProfile = await addSkillsRepository(
        userId,
        cleanedSkills
    );

    if (!updatedProfile) {
        return {
            status: 404,
            message: "Profile not found"
        };
    }

    return {
        status: 200,
        message: "Skills added successfully",
        profile: updatedProfile
    };
};

module.exports = {
    addSkillsService
};

module.exports = { fetchMyProfile, DeleteMyProfile,addSkillsService }
