const net = require('net');
const _ = require('lodash');
const port = 8081;

const users = [];
const server = net.createServer((soc) => {
    users.push(soc);
    soc.on('data', d => {
        console.log(d);
        broadcast(d);
    });

    soc.on('close', d => {
        _.reject(users, soc);
        console.log('close user');
    });

    soc.on('error', d => {
        console.log('error user');
    });

    function broadcast(message){
        _.forEach(users, u =>u.write(message));
    }

});


server.listen(port);
console.log(port);
