const {
  CreateProblem,
  FindProblemById,
  FindAllProblem,
  DeleteProblem
} = require('../repositories/problem.repo')
const { countSolutionByProblem,getSolutionByProblem } = require('../repositories/project.repo')

const PostProblem = async data => {
  const { technologies } = data

  const normalizedTechnologies = Array.isArray(technologies)
    ? technologies.map(tech => String(tech).trim()).filter(Boolean)
    : typeof technologies === 'string'
    ? technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean)
    : []

  const createdProblem = await CreateProblem({
    ...data,
    technologies: normalizedTechnologies
  })

  if (!createdProblem) {
    throw new Error('Something went wrong')
  }
  return {
    message: 'Problem Posted Successfully',
    problemId: createdProblem.id
  }
}
const GetAllProblems = async () => {
  const problem = await FindAllProblem()
  if (!problem) {
    return { message: 'No problems to show' }
  }
  return {
    message: 'Problems found successfully',
    problem
  }
}
// from here
const GetProblemById = async (id) => {
  const problem = await FindProblemById(id)
  const SolutionCount  =await countSolutionByProblem(id)
  if (!problem) {
    throw new Error("Problem doesn't exist")
  }
  return {
    message: 'Problem found successfully',
    problem,
    solutions : SolutionCount
  }
}
const GetSolutions = async (ProblemId) => {
  const solution = await getSolutionByProblem(ProblemId)
  if(solution == ""){
    return {message:"No solutions to Display"}
  }
  if (!solution) {
    throw new Error("Problem doesn't exist")
  }
  return {
    message:"Solutions Found Successfully",
    solution
  }
}
//to here


const DelProblem = async id => {
  const prob = await FindProblemById(id);
  if(prob.creator != me){
      throw new Error("You can't delete this problem")
  }
  const problem = await DeleteProblem(id)
  if (!problem) {
    throw new Error('Problem does not exist')
  }
  return {
    message: 'Problem Deleted'
  }
}

module.exports = { PostProblem, DelProblem, GetProblemById, GetAllProblems,GetSolutions}
