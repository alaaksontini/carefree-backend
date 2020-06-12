const express = require('express');
const router = express.Router();

module.exports = (firebase) => {
  // Register
  router.post('/register', (req, res) => {
    const { email, password } = req.body
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      res.status(500).json({
        message: 'OK'
      })
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.json({
        error: {
          errorCode,
          errorMessage
        }
      })
    })
  })

// Login
  router.post('/login', (req, res) => {
    const { email, password } = req.body
    firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      const user = response.user.toJSON()
      res.json({
        ...user.providerData[0],
        ...user.stsTokenManager,
        id: user.uid
      })
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({
        error: {
          errorCode,
          errorMessage
        }
      })
    })
  })
  return router
}