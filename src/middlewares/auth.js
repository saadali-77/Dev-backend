const AdminAuth = (req, res, next) => {
  console.log('admin auth getting checked')

  const token = 'xyz'
  const isAuthorized = token === 'xyz'

  if (!isAuthorized) {
    return res.status(401).send('cannot get user')
  }

  next()
}

module.exports = { AdminAuth }
