const { ZodError } = require('zod')

const validate = schema => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body)
    next()
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.errors)
      const formattedErrors = err.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message
      }))
      return res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors
      })
    }

    next(err)
  }
}

module.exports = validate
