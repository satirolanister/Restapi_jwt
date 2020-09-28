
function errorToken() {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'No esta autorizado' }));
    res.end();
}

function defaulRoute(){
    res.writeHead(400, {"Content-Type":"text/plain"});
    res.write("Petición no permitida");
    res.end(); 
}


module.exports = {
    errorToken,
    defaulRoute
}