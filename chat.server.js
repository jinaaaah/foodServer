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
                if(d.type === ''){
                    const ret = await db.getChatList();
                    soc.write(JSON.stringify({protocol: 'filter', result: ret.results}));
                }else{
                    const ret = await db.getFilteredChatList(d.type);
                    soc.write(JSON.stringify({protocol: 'filter', result: ret.results}));
                }
                break;

            case 'message':
                // 메세지 브로드 캐스트
                db.insertChat(d.userID, d.type, d.message);
                broadcast(JSON.stringify({protocol: 'message', message: d.message, user: d.userID, type: d.type}));
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
