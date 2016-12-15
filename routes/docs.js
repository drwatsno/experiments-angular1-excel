const express = require("express");
const router = express.Router();
const db = require("../modules/db");
const xlsx2json = require("xlsx2json");
const formidable = require("formidable");

router.get("/", function (req, res, next) {
    db.getDocuments()
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        })
});

router.post("/", function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    console.log("post file");

    form.on("error", function (err) {
        res.status(500).json(err);
    });

    form.on("file", function (name, file) {
        xlsx2json("./" + file.path, {
            dataStartingRow: 2,
            mapping: {
                "col_1": "A"
            }
        })
            .then(function (jsonArray) {
                   return db.addDocument(file.name, file.path, jsonArray[0].reduce(function (prev, cur) {
                            return Number(prev.col_1 || prev) + Number(cur.col_1 || cur);
                        })
                    )
                }
            )
            .then(function (sum) {
                res.json({
                    sum: sum
                });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    form.parse(req);
});
module.exports = router;