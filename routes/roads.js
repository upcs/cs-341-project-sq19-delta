"use strict";
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json();

router.use(bodyParser.json());

/* GET users listing. */
router.post('/', jsonParser, function (req, res, next) {
	let name = 'Willamette';
	console.log(req.originalUrl);
	console.log(req.query.search);

	if (req.query.search !== undefined) {
		name = req.query.search;
	}

	let con = mysql.createConnection({
		host: "35.236.96.52",
		user: "student",
		password: "intoPDX411",
		database: "CS341"
	});

	con.connect(function (err) {
		if (err) throw err;
		let sql = `SELECT * FROM STREET WHERE STREETNAME = '${name}'`;
		con.query(sql, function (err, result) {
			if (err) {
				console.log("Road not found");
				return;
			} else {
				let roadList = [];
				let obj = [];
				Object.keys(result).forEach(function (key) {
					let rowObj = {};
					var row = result[key];
					Object.keys(row).forEach(function (keyc) {
						var col = row[keyc];
						rowObj[keyc] = row[keyc];
					});
					if (roadList.indexOf(rowObj['FULL_NAME']) == -1) {
						roadList.push(rowObj['FULL_NAME']);
						obj.push(rowObj);
					}
				});
				res.send(obj);
			}
		});
	});
});

module.exports = router;
