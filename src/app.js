global.setup = {}
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
fs.mkdirSync(path.join(process.cwd(),'db','migrations'), { recursive: true })
fs.mkdirSync(path.join(process.cwd(),'db','seeders'), { recursive: true })

try{
require('../core/crons')
require('../core/connection').getSequelize()
.then(res=>{
  require('../core/migrations').umzg(res)
  .then(umzug=>{
    require('../core/migrations').umzgg(umzug)
    .then((app)=>{
      require('../config/config').morgn(app)
      require('../config/fileUpload')
      function findErr(err) {
          var array = err.errors
          var key = 'message'
          var arr = []
          for (var i = 0; i < array.length; i++) {
              if (array[i][key]) {
                  arr.push(array[i][key]);
              }
          }
          return arr;
      }
      setup.findErr = findErr

      require('dotenv').config()
      require('../core/functions')
      require('../core/moduleFunctions')
      require('../core/moduleServices')
      require('../core/services')
      const chalk = require('chalk')
      const bodyParser=require('body-parser');
      const cookieParser=require('cookie-parser');
      const routes = require('../core/routes');
      const path = require('path')

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));
      app.use(cookieParser())
      app.use('/docs',require('../core/migrations').express.static(path.join(__dirname,'..','docs')));
      
      try{
          for(let key in routes.public){    
              app[routes.public[key].method](routes.public[key].path, (routes.public[key].middlewares),routes.public[key].globalMiddleware,routes.public[key].action);
          }

          for(let key in routes.protected){
              app[routes.protected[key].method](routes.protected[key].path, routes.protected[key].middlewares, routes.protected[key].globalMiddleware, routes.protected[key].action);
          }
      } catch(err){
          console.log(chalk.red("ERROR: Error coming in routes: ")+err)
      }
      app.use(function(req,res,next){
          const err = new Error("Not found")
          err.status = 404
          next(err)
      })

      app.use(function (err, req, res, next) {
          res.status(err.status || 500)
          console.log(chalk.red('ERROR:')+" Status: "+err.status+", Message: "+err.message)
          var caller_line = err.stack.split("\n")[1];
          var index = caller_line.indexOf("at ");
          var clean = caller_line.slice(index+2, caller_line.length);
          console.log("Error is coming from :",clean)
          res.send({
              error: {
                  status: err.status,
                  message: err.message
              }
          })
      })
    })
  })
})

process.on('uncaughtException', function (err,origin) {
  console.log(chalk.red('ERROR: ')+process.stderr.fd+','+err+`\nException origin: ${origin}`);
  process.exit(1);
});

setTimeout(function () {
  // console.log('This will still run.');
}, 500);

// Intentionally cause an exception, but don't catch it.
//   nonexistentFunc();
//   console.log('This will not run.');

/////////////////////////////////////////////////////////////
// module.exports = app

} catch(err){
    console.log(chalk.red('ERROR: ')+err)
}