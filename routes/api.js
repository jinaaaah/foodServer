var express = require('express');
var router = express.Router();
var db = require('../database');
db.useFoodDatabase();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("api server online");
});

// /a/food
// /a/food/apple

//음식 전체 리스트 받기
router.get('/data', async function (req, res, next) {
    console.log("here");
    try {
        const ret = await db.getFoodList();
        res.json(ret.results);
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});

//카테고리당 음식 검색
router.get('/data/:category', async function (req, res, next) {
    const category = req.params.category;
    try {
        const ret = await db.getFoodListbyCategory(category);
        res.json(ret.results);
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});

//음식 검색
router.get('/data/food/:foodname', async function (req, res, next) {
    const foodname = req.params.foodname;
    try {
        const ret = await db.getFoodbyFoodName(foodname);
        res.json(ret.results);
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});

//재료로 검색
router.get('/data/ingredient/:ingredient', async function (req, res, next) {
    const ingredient = req.params.ingredient;
    try {
        const ret = await db.getFoodbyIngredient(ingredient);
        res.json(ret.results);
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});

//체질 정보 가져오기
router.get('/constitution/:type', async function (req, res, next) {
    const type = req.params.type;
    try {
        const ret = await db.getConstitutionInfo(type);
        res.json(ret.results);
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});

/* POST Data */

//회원가입
router.post('/join', async function (req, res, next) {
    const data = req.body;
    try {
        const ret = await db.insertUser(data.userID, data.password, data.name, data.birth, data.type);
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});

//로그인
router.post('/login', async function (req, res, next) {
    const data = req.body;
    try {
        const ret = await db.login(data.userID, data.password);
        if(ret.results.length === 0){
            res.status = 200;
            res.send(e);
            console.log(e);
        }
    } catch (e) {
        res.status = 500;
        res.send(e);
        console.log(e);
    }
});



module.exports = router;


