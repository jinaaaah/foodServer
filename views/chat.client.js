const net = require('net');

const client = net.createConnection({host:'13.230.142.157',port: 8081}, () => {
    "use strict";
    client.write(JSON.stringify({userID: 'asdf', protocol: 'filter', type: ''}));
    setTimeout(() => {
        client.write(JSON.stringify({userID: 'jijina', protocol: 'message', type: '소음인', message: 'ㅗhhhh'}));
    }, 1000)

});


client.on('data', d => {
    "use strict";
    console.log('recieve : ', d.toString());
});
