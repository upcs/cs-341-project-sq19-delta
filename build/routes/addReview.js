"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var request_1 = __importDefault(require("request"));
// create application/json parser
var jsonParser = bodyParser.json();
router.use(bodyParser.json());
var example = {
    roads: [
        {
            name: "Willamette",
            zip: "97203",
            ratings: [
                {
                    user: "Alex",
                    rating: "5",
                    text: "this road is nice"
                }
            ]
        }
    ]
};
/* GET users listing. */
router.get("/", function (req, res, next) {
    var db = require("../../db.json");
    var id = db["id"];
    var key = db["secret-key"];
    if (process.env.SECRETKEY) {
        console.log("using tavis env variable");
        key = process.env.SECRETKEY;
    }
    var options = {
        url: "https://api.jsonbin.io/b/" + id + "/1",
        headers: {
            "secret-key": "" + key
        }
    };
    var info;
    request_1.default(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            info = JSON.parse(body);
            console.log(info);
            console.log("reviews " + JSON.stringify(info.reviews));
            var review = { "street-name": "Van Houten", rating: "4" };
            console.log("review: " + JSON.stringify(review));
            info.reviews.push(review);
            var opt = {
                url: "https://api.jsonbin.io/b/" + id,
                headers: {
                    "Content-Type": "application/json",
                    "secret-key": "" + key,
                    versioning: "false"
                },
                body: JSON.stringify(info),
                method: "put"
            };
            request_1.default(opt, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    console.log(info);
                    res.send(200);
                }
                else {
                    console.log(response.statusCode);
                    console.log(response.body);
                    res.render("error");
                }
            });
        }
    });
});
module.exports = router;
