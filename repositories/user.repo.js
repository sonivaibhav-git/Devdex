const User = require('../models/user.model')

const createUser = data => {
  return User.create(data)
}

const findById = id => {
  return User.findById(id)
}

const findByEmail = email => {
  return User.findOne({ email }).select('+password')
}

const findByUsername = username => {
  return User.findOne({ username }).select('-password')
}

const deleteMyId = id => {
  return User.findByIdAndDelete(id)
}

const addSkillsRepository = async (userId, skills) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          skills: {
            $each: skills
          }
        }
      },
      {
       returnDocument: 'after'
      }
    )
}


module.exports = {
  createUser,
  findByEmail,
  findById,
  deleteMyId,
  findByUsername,
  addSkillsRepository
}
