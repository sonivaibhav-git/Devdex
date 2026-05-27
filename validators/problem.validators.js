const z =require("zod");

const validateProblemSchema = z.object({
    description: z.string().min(20, "Problem too short"),
    technologies: z.array(z.string().min(2, "Technology cannot be empty"))
})

module.exports = {
    validateProblemSchema
};