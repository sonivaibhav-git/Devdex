const z = require("zod");

const searchQuerySchema = z.object({

   q: z
      .string()
      .min(1, "Search query required"),

   page: z
      .coerce
      .number()
      .min(1)
      .default(1),

   limit: z
      .coerce
      .number()
      .min(1)
      .max(20)
      .default(10)
});

module.exports = {
   searchQuerySchema
};