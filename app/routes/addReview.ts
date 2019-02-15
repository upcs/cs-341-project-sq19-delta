"use strict";

import { Request, Response, NextFunction } from "express";
import { Options } from "request";

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

import request from "request";
// create application/json parser
var jsonParser = bodyParser.json();
router.use(bodyParser.json());

let example: any = {
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
router.get("/", function(req: Request, res: Response, next: NextFunction) {
    const db = require("../../db.json");

    const id: string = db["id"];
    let key: string = db["secret-key"];

    if (process.env.SECRETKEY) {
        console.log("using tavis env variable");
        key = process.env.SECRETKEY;
    }

    let options: Options = {
        url: `https://api.jsonbin.io/b/${id}/1`,
        headers: {
            "secret-key": `${key}`
        }
    };
    var info: any;
    request(options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
            info = JSON.parse(body);
            console.log(info);

            console.log("reviews " + JSON.stringify(info.reviews));

            let review = { "street-name": "Van Houten", rating: "4" };
            console.log("review: " + JSON.stringify(review));
            info.reviews.push(review);
            var opt: Options = {
                url: `https://api.jsonbin.io/b/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    "secret-key": `${key}`,
                    versioning: "false"
                },
                body: JSON.stringify(info),
                method: "put"
            };

            request(opt, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    console.log(info);
                    res.send(200);
                } else {
                    console.log(response.statusCode);
                    console.log(response.body);
                    res.render("error");
                }
            });
        }
    });
});

module.exports = router;
