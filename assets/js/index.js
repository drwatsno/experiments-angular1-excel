"use strict";

import angular from "angular";
import fetch from "whatwg-fetch";

require("../styles/index.less");

const appExcel = angular.module("appExcel",[]);

appExcel.controller("DocumentController", function () {
    let documents = this;

    documents.items = [];
    
    documents.getItems = function () {
        fetch("/docs")
            .then((response) => response.json())
            .then(function(data) {
                documents.items = data;
            });
    }
});

export default appExcel;