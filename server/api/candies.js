const router = require('express').Router()
const Candy = require('../db/models/candy')

router.get('/', async (req, res, next) => {
  console.log('I m here!')
  try {
    const result = await Candy.findAll()
    res.json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = router
