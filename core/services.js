setup.services = {}
const { readdirSync } = require('fs')
const fs = require('fs')
const chalk = require('chalk')

try{

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

for (let i of fs.readdirSync(__dirname+`/../services/`)){
    var fileName = i.split('.')[0]
    setup.services[fileName] = require(__dirname+`/../services/`+fileName)
}

} catch(err){
    console.log(chalk.red('ERROR:')+' Error coming in core/services.js file. Error is: ',err)
}
