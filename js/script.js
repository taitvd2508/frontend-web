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

    // đăng ký
    $scope.dangky = function(){
        for(var i=0; i < listsv.length; i++){
         if($scope.student.username == listsv[i].username) {
             alert("Trùng Username ! Vui lòng nhập Username khác");
             return false;
         }else if($scope.student.password2 != $scope.student.password){
             alert("Vui Lòng Nhập Đúng Mật Khẩu Xác Nhận !");
             return false;
         }else{
             listsv.push(angular.copy($scope.student));
             alert("Đăng ký thành công !");
             $location.path('/dangnhap');
             console.log(listsv);
             return true;
         }
     }
     }
 
     $scope.dangxuat = function(){
         $rootScope.dangnhapchua = "";
         alert("Đã Đăng Xuất !");
         $location.path('/dangnhap');
         $rootScope.hoten = "";
         $rootScope.email = "";
     }
 
     $rootScope.huy = function() {
         $location.path('/trangchu');
     }
});

// ĐĂNG NHẬP
app.controller("dangnhapCtrl", function ($scope, $rootScope, $location) {
    $scope.dangnhap = function () {
        var user = $scope.user;
        var password = $scope.pw;
        var tc = false;
        var motsv;
        for (var i = 0; i < listsv.length; i++) {
            motsv = listsv[i];
            if (user == motsv.username && password == motsv.password) {
                $rootScope.sinhvien_login = motsv; // gán thông tin của sv thứ "motsv" vào $rootScope.sinhvien_login để gọi qua chức năng đổi mật khẩu, cap nhat tai khoan
                tc = true;
                break;
            }//đóng if
        } // đóng for
        if (tc) { // nếu đúng username và password cho $rootScope.dangnhapchua = "roi" để biết khi có giá trị là "roi" thì là đã đăng nhập   
            $rootScope.dangnhapchua = "roi";
            alert("Đăng nhập thành công !");
            $location.path('/trangchu');
            console.log(listsv);
        } else {
            alert("Đăng nhập thất bại ! Vui lòng nhập đúng Username & Password");
        }
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