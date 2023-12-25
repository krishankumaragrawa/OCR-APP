const express = require('express')
const router = express.Router()
const { createCitizen, getCitizen, deleteCitizen } = require('../controllers/citizenController')

router.route('/')
        .post(createCitizen)
        .get(getCitizen)
        .delete(deleteCitizen)

module.exports = router 