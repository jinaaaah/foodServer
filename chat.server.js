const net = require('net');
const _ = require('lodash');
const port = 8081;

var db = require('./database');
db.useFoodDatabase();

const users = [];
const server = net.createServer((soc) => {
    users.push(soc);

    soc.on('data', async received => {
        const d = JSON.parse(received);
        if (d.protocol === null || d.protocol === undefined) {
            soc.write('wtf');
            return;
        }
        switch (d.protocol) {
            case  'filter':
                /// db 조회
                const ret = await db.getChatList(d.type);
                console.log(ret);
                // 소켓에 써줌
                soc.write(JSON.stringify({protocol: 'filter', result: ret.results}));
                break;

            case 'message':
                // 메세지 브로드 캐스트
                db.insertChat(d.user, d.type, d.message);
                broadcast(JSON.stringify({protocol: 'message', message: d.message, user: d.user}));
                break;
        }

    });

    soc.on('close', d => {
        _.reject(users, soc);
        console.log('close user');
    });

    soc.on('error', d => {
        console.log('error user');
    });

    function broadcast(message) {
        _.forEach(users, u => u.write(message));
    }

});


server.listen(port);

console.log(port);
