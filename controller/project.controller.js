const { createNewProject, getProject 
  // ,getAllProjects
   ,DeleteProjectById} = require('../service/project.service')

const addProject = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'problem', 'solution', 'approach']
    const missingFields = requiredFields.filter(field => !req.body[field])

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields
      })
    }

    const projectData = {
      ...req.body,
      creator: {
        id: req.user.id,
        username: req.user.username
      }
    }
    const response = await createNewProject(projectData)
    return res.status(200).json({
      response
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      err
    })
  }
}

const getOneProject = async (req, res) => {
  try {
    const project = await getProject(req.params.id);
     if(!project){
      return res.status(404).json({message:"Project not found"})
    }
    return res.status(200).json({
      message: project.message,
      project: project.proj
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}
// const allProject = async (req, res) => {
//   try {
//     const project = await getAllProjects(req.params.technology);
//      if(!project){
//       return res.status(404).json({message:"Project not found"})
//     }
//     return res.status(200).json({
//       message: project.message,
//       project: project.proj
//     })
//   } catch (err) {
//     return res.status(500).json({
//       message: 'Internal server error'
//     })
//   }
// }

const delProject = async(req,res)=>{
  try{
    const project = await DeleteProjectById(req.params.id);
    if(!project){
      return res.status(404).json({message:"Project not found"})
    }
    return res.status(200).json({
      project
    })
  }catch(err){
    return res.status(500).json({ message: 'Internal Server Error', err})
  }
}


module.exports = {
  // allProject
  getOneProject,
  addProject,
  delProject
}
