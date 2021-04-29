const chalk = require('chalk')

try{

const fs = require('fs')
if(!fs.readdirSync(__dirname+'/../crons/')!==[]){
    for (let i of fs.readdirSync(__dirname+'/../crons/')){
        require(__dirname+'/../crons/'+i)
    }
}


/////////////////////////////////////////////////////////////

var root = __dirname+'/../crons'
setup.crons = {}

var modules = fs.readdirSync(root);
if(modules!==[]){
    for(let i of modules){
        setup.crons[i.split('.')[0]] = require(root+'/'+i)
    }
}

} catch(err){
    console.log(chalk.red('ERROR:')+' Error coming in core/crons.js, Error is: ',err)
}
// if(config.length>0){
//     for(let i of config){
//         var fileName = i.split('.')[0]
//         var file = files.map(i => { return i.split('.')[0] })
//         if(file.includes(fileName) && i.split('.')[1] in require(root+'/'+fileName)){
//             setup.crons[fileName] = require(root+'/'+fileName)
//         } else {
//             console.log(chalk.black.bgYellowBright('WARNING:')+' No cron files are available')
//         }
//     }
// }
