const firebase = require("firebase");

firebase.initializeApp(require("../options").firebase);
firebase.database.enableLogging(true);
let ref = firebase.database().ref("documents");

module.exports = {
    getDocuments: function () {
        return new Promise(function (resolve, reject) {
            ref.once("value")
                .then(function(snapshot) {
                    let val = snapshot.val();
                    resolve(Object.keys(val).map(function(elem){
                        let doc = val[elem];
                        doc.id = elem;
                        return doc
                    }))
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    },
    addDocument: function (filename, path, sum) {
        return new Promise(function (resolve, reject) {
            ref.push({
                name: /(.*).(xlsx|xls)$/g.exec(filename)[1] || "unnamed",
                file: filename,
                path: path,
                sum: sum
            }).then(function () {
                resolve(sum);
            }).catch(function (err) {
                reject(err);
            });
        })
    }
};