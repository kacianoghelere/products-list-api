const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

module.exports = (app) => {
  const controllerSuffix = '-controller.js'

  const files = fs.readdirSync(__dirname).filter((fileName) => {
    return (fileName.indexOf('.') !== 0)
      && (fileName !== basename)
      && (fileName.includes(controllerSuffix))
  })

  for (const file of files) {
    const { router, path = '' } = require(`./${file}`)

    let routerPath = path || file.replace(controllerSuffix, '')

    app.use(`/${routerPath}`, router)
  }
}