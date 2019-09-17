const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/02/27/16/17494470-1666268773668153-4913147535255666688-n.jpg?w968h681'
  }
})
