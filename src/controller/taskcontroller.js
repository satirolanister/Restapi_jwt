const { bodyParser } = require('../lib/bodyParser');
const database= require('../../database.json');



function getTaskHandler(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(database));
    res.end();
}
async function createTaskHandler(req, res) {
    try {
        await bodyParser(req);
        database.push(req.body);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(database));
        res.end();
    } catch (error) {

        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Datos invalidos');
        res.end();
    }
};

async function updateTaskHandler(req, res) {
    try {
        let {url} = req;
        
        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        if(idKey == "id"){
            await bodyParser(req);
            database[idValue -1] = req.body;
            console.log(req.body);
            res.writeHead(200, {"Content-Type":"application/json"});
            res.write(JSON.stringify(database));
            res.end();
        }else{
            res.writeHead(200, {"Content-Type":"text/plain"});
            res.write("invalid request query");
            res.end();
        }
    } catch (error) {
        res.writeHead(400, {"Content-Type":"text/plain"});
        res.write("invalid body data was provided", error.message);
    }
}

async function deleteTaskHandler(req, res){
    try {
        let {url} = req;
        
        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        if(idKey === 'id'){
            database.splice(idValue -1 , 1);
            res.writeHead(200, {"Content-Type":"text/plain"});
            res.write("Delete Successfully");
            res.end();
        }else {
            res.writeHead(200, {"Content-Type":"text/plain"});
            res.write("invalid request query");
            res.end();
        }
    } catch (error) {
        res.writeHead(400, {"Content-Type":"text/plain"});
        res.write("invalid body data was provided", error.message);
    }
}

module.exports= {
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
}