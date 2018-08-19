const express = require('express')
const router = express.Router({mergeParams: true})

router.route('/customerInfo')
  .get((req, res, next) => {
    res.send(JSON.stringify({"firstname":"A","lastname":"B","dob":'01-01-1990'}))
  })
  .post((req, res, next) => {
    res.send('data saved')
  })

module.exports = router;