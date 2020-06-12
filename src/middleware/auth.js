module.exports = (firebase) => {
  return function (req, res, next) {
    const user = firebase.auth().currentUser
    if (user !== null) {
      req.user = user
      next()
    } else {
      res.status(401).send()
    }
  }
}