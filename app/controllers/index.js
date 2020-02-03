const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

module.exports = (app) => {
  const files = fs.readdirSync(__dirname).filter((fileName) => {
    return (fileName.indexOf('.') !== 0)
      && (fileName !== basename)
      && (fileName.includes('-controller.js'))
  })

  for (const file of files) {
    require(`./${file}`)(app)
  }
}