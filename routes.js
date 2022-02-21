const express = require("express");
const jwt = require("jsonwebtoken");
const erlimit = require("express-rate-limit");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto-js");

const route = express.Router();
const verify = express.Router();
const sign = express.Router();

const db = require("./config/db");

const limit = erlimit({
    windowMs: 1 * 60 * 1000,
    max: 5
});

route.use(limit);

verify.use(async (req, res, next) => {
    let token = req.headers.authorization;
    
    if (!token) {
        return res.status(400).json({
            error: "asdasd"
        });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        let response = jwt.verify(token, process.env.JWT);
        req.JWT = response;
        next();

    } catch (e) {
        return res.status(401).json({
            error: "qqweqweqw2"
        });
    }

});

sign.use((req, res, next) => {
    let sign = req.body.sign;

    if (!sign || !time) {
        return res.status(401).json({
            error: "asdasdasqq"
        });
    }
    let stamp = crypto.HmacSHA256(security, process.env.SECURITY);

    if (stamp.toString() == sign) {
        next();

    } else {
        return res.status(400).json({
            error: "osidfosdf33"
        });
    }
});

route.post("/me", verify, sign, async (req, res) => {
    let id = req.body.id;

    let data = await db.getUserById(id);

    res.json({
        data: data
    });
});

route.post("/generate", sign, async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let data = await db.getUserByUsername(username);
        
        if (bcryptjs.compareSync(password, data.password)) {
            let payload = {
                check: true,
                security: Math.floor(Math.random() * 100000000000)
            }

            let token = jwt.sign(payload, process.env.JWT, {
                expiresIn: "1h"
            });

            res.json({
                token: token
            });

        } else {
            res.json({
                error: "99999dfd"
            });
        }

    } catch (e) {
        res.status(400).json({
            error: "asdasdas12312"
        });
    }
});

route.post("/create", verify, sign, async (req, res) => {
    let name = req.body.name;
    let gender = req.body.gender;
    let phone = req.body.phone;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let province = req.body.province;
    let city = req.body.city;
    let street = req.body.street;
    let zipcode = req.body.zipcode;

    try {
        password = bcryptjs.hashSync(password, 8);

        let data = [name, gender, phone, email, username, password, province, city, street, zipcode];

        let id = await db.createUser(data);

        res.json({
            data: id
        });

    } catch (e) {
        console.log(e);
    }

});

route.post("/verify", verify, sign, (req, res) => {
    res.json({
        token: "qweqweqwe"
    });
});

module.exports = route;
