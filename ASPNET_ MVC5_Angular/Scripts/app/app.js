// Main configuration file. Sets up AngularJS module and routes and any other config objects

var appRoot = angular.module("main", ["ngRoute", "ngGrid", "ngResource"]); //Define the main module

appRoot.config([
        "$routeProvider", function ($routeProvider) {
            //Setup routes to load partial templates from server. TemplateUrl is the location for the server view (Razor .cshtml view)
            $routeProvider
                .when("/index", { templateUrl: "/home/index", controller: "TodoWebappController" })
                .when("/home/index", { templateUrl: "/home/index", controller: "TodoWebappController" })
                .when("/webapp", { templateUrl: "home/main", controller: "TodoWebappController" })
                .when("/angular", { templateUrl: "/home/angular" })
                .otherwise({ redirectTo: "/home" });
        }
])
.factory("restFactory", ["$http", function ($http) {
    var factory = {};

    factory.HttpGetList = function () {//getlist
        return $http.get('/api/ToDoList');
    }

    factory.HttpPostItem = function (descr) {//add item to list
        return $http.post("/api/ToDoList", { Description: descr });
    }

    factory.HttpPutItem = function (id, descr) {//update item description
        return $http.put("/api/ToDoList/{" + id + "}", { Description: descr });
    }

    factory.HttpDeleteItem = function (id) {//delete item
        return $http.post("/api/ToDoList/deleteitem", {Id: id});
    }

    factory.EditItemStatus = function (id, markasroute) {//set item to do or completed
        return $http.post("/api/ToDoList/{" + id + "}/" + markasroute);
    }

    factory.OrderListByStatus = function () {
        return $http.get("/api/ToDoList/orderbystatus");
    }

    return factory;
}])
.controller("TodoWebappController", ["$scope", "$location", "$window", "restFactory", function ($scope, $location, $window, restFactory) {
    $scope.list = {};

    $scope.OpenApplication = function () {
        $location.url("/webapp");
    }

    $scope.GetList = function () {
        ShowLoader();
        var promise = restFactory.HttpGetList();
        promise.then(
            function (response) {//succes
                console.log(response.data.Items);
                $scope.list = response.data.Items;
                HideLoader();
            },
            function (response) {//error
                AlertHttpError(response);
            }
        );
    }

    $scope.AddNewItem = function (description) {
        ShowLoader();
        var promise = restFactory.HttpPostItem(description);
        promise.then(
            function (response) {//succes
                //if (response.data.StatusCode == 201) {
                $window.alert("Item: '" + response.config.data.Description + "' is toegevoegd aan de lijst");
                $scope.GetList();
                HideLoader();
                //}
            },
            function (response) {//error
                AlertHttpError(response);
            }
        );
    }

    $scope.DeleteItem = function () {
        if (confirm("Weet u zeker dat u deze taak wilt verwijderen?")) {

            var promise = restFactory.HttpDeleteItem(this.item.Id);
            promise.then(
                function (response) {
                    if (response.statusText == "OK") {
                        var r = response;
                        $window.alert(response.data.StatusDescription);
                        $scope.GetList();
                    }
                },
                function (response) {
                    AlertHttpError(response);
                }
            );
            function readDeleteResponse(resp) {
                $scope.DeleteResponse = resp;
            }
        }
    }

    $scope.EditItemStatus = function () {
        if (this.item.Completed) {
            var promise = restFactory.EditItemStatus(this.item.Id, "markastodo");//false = set item to do
        } else {
            var promise = restFactory.EditItemStatus(this.item.Id, "markascompleted");//true = set item completed
        }

        promise.then(
           function (response) {//succes
               console.log(response);
               $window.alert(response.data.StatusDescription);
               $scope.GetList();
           },
           function (response) {//error
               AlertHttpError(response);
           }
       );
    }

    $scope.UpdateDescription = function (description) {
        var promise = restFactory.HttpPutItem($("#btnUpdate").attr("data-id"), description);

        promise.then(function (response) {
            console.log(response);
            $scope.GetList();
            $window.alert("Item updated: " + response.config.data.Description);
        },
        function (response) {
            console.log(response);
        });
    }

    $scope.SetModalEdit = function () {
        $("#myModalEdit").modal("show");
        $("#btnUpdate").attr("data-id", this.item.Id);
        document.getElementById("updateItemInput").value = this.item.Description;
    }

    $scope.OrderItemsByStatus = function(){
        ShowLoader();
        var promise = restFactory.OrderListByStatus();

        promise.then(
            function (response) {//succes
                $scope.GetList();
                HideLoader();
            },
            function (response) {//error
                AlertHttpError(response);
            }
        );
    }

    function AlertHttpError(response) {
        console.log(response);
        $window.alert("Error " + response.status + " " + response.statusText + "\n" + response.data);
        HideLoader();
    }

    function ShowLoader() {
        var loaderImg = angular.element(document.getElementById("loaderImg"));
        if (loaderImg.hasClass('isHidden')) {
            loaderImg.removeClass("isHidden");
        }
    }

    function HideLoader() {
        var loaderImg = angular.element(document.getElementById("loaderImg"));
        if (!loaderImg.hasClass('isHidden')) {
            loaderImg.addClass("isHidden");
        }
    }

}])
.directive("setImgstate", function () {//directive to set glyphicon -ok or -unchecked
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {

            var isComplete = scope.item.Completed
            if (scope.item.Completed) {
                elem[0].className = "radioBtnImg glyphicon glyphicon-ok";
            } else {
                elem[0].className = "radioBtnImg glyphicon glyphicon-unchecked";
            }
        }
    }
});