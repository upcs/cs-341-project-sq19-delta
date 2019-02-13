var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;

function searchDatabase(address) {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		let sql = `SELECT * FROM STREET WHERE STREETNAME = '${address}'`;
		con.query(sql, function (err, result) {
			if (err) {
				console.log("Road not found");
			}
			else {
				console.log(`Road: '${result}'`);
			}
		});
	});
}