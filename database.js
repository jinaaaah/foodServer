const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0000',
    database: 'mysql'
});

connection.connect();

// function mysqlCallback(err,result,fields){
//     if (err) throw err;
//     console.log('The solution is: ', results[0].solution);
//     callback(results, fields);
// }



exports.findByFoodName = function (foodname) {
    "use strict";
    ////
    return new Promise(function (resolve, reject) {
        connection.query("SELECT Ingredient FROM FOOD WHERE Food_Name='" + foodname + "'", function (error, results, fields) {
            if (error) reject(error);
            else {
                resolve({
                    error: error,
                    results: results,
                    fields: fields,
                });
            }
        });
    });


    // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0].solution);
    //     callback(result, fields);
    // });
};

function createDB() {
    connection.query('CREATE DATABASE foodDB',function (error, results, fields) {
    if(error) throw error;
    console.log(results);
    });
    connection.query('USE foodDB');

    connection.query('CREATE TABLE USER (UserID varchar(10),Password varchar(10),Name varchar(50),' +
        'Birth date,Type char(10),' +
        'PRIMARY KEY (UserID),' +
        'UNIQUE (Name)' +
        ')',function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    connection.query('CREATE TABLE CHAT (ChatID int AUTO_INCREMENT,UserID varchar(10), Type char(10),' +
        'Name varchar(50),Message varchar(200),' +
        'PRIMARY KEY (ChatID),' +
        'FOREIGN KEY (UserID) REFERENCES USER(UserID),' +
        'FOREIGN KEY (Name) REFERENCES USER(Name));',function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.query('CREATE TABLE CONSTITUTION' +
        '(Type char(10), Positive_Ingredient varchar(200),Negative_Ingredient varchar(200),' +
        'PRIMARY KEY ( Type ) )',function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.query('CREATE TABLE FOOD' +
        '(Food_Name varchar(100),Ingredient varchar(200),Category varchar(30),' +
        'PRIMARY KEY ( Food_Name ),UNIQUE ( Ingredient ))',function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.query('CREATE TABLE SEND_CHAT(ChatID int, UserID varchar(10), ChatTime Time,' +
        'FOREIGN KEY (ChatID) REFERENCES CHAT(ChatID),' +
        'FOREIGN KEY (UserID) REFERENCES CHAT(UserID));',function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

function initFoodTable() {

    var data = fs.readFileSync("./json_file/foodData_utf8.json").toString();
    var jsonData = JSON.parse(data);

    for(var i in jsonData){
        connection.query("INSERT INTO FOOD(Food_Name, Ingredient, Category) VALUES ('" + jsonData[i].요리 +"','"+ jsonData[i].재료 + "','"+ jsonData[i].카테고리 +"');"
            , function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });
        console.log(jsonData[i].요리)
    }
}

function initConstitutionTable() {

    var data = fs.readFileSync("./json_file/constitutionData_utf8.json").toString();
    var jsonData = JSON.parse(data);

    for(var i in jsonData){
        connection.query("INSERT INTO CONSTITUTION(Type, Positive_Ingredient, Negative_Ingredient) VALUES ('" + jsonData[i].체질 +"','"+ jsonData[i].좋은재료 + "','"+ jsonData[i].나쁜재료 +"');"
            , function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });
        console.log(jsonData[i].요리)
    }
}

function initUSERTable() {
    var data = fs.readFileSync("./json_file/userData_utf8.json").toString();
    var jsonData = JSON.parse(data);
    for(var i in jsonData){
        connection.query("INSERT INTO USER(UserID, Password, Name, Birth, Type) VALUES ('" + jsonData[i].ID +"','"+ jsonData[i].Password + "','"+ jsonData[i].username + "','"+ jsonData[i].birth + "','"+ jsonData[i].usertype+"');"
            , function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });
        console.log(jsonData[i].요리)
    }
}
exports.join = function(name){
    "use strict";

};
exports.init = function(){
    "use strict";
    createDB();
    initFoodTable();
    initConstitutionTable();
    initUSERTable();
};

// connection.end();