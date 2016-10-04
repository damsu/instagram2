angular.module('starter.controllers', [])
angular.module('starter')




//.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//  $scope.chats = Chats.all();
//  $scope.remove = function(chat) {
//    Chats.remove(chat);
//  };
//})

    .controller('HomeCtrl', function ($scope, $stateParams, Users, DataService, Pictures) {
        
        
        
        $scope.comment = {text: ''};
        //$scope.test = function () {
        //    console.log("test");
        //};
        $scope.toggleComBox = function () {
            $scope.comhide = !$scope.comhide;

        };
        $scope.sendComment = function (picture_id) {
            console.log($scope.comment.text);
            Pictures.put(picture_id, $scope.comment.text);

            console.log($scope.comment.text);
            console.log(Pictures.all());
            $scope.comment = { text: '' };
            $scope.comhide = true;
        };
        $scope.like = function (picture_id) {
            Pictures.like(picture_id);
        };

        $scope.some_model = {
            title: 'Thing One',
            liked: false,
        };
        $scope.users = Users.get($stateParams.userId);
        $scope.allusers = Users.all();
        $scope.pictures = Pictures.all();
        // called when the button is clicked
        $scope.executeHttp = function () {
            // User our own service to get the data
            // this controller does not really care where the data is coming from.
            // It could come from local database, online rest api, file system whatever - the controller just uses the service
            DataService.all().then(function (data) {
                $scope.items = data;
            });
            $scope.comhide = true;
         
        };

    })

    .controller('SearchCtrl', function ($scope, Users) {
        $scope.allusers = Users.all();
    })

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

.controller('AccountCtrl', function($scope, DataService, Pictures) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.comment = { text: '' };
    //$scope.test = function () {
    //    console.log("test");
    //};
  $scope.toggleComBox = function () {
      $scope.comhide = !$scope.comhide;

  };



  $scope.sendComment = function (picture_id) {
      console.log($scope.comment.text);
      Pictures.put(picture_id, $scope.comment.text);

      console.log($scope.comment.text);
      console.log(Pictures.all());
      $scope.comment = { text: '' };
      $scope.comhide = true;
  };
  $scope.like = function (picture_id) {
      Pictures.like(picture_id);
  };


  //$scope.pictures = Pictures.all();
    // called when the button is clicked
  $scope.executeHttp = function () {
      $scope.picture_view = 1;
      // User our own service to get the data
      // this controller does not really care where the data is coming from.
      // It could come from local database, online rest api, file system whatever - the controller just uses the service
      DataService.all().then(function (data) {
          $scope.items = data;
      });
      $scope.comhide = true;
      
  };
  $scope.pictures = Pictures.all();
  $scope.allitems = $scope.pictures.concat($scope.items);

})

.controller('FollowersCtrl', function ($scope, $stateParams, Users) {
   
    $scope.users = Users.get($stateParams.userId);
    $scope.allusers = Users.all();
})

    .controller('CameraCtrl', function ($scope, Camera, Pictures) {
        $scope.caption = {text: ''};
        $scope.takePicture = function (options) {

            var options = {
                quality: 75,
                targetWidth: 200,
                targetHeight: 200,
                sourceType: 1,
                correctOrientation: true
            };

            Camera.getPicture(options).then(function (imageData) {
                $scope.picture = imageData;;
            }, function (err) {
                console.log(err);
            });

        };
        $scope.getPicture = function (options) {

            var options = {
                quality: 75,
                targetWidth: 200,
                targetHeight: 200,
                sourceType: 0
            };

            Camera.getPicture(options).then(function (imageData) {
                $scope.picture = imageData;;
            }, function (err) {
                console.log(err);
            });
        };
        var post_iteration = 1;
        $scope.sendPicture = function () {
 
            Pictures.set({
                id: post_iteration,
                username: 'damien',
                userId: 5,
                caption: $scope.caption.text,
                face: 'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/10502074_10153145101446416_4071352603442079179_n.jpg?oh=72e67ed294c0bbb6c1bc585be5bf2c1b&oe=58654897',
                pic: $scope.picture,
                likes: [],
                comments: []
            });
            post_iteration++;
            //$state.go('tab.home', { url: '/home' });
          
            console.log($scope.caption.text);
            console.log(Pictures.all());
            $scope.caption = { text: '' };
        };
    })


    .controller('NewsCtrl', function ($scope, Users) {
        $scope.allusers = Users.all();
    })


.controller('FollowingCtrl', function ($scope, $stateParams, Users) {
   
    $scope.users = Users.get($stateParams.userId);
    $scope.allusers = Users.all();
})

.controller('UsersCtrl', function ($scope, $stateParams, Users, Pictures) {

    $scope.users = Users.get($stateParams.userId);
    $scope.allusers = Users.all();
    $scope.pictures = Pictures.all();
})

.controller('PicturesCtrl', function ($scope, $stateParams, Users, Pictures) {

    $scope.users = Users.get($stateParams.userId);
    $scope.allusers = Users.all();
    $scope.pictures = Pictures.get($stateParams.pictureId);
});