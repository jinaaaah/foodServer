const request = require('request');
// request.post('http://13.230.142.157:8080/a/users/join', {
//     form: {
//         userID: 'jidjfdji',
//         password: '1212',
//         name: '지나ㅁ3esa',
//         birth: '1996-02-07',
//         type: '소음인'
//     }
// }, function (e, r, b) {
//     "use strict";
//     console.log("ㅇㅇ"+b);
//     console.log("ㅇㄹㅇ"+e);
// });

request.post('http://13.230.142.157:8080/a/users/login', {
    form: {
        userID: 'jinaS2',
        password: '123456'
    }
}, function (e, r, b) {
    "use strict";
    console.log(b);
    console.log(e);
    console.log(r);
});

// request.get('')