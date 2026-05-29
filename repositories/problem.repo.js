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

const SearchProblemsRepository = async (query, skip, limit) => {
   return await Problem.find({
      $text: {
         $search: query
      }
   })
   .skip(skip)
   .limit(limit)
   .sort({
      score: {
         $meta: "textScore"
      }
   })
   .select({
      score: {
         $meta: "textScore"
      }
   });
};



module.exports = {
  CreateProblem,
  FindProblemById,
  FindAllProblem,
  DeleteProblem,
  SearchProblemsRepository
}