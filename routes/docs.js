const options = require("../options");
const express = require("express");
const router = express.Router();
const db = require("../modules/db");
const xlsx2json = require("xlsx2json");
const multer  = require("multer");
const validateFile = require("../modules/shared/validateFile");
const upload = multer({
    dest: options.uploadPath,
    fileFilter: function (req, file, cb) {
            validateFile(file, function (toUpload, errors) {
                if (toUpload) {
                    cb(null, true);
                } else {
                    cb(new Error(errors))
                }
            });
    },
    limits: {
        files: 1,
        fileSize: options.maxFileSize
    }
});

router.get("/", function (req, res, next) {
    db.getDocuments()
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        })
});

router.post("/", upload.single("table"), function (req, res, next) {
        let file = req.file;
        xlsx2json("./" + file.path, {
            dataStartingRow: 2,
            mapping: {
                "col_1": "A"
            }
        })
        .then(function (jsonArray) {
                return db.addDocument(file.originalname, file.path, jsonArray[0].reduce(function (prev, cur) {
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
module.exports = router;