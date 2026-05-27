const { ZodError } = require('zod')

const validate = schema => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body)
    next()
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.errors)
      return res.status(400).json({
        message: err.errors,
        errors: err.errors
      })
    }

    next(err)
  }
}

module.exports = validate
