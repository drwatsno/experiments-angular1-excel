"use strict";

import angular from "angular";
import validateFile from "../../modules/shared/validateFile";
//import "bootstrap";
require("../styles/index.less");

const appExcel = angular.module("appExcel",[]);

appExcel.controller("DocumentController", ["$scope", "$http", function($scope, $http) {
    $scope.items = [];
    $scope.refreshing = false;
    $scope.selectFile = function () {
        var event = new MouseEvent("click", {
            "view": window,
            "bubbles": false,
            "cancelable": true
        });
        var uploadInput = document.createElement("input");
        uploadInput.type = "file";
        uploadInput.id = "temp_input";
        document.body.appendChild(uploadInput);
        uploadInput.addEventListener("change", function () {
            $scope.postFiles(uploadInput.files);
        });
        uploadInput.dispatchEvent(event);
        uploadInput.remove();
    };
    $scope.postFiles = function(files) {
        if (files) {
            validateFile(files[0], function (toUpload, errors) {
                if (toUpload) {
                    var data = new FormData();
                    data.append("table", files[0]);
                    $http({
                        method: 'POST',
                        url: '/docs',
                        headers: {
                            'Content-Type': undefined
                        },
                        data: data
                    }).then(function (response) {
                        $scope.refreshList();
                        // TODO: update only one table row?
                    }, function (err) {
                        // firebase err
                        if (err.data.error) {
                            alert(err.data.error);
                        }
                    });
                } else {
                    // validation err
                    console.log("validation err");
                    alert(errors);
                }

            });
        }
    };
    $scope.getItems = function () {
        return $http.get("/docs")
            .then((response) => response.data);
    };

    $scope.refreshList = function () {
        $scope.refreshing = true;
        $scope.getItems().then(function(data) {
            $scope.items = data;
            $scope.refreshing = false;
        },function (err) {
            console.log(err);
            $scope.refreshing = false;
        });
    };

    $scope.refreshList();
}]);

export default appExcel;