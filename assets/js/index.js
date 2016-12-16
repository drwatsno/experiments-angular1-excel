"use strict";

import angular from "angular";
import "whatwg-fetch";
//import "bootstrap";
require("../styles/index.less");

const appExcel = angular.module("appExcel",[]);
appExcel.controller("DocumentController", function () {
    let documents = this;

    documents.items = [];

    documents.getItems = function () {
        return fetch("/docs")
            .then((response) => response.json());
    };

    documents.refreshList = function () {
        documents.getItems().then(function(data) {
            documents.items = data;
            console.log(documents.items);
        });
    };

    documents.refreshList();


});

export default appExcel;