const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const validate = require('../middlewares/validator.middleware')
const {
  ProblemCreate,
  FindAllProblems,
  FindOneProblem,
  ProblemDelete,
  GetAllSolutions
} = require('../controller/problem.controller')
const { validateProblemSchema } = require('../validators/problem.validators')
const router = express.Router()

router.post(
  '/create',
  authMiddleware,
  validate(validateProblemSchema),
  ProblemCreate
)
router.get('/all', FindAllProblems)
router.delete('/:id/delete', authMiddleware, ProblemDelete)
router.get('/:id', FindOneProblem)
router.get('/:id/solutions', GetAllSolutions)

module.exports = router
