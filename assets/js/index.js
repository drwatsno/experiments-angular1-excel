"use strict";

import angular from "angular";
//import "bootstrap";
require("../styles/index.less");

const appExcel = angular.module("appExcel",[]);

appExcel.controller("DocumentController", ["$scope", "$http", function($scope, $http) {

    $scope.items = [];

    $scope.getItems = function () {
        return $http.get("/docs")
            .then((response) => response.data);
    };

    $scope.refreshList = function () {
        $scope.getItems().then(function(data) {
            $scope.items = data;
            console.log($scope.items);
        });
    };

}]);

export default appExcel;