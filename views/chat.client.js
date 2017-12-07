const net = require('net');

const client = net.createConnection({port: 8081}, () => {
    "use strict";
    client.write(JSON.stringify({userID: 'asdf', protocol: 'filter', type: '소양인'}));
    setTimeout(() => {
        //client.write(JSON.stringify({userID: 'jijina', protocol: 'message', type: '소양인', message: 'hello!!'}));
    }, 1000)

});


client.on('data', d => {
    "use strict";
    console.log('recieve : ', d.toString());
});
