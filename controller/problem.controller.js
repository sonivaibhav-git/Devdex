const {
  PostProblem,
  DelProblem,
  GetProblemById,
  GetAllProblems,
  GetSolutions
} = require('../service/problem.service')

const ProblemCreate = async (req, res) => {
  try {
    const problemData = {
      ...req.body,
      creator: {
        id: req.user.id
      }
    }
    const Problem = await PostProblem(problemData)
    return res.status(200).json({
      Problem
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
      err
    })
  }
}

const ProblemDelete = async (req, res) => {
  try {
    const problem = await DelProblem(req.params.id)
    return res.status(200).json({problem})
  } catch (err) {
    return res.status(500).json({
      message: 'Internal Server Error',
      err
    })
  }
}
const FindOneProblem = async(req,res)=>{
  try{
    const problem = await GetProblemById(req.params.id);
    return res.status(200).json({problem})
  }catch(err){
    return res.status(500).json({
      message: 'Internal Server Error',
      err
    })
  }
}

const FindAllProblems = async(req,res)=>{
  try{
    const problem =await GetAllProblems();
    return res.status(200).json({problem})
  }catch(err){
    return res.status(500).json({
      message: 'Internal Server Error',
      err
    })
  }
}
const GetAllSolutions = async(req,res)=>{
  try{
const solutions = await GetSolutions(req.params.id);
  if(!solutions){
    return res.status(404).json({
      message:"Problem not found"
    })
  }

  return res.status(200).json({solutions})
  }catch(err){
    return res.status(500).json({
          message: 'Internal Server Error',
          err
        })
  }
}

module.exports = {ProblemCreate,FindAllProblems,FindOneProblem,ProblemDelete,GetAllSolutions}