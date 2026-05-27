const authService = require('../service/auth.service')
const {
  accessTokenOptions,
  refreshTokenOptions
} = require('../utils/cookieOptions')

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All Credentials Required' })
    }
    const user = await authService.register(req.body)
    if (typeof user === 'string') {
      return res.status(400).json({ message: user })
    }
    res.status(201).json({
      message: 'User registered successfully',
      user
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'All Credentials Required' })
    }

    const result = await authService.login(email, password)

    if (typeof result === 'string') {
      const status = result === 'Invalid Credentials' ? 401 : 400
      return res.status(status).json({ message: result })
    }

    const { user, accessToken, refreshToken } = result

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    res
      .cookie('accessToken', accessToken, accessTokenOptions)
      .cookie('refreshToken', refreshToken, refreshTokenOptions)
      .status(200)
      .json({ message: 'Logged in successfully' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', err })
  }
}

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const newAccessToken = await authService.refresh(token)

    res
      .cookie('accessToken', newAccessToken, accessTokenOptions)
      .status(200)
      .json({ message: 'Token refreshed' })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error', err })
  }
}

const logout = (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json({ message: 'Logged out successfully' })
}

module.exports = {
  register,
  login,
  refresh,
  logout
}
