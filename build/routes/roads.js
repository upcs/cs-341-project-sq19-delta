"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
router.use(bodyParser.json());
/* GET users listing. */
router.post('/', function (req, res, next) {
    var name = 'Willamette';
    console.log(req.originalUrl);
    console.log(req.query.search);
    if (req.query.search !== undefined) {
        name = req.query.search;
    }
    else {
        res.send({ 'status': 200, 'body': 'ok' });
        return;
    }
    var con = mysql.createConnection({
        host: "35.236.96.52",
        user: "student",
        password: "intoPDX411",
        database: "CS341"
    });
    con.connect(function (err) {
        if (err)
            throw err;
        var sql = "SELECT * FROM STREET WHERE STREETNAME = '" + name + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("Road not found");
                return;
            }
            else {
                var roadList_1 = [];
                var obj_1 = [];
                Object.keys(result).forEach(function (key) {
                    var rowObj = {};
                    var row = result[key];
                    Object.keys(row).forEach(function (keyc) {
                        var col = row[keyc];
                        rowObj[keyc] = row[keyc];
                    });
                    if (roadList_1.indexOf(rowObj['FULL_NAME']) == -1) {
                        roadList_1.push(rowObj['FULL_NAME']);
                        obj_1.push(rowObj);
                    }
                });
                res.send(obj_1);
            }
        });
    });
});
module.exports = router;
