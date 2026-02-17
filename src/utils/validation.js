const validator = require('validator')

const validateSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body

  if (!firstName || !lastName) {
    throw new Error("Name is not valid")
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Email is not valid")
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long")
  }

  return true
}

module.exports = validateSignup
