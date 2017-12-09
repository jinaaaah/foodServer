const request = require('request');
request.post('http://13.230.142.157:8080/a/join', {
    form: {
        userID: 'jiddjina',
        password: '1212',
        name: '지나a',
        birth: '1996-02-07',
        type: '소음인'
    }
}, function (e, r, b) {
    "use strict";
    console.log(b);
    console.log(e);
});

// request.post('http://127.0.0.1:8080/a/login', {
//     form: {
//         userID: 'jiddjina',
//         password: '1'
//     }
// }, function (e, r, b) {
//     "use strict";
//     console.log(b);
// });

// request.get('')