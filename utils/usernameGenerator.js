const generateUsername = (name = '') => {
  const sanitizedName = typeof name === 'string' ? name : ''
  const base = sanitizedName.trim().toLowerCase().replace(/\s+/g, '') || 'user'
  const random = Math.floor(Math.random() * 1000)
  return `${base}${random}`
}
module.exports = { generateUsername }
