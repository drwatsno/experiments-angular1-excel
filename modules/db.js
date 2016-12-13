const firebase = require("firebase");
const config = {
    apiKey: "AIzaSyB4pVApRXYJEWGkCayn0uAndq8-fQbJqSQ",
    authDomain: "angular1-excel.firebaseapp.com",
    databaseURL: "https://angular1-excel.firebaseio.com",
    storageBucket: "angular1-excel.appspot.com",
    messagingSenderId: "1087272487347"
};

firebase.initializeApp(config);

module.exports = {
    getSnapshot: function () {
        return new Promise(function (resolve, reject) {
            let ref = firebase.database().ref("documents");
            ref.once("value")
                .then(function(snapshot) {
                    console.log(snapshot.val());
                    resolve(snapshot.val())
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }
};