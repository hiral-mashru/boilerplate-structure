setup.moduleServices = {}
const chalk = require('chalk')

try{

const { readdirSync } = require('fs')
const fs = require('fs')

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const apis = getDirectories(__dirname + '/../api');

for(let key in apis){
    setup.moduleServices[apis[key]] = {}
    if(!fs.readdirSync(__dirname+`/../api/${apis[key]}/services/`)!==[]){
        for (let i of fs.readdirSync(__dirname+`/../api/${apis[key]}/services/`)){
            var fileName = i.split('.')[0]
            setup.moduleServices[apis[key]][fileName] = require(__dirname+`/../api/${apis[key]}/services/`+fileName)
        }
    }
}

} catch(err){
    console.log(chalk.red('ERROR:')+' Error coming in core/moduleServices.js file. Error is: ',err)
}

