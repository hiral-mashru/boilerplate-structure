setup.services = {}
const { readdirSync } = require('fs')
const fs = require('fs')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

for (let i of fs.readdirSync(__dirname+`/../services/`)){
    var fileName = i.split('.')[0]
    setup.services[fileName] = require(__dirname+`/../services/`+fileName)
}


console.log("services", setup.services)