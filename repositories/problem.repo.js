const Problem = require('../models/problems.model')

const CreateProblem = async(data) =>{
    return await Problem.create(data) 
}
const FindProblemById = async(id)=>{
    return await Problem.findById(id);
}
const FindAllProblem = async()=>{
    return await Problem.find();
}
const DeleteProblem = async(id)=>{
    return await Problem.findByIdAndDelete(id)
}

module.exports = {
  CreateProblem,
  FindProblemById,
  FindAllProblem,
  DeleteProblem
}