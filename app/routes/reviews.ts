"use strict";

import { NextFunction, Request, Response } from "express";
import request, { Options } from "request";

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", async function(req: Request, res: Response, next: NextFunction) {
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

    request(options, function(error: any, response: any, body: any) {
        if (!error && response.statusCode == 200) {
            var info: JSON = JSON.parse(body);
			console.log(info);
			res.json(info);
        }
    });
});

module.exports = router;
