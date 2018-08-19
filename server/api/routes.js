const express = require('express')
const customerRoutes = require('./customers').routes

const router = express.Router({mergeParams: true})
router.use('/customers', customerRoutes)

module.exports = router