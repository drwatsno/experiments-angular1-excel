const express = require("express");
const router = express.Router();
const db = require("../modules/db");

router.get("/", function(req, res, next) {
    db.getSnapshot()
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.json(err);
        })
});

module.exports = router;