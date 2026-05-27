const z =require("zod");

const validateProjectSchema  = z.object({
    title: z.string().min(3, "Title too short").max(100, "Title too large").trim(),

    problem: z.string().min(10, "Problem too short"),

    solution: z.string().min(10, "Solution too short"),

    approach: z.string().min(10, "Approach too short"),

    liveLink: z.string().url("Invalid live link").optional(),

    github: z.string().url("Invalid github link").optional(),

    projectType: z.enum(["standalone","problem_solution"]).optional(),
})

module.exports = {validateProjectSchema}