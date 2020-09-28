const user = require('../../user');


const { getTaskHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } = require('../controller/taskcontroller');
const { signUp } = require('../controller/authcontroller');
const { validarToken } = require('../middlewares/authtoken');
const { errorToken, defaulRoute } = require('../lib/notification');
const database = require('../../database.json');



function route(method, url, req, res) {
    const valido = validarToken(req, res);
    switch (method) {
        case "GET":
            if (url === "/") {
                if (!valido) {
                    errorToken();
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(database));
                    res.end();
                }
            }
            if (url === '/tasks') {
                if (!valido) {
                    errorToken();
                } else {
                    getTaskHandler(req, res);
                };

            }
            break;
        case "POST":
            if (url === '/tasks') {
                if (!valido) {
                    errorToken();
                } else {
                    createTaskHandler(req, res);
                }

            }
            if (url === '/') {
                signUp(req, res);
            }
            break;
        case "PUT":

            if (!valido) {
                errorToken();
            } else {
                updateTaskHandler(req, res);
            }


            break;
        case "DELETE":

            if (!valido) {
                errorToken();
            } else {
                deleteTaskHandler(req, res);
            }


            break
        default:
            defaulRoute();
    }
}

module.exports = {
    route
}