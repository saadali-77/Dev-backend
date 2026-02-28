const User = require('../models/user')
const jwt = require('jsonwebtoken')

const AdminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
     return res.status(401).send('please login ')
    }

    const decodedToken = jwt.verify(token, 'pnjiiiii')
    const { _id } = decodedToken

    const user = await User.findById(_id)

    if (!user) {
      throw new Error('User not found')
    }

    // Attach user to request (important!)
    
req.user = user
    next()

  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message)
  }
}

module.exports = { AdminAuth }
