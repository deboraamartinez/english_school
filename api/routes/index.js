const bodyParser = require('body-parser')
const people = require('./peopleRoutes')
const levels = require('./levelsRoutes')
const classes = require('./classesRoutes')

module.exports = app => {
  app.use(
    bodyParser.json(),
    people,
    levels,
    classes)
}
