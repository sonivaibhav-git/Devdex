const {
    CreateProject,
    findProjectByTitle,
    findProjectById,
    deleteProject,
    findProject,
    findProjectByTechnologies
} = require("../repositories/project.repo.js");
const { generateSlug } = require("../utils/slug.js");


const createNewProject =async (data)=>{
  const {technologies } = data

  const normalizedTechnologies = Array.isArray(technologies)
    ? technologies.map(tech => String(tech).trim()).filter(Boolean)
    : typeof technologies === 'string'
    ? technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean)
    : []
  
            const project = await findProjectByTitle(data.title);
            if(project){
                return {
                    status:409,
                    message:"This Project already exist"
                }
            }
            data.slug = generateSlug(data.title);
            
            const newProject = await CreateProject({
                ...data,
                technologies: normalizedTechnologies
            })
            if(!newProject){
                return {
                    status:500,
                    message:"Internal Server Error",
                    
                }
            }
            return{
                status:201,
                message:"Post Created",
                projectId: newProject._id
            }
    }

const getProject = async(id)=>{

        const proj = await findProjectById(id);
        if(!proj){
            return{
                status:404,
                message:"Project not found"
            }
        }
        return {
            status:200,
            message:"Project found",
            proj
        }
}
const getAllProjects = async(technologies)=>{
        const proj = await findProjectByTechnologies(technologies);
        if(!proj){
            return{
                message:"Project not found"
            }
        }
        return {
            status:200,
            message:"Project found",
            proj
        }
}

const DeleteProjectById = async (id) => {
    const user = await deleteProject(id)
    if (!user) {
        return { message: "Project not found" }
    }
    return {
      success: true,
      message: 'Project Deleted'
    }
}

const myProjects = async (id)=>{
    const projects = await findProject({
        creator: id
    })
    if(!projects){
        return {
            message: "Projects not exists"
        }
    }
    return{
        message:"Projects found",
        projects
    }
}

module.exports = { createNewProject,getAllProjects, getProject, DeleteProjectById ,myProjects}