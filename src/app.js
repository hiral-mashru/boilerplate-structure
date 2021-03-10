global.setup = {}
const bodyParser = require('body-parser')
require('dotenv').config()
// global.framework={};
require('../core/migrations');
require('../core/functions')
require('../core/services')
const routes = require('../core/routes');
const app = require('../core/migrations');
app.use(bodyParser.json())

for(let key in routes.public){
    app[routes.public[key].method](routes.public[key].path, (routes.public[key].middleware),routes.public[key].globalMiddleware,routes.public[key].action);
}

for(let key in routes.protected){
    app[routes.protected[key].method](routes.protected[key].path, routes.protected[key].middleware, routes.protected[key].globalMiddleware, routes.protected[key].action);
}

/////////////////////////////////////////////////////////////

