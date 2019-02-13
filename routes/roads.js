"use strict";
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET users listing. */
router.post('/', async function (req, res, next) {
	let name = 'Willamette';

	let con = mysql.createConnection({
		host: "35.236.96.52",
		user: "student",
		password: "intoPDX411",
		database: "CS341"
	});

	let r = await con.connect(function (err) {
		if (err) throw err;
		let sql = `SELECT * FROM STREET WHERE STREETNAME = '${name}' LIMIT 5`;
		con.query(sql, function (err, result) {
			// if (err) {
			// 	console.log("Road not found");
			// 	return;
			// } else {
				let obj = [];
				Object.keys(result).forEach(function (key) {
					let rowObj = {};
					var row = result[key];
					Object.keys(row).forEach(function (keyc) {
						var col = row[keyc];
						rowObj[keyc] = row[keyc];
					});
					obj.push(rowObj);
				});
				res.send(obj);
			// }
		});
	});
});

module.exports = router;
