var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("api server online");
});


// /a/food
// /a/food/apple
router.get('/food', function(req, res, next) {
    res.send("api server online");
});

router.get('/food/:foodname', async function(req, res, next) {
    const foodname = req.params.foodname;
    // query 요청
    const ret = await db.findByFoodName(foodname);
    console.log(ret);
    res.send("api server online : " + req.params.foodname);
});

module.exports = router;


