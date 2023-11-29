var app = angular.module("myapp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/trangchu", {templateUrl:"danhmucmonhoc.html" , controller:"monhocCtrl"})
    .when("/gioithieu", {templateUrl:"gioithieu.html"})
    .when("/lienhe", {templateUrl:"lienhe.html"})
    .when("/dangky", {templateUrl:"dangky.html", controller:"myCtrl"})
    .when("/dangnhap", {templateUrl:"dangnhap.html", controller:"dangnhapCtrl"})
    .when("/quenmatkhau", {templateUrl:"quenmatkhau.html"})
    .when("/doimatkhau", {templateUrl:"doimatkhau.html", controller:"doimatkhauCtrl"})
    .when("/capnhattaikhoan", {templateUrl:"capnhattaikhoan.html", controller:"capnhatCtrl"})
    .when("/thitracnghiem/:idMH/:tenMH", {templateUrl:"thitracnghiem.html", controller:"tnCtrl"})
    .otherwise({templateUrl:"danhmucmonhoc.html", controller:"monhocCtrl"})
});

app.controller("myCtrl", function($scope, $http, $rootScope, $location){
    
    $scope.start = 0;
    $scope.pageSize = 11;
    $scope.listcacmonhoc = [];
    $http.get("db/Subjects.js").then(
        function(t) {$scope.listcacmonhoc = t.data},
        function(f) {alert("Lỗi: " +f.statusText);}
    );

    $scope.xemthem = function() {
        $scope.start = 0;
        $scope.pageSize = $scope.listcacmonhoc.length;
        document.getElementById("xemthem").style.display = "none";
        document.getElementById("thulai").style.display = "block";
    }

    $scope.thulai = function() {
        $scope.start = 0;
        $scope.pageSize = 11;
        document.getElementById("xemthem").style.display = "block";
        document.getElementById("thulai").style.display = "none";
    }

});


// DANH MỤC MÔN HỌC - CONTROLLER
app.controller("monhocCtrl", function($scope, $http, $rootScope){
    $scope.listcacmonhoc = [];
    $scope.st = 1;
    $scope.pageSize = 6;
    $scope.start = 0;

    $http.get("db/Subjects.js").then(
        function(t) {$scope.listcacmonhoc = t.data, $scope.tongst = Math.ceil($scope.listcacmonhoc.length / $scope.pageSize)},
        function(f) {alert("Lỗi: " +f.statusText);}
    );

    $scope.next = function(){
        if($scope.start < $scope.listcacmonhoc.length - $scope.pageSize){ 
            $scope.start += $scope.pageSize;
            $scope.st++;
        }
    }

    $scope.prev = function(){
        if($scope.start > 0){
            $scope.start -= $scope.pageSize;
            $scope.st--;
        }
    }

    $scope.first = function(){
        $scope.start = 0;
        $scope.st = 1;
    }

    $scope.last = function(){
        sotrang = Math.ceil($scope.listcacmonhoc.length / $scope.pageSize);
        $scope.start = (sotrang - 1) * $scope.pageSize;
        $scope.st = sotrang;
    }

    if(!$rootScope.dangnhapchua){ // nếu chưa đăng nhập thì cho hoten vs email rỗng
        $rootScope.hoten = "";
        $rootScope.email = "";
    }else{
        $rootScope.hoten = $rootScope.sinhvien_login.fullname; // dùng $rootScope để có thể gọi trong myCtrl
        $rootScope.email = $rootScope.sinhvien_login.email;
    }
});