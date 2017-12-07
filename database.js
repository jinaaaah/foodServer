const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0000',
    database: 'mysql'
});

connection.connect();
exports.useFoodDatabase = () => {
    connection.query('USE foodDB');
};

function createDB() {
    connection.query('CREATE DATABASE foodDB DEFAULT CHARACTER SET utf8', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    connection.query('USE foodDB');

    connection.query('CREATE TABLE USER (UserID varchar(10),Password varchar(10),Name varchar(50),' +
        'Birth date,Type char(10),' +
        'PRIMARY KEY (UserID),' +
        'UNIQUE (Name)' +
        ')', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
    connection.query('CREATE TABLE CHAT (ChatID int AUTO_INCREMENT,UserID varchar(10)' +
        ', Type char(10), Message varchar(200),' +
        'PRIMARY KEY (ChatID),' +
        'FOREIGN KEY (UserID) REFERENCES USER(UserID));', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.query('CREATE TABLE CONSTITUTION' +
        '(Type char(10), Positive_Ingredient varchar(200),Negative_Ingredient varchar(200),' +
        'PRIMARY KEY ( Type ) )', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.query('CREATE TABLE FOOD' +
        '(Food_Name varchar(100) ,Ingredient varchar(50), Category varchar(30),' +
        'PRIMARY KEY ( Food_Name , Ingredient ))', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });

    connection.query('CREATE TABLE INGREDIENT' +
        '(Constitution varchar(10), Food_name varchar(100),' +
        'PRIMARY KEY ( Constitution ), FOREIGN KEY (Food_name) REFERENCES FOOD(Food_Name))', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    });
}

function initFoodTable() {
    var data = fs.readFileSync("./json_file/foodata.json").toString();
    var jsonData = JSON.parse(data);

    for (var i in jsonData) {
        insertFood(jsonData[i].요리, jsonData[i].재료, jsonData[i].카테고리);
    }
}

function insertFood(foodName, Ingredient, Category) {
    connection.query("INSERT INTO FOOD(Food_Name, Ingredient, Category) VALUES ('" + foodName + "','" + Ingredient + "','" + Category + "');"
        , function (error, results, fields) {
            if (error) throw error;
            console.log(results);
        });
}

function initConstitutionTable() {

    var data = fs.readFileSync("./json_file/constitutionData_utf8.json").toString();
    var jsonData = JSON.parse(data);

    for (var i in jsonData) {
        connection.query("INSERT INTO CONSTITUTION(Type, Positive_Ingredient, Negative_Ingredient) VALUES ('" + jsonData[i].체질 + "','" + jsonData[i].좋은재료 + "','" + jsonData[i].나쁜재료 + "');"
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
    for (var i in jsonData) {
        insertUser(jsonData[i].ID, jsonData[i].Password, jsonData[i].username, jsonData[i].birth, jsonData[i].usertype);
    }
}

exports.init = function () {
    "use strict";
    connection.query('DROP DATABASE foodDB');
    createDB();
    initFoodTable();
    initConstitutionTable();
    initUSERTable();
};


function insertUser(userID, password, name, birth, type) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("INSERT INTO USER(UserID, Password, Name, Birth, Type) VALUES ('" + userID + "','" + password + "','" + name + "','" + birth + "','" + type + "');"
            , function (error, results, fields) {
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

};

exports.insertUser = insertUser;

exports.insertChat = function (userID, type, Message) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("INSERT INTO CHAT(UserID, Type, Message) VALUES('" + userID + "','" + type + "','" + Message + "');", function (error, results, fields) {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {

                resolve({
                    error: error,
                    results: results,
                    fields: fields,
                });
            }
        });
    });
};

exports.login = function (userID, password) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT * FROM USER WHERE USER.UserID ='" + userID + "'AND " + "USER.Password = '" + password + "';"
            , function (error, results, fields) {
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
};

exports.getFoodList = function () {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT Category, Food_Name, group_concat(Ingredient) as Ingredient FROM FOOD group by Food_Name, Category;", function (error, results, fields) {
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
};

exports.getFilteredChatList = function (type) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT * FROM CHAT WHERE CHAT.Type not in ( " + "'" + type + "');", function (error, results, fields) {
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
};

exports.getChatList = function () {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT * FROM CHAT;", function (error, results, fields) {
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
};

exports.getFoodbyFoodName = function (name) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT Category, Food_Name, group_concat(Ingredient) as Ingredient FROM FOOD WHERE FOOD.Food_Name = '" + name + "' group by Food_Name, Category;", function (error, results, fields) {
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
};

exports.getFoodbyIngredient = function (ingredient) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT Category, Food_Name, group_concat(Ingredient) as Ingredient " +
            "FROM FOOD WHERE Food_Name IN" +
            "(SELECT Food_Name FROM FOOD WHERE FOOD.Ingredient = " + "'" + ingredient + "') group by Food_Name, Category;", function (error, results, fields) {
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
};


exports.getFoodListbyCategory = function (category) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT Food_Name, group_concat(Ingredient) as Ingredient FROM FOOD WHERE FOOD.Category = " + "'" + category + "'group by Food_Name;", function (error, results, fields) {
            if (error) reject(error);
            else {
                resolve({
                    error: error,
                    results: results,
                    fields: fields,
                });
            }
        });
    })

};

exports.getConstitutionInfo = function (type) {
    return new Promise((resolve, reject) => {
        "use strict";
        connection.query("SELECT * FROM CONSTITUTION WHERE CONSTITUTION.Type = " + "'" + type + "';", function (error, results, fields) {
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
};


// connection.end();