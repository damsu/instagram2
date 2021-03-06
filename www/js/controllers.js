angular.module('someklone.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicHistory, $ionicPopup, User) {
    $scope.loginData = {
        username:"",
        password:""
    };

    $scope.login = function()
    {
        User.login($scope.loginData.username, $scope.loginData.password).then(function(){
            $ionicHistory.nextViewOptions({        
                disableBack: true
            });
            $state.go('tab.home');
        }).catch(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Login fail',
                template: 'Incorrect username or password'
            });
        });
    }
})

.controller('RegisterCtrl', function($scope, $state, $ionicHistory, $ionicPopup, User) {
    $scope.registerData = {
        username:"",
        password:""
    };

    $scope.register = function()
    {
        User.register($scope.registerData.username, $scope.registerData.password).then(function(){
            // autologin after registration
            User.login($scope.registerData.username, $scope.registerData.password).then(function(){
                $ionicHistory.nextViewOptions({        
                    disableBack: true
                });
                $state.go('tab.home');
            });                       
        }).catch(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Register fail',
                template: 'Registration failed'
            });
        });
    }

})

.controller('HomeCtrl', function($scope, $state, Posts) {

    $scope.$on('$ionicView.enter', function(){
        // This event handler is activated when the view is entered.
        // So we can for example ask a data reload each time
        Posts.following().then(function(data)
        {
            $scope.posts = data;
        });
    });    

    $scope.goToSearch = function (tag) {
        $state.go('tab.browse-search',  { paramtag: tag, paramtabs: true } );
    }

    $scope.toggleLike = function (post)
    {
        Posts.toggleLike(post);
    }

    $scope.comment = function(post)
    {
        $state.go('comment', { postId: post.id, postData: post });
    }
})

.controller('BrowseCtrl', function($scope, $state) {

    $scope.activateSearch = function()
    {
        $state.go('tab.browse-search');
    }
  
    $scope.browseDetail = function(id)
    {
        $state.go('tab.browse-detail', { id: id });
    }

})

.controller('BrowseDetailCtrl', function($scope, $stateParams) {
    console.log($stateParams);
})

.controller('SearchCtrl', function($scope, $state, $ionicHistory, Users, Posts, $stateParams) {

    $scope.input = {
        searchText: ""
    };

    $scope.searchResults = {
        people: [],
        tags: []
    };

    $scope.input.searchtext = $state.params.paramtag;

    $scope.tabs = {
        people: true,
        tags: false
    };

    //$scope.tabs.tags = $state.params.paramtabs;
    //$scope.tabs.people = !$state.params.paramtabs;

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        $state.go('tab.browse');
    };

    $scope.emptySearch = function()
    {
        $scope.input.searchText = "";
    };

    $scope.tabActivate = function(tab)
    {
        for (var k in $scope.tabs) {
            if ($scope.tabs.hasOwnProperty(k)) 
            {
                $scope.tabs[k] = false;
            }
        }
        $scope.tabs[tab] = true;
    };

    $scope.updateSearch = function()
    {
        if($scope.tabs.people == true)
        {
            Users.searchUser($scope.input.searchText).then(function(result) {
                $scope.searchResults.people = result;
            });
        }
        else // search for posts with tags
        {
            Posts.searchTag($scope.input.searchText).then(function (result) {
                $scope.searchResults.tags = result;
            });
        }
    };
})

.controller('PostCtrl', function($scope, $state, $ionicHistory, $ionicPlatform, $cordovaCamera, $ionicScrollDelegate) {

    $scope.tabs = {
        gallery: true,
        photo: false,        
    };

    $scope.imageData = {
        gallery: {}
    };    
    
    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    };

    $scope.photo = function()
    {
        $scope.tabs.photo = true;
        $scope.tabs.gallery = false;
                
        var options =  {
            // Some common settings are 20, 50, and 100 
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,            
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE             
        };

        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture(options).then(function(imageUri) {
                $scope.imageData.picture = imageUri;

                // go immediately to post sending from photo taking
                $state.go('post-confirm', { imageUri: $scope.imageData.picture });

                }, function(err) {
                    // error should be handled here
            });
        });
    };

    $scope.gallery = function()
    {
        $scope.tabs.photo = false;
        $scope.tabs.gallery = true;

        // fetch photos from "Camera" album - this works in Android, not tested with iOS      
        // galleryAPI provided by https://github.com/subitolabs/cordova-gallery-api
        galleryAPI.getMedia("Camera", function(items) {
            console.log(items);

            $scope.imageData.gallery.photos = items.filter(function(i){  // filter out images, which do not have thumbnail
                if(i.thumbnail_id != 0) // the id will be zero for images, which do not have thumbnails
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });            
        });        
    };

    $scope.selectGalleryImage = function(photo)
    {
        $scope.imageData.picture = "file://" + photo.data;
        $ionicScrollDelegate.scrollTop();
    };

    $scope.confimPost = function()
    {
        // pass the picture URI to the confirm state
        $state.go('post-confirm', { imageUri: $scope.imageData.picture });
    };

    $scope.gallery(); // execute gallery when the controller is run first time

})

.controller('PostConfirmCtrl', function($scope, $state, $stateParams, $ionicHistory, Posts){
    $scope.post = {
        imageUri: $stateParams.imageUri,
        caption: ""
    };     
    
    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('post');
    }; 

    $scope.sharePost = function()
    {
        Posts.new($scope.post.imageUri, $scope.post.caption).then(function(){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('tab.home');
        });
    };
}) 

.controller('ActivityCtrl', function($scope, User) {
    $scope.activity = User.getActiveUserActivity();
})

.controller('AccountCtrl', function($scope, User, Posts, $ionicPlatform, $cordovaCamera) {
    $scope.userData = User.getActiveUser();
    $scope.$on('$ionicView.enter', function(){
        // This event handler is activated when the view is entered.
        // So we can for example ask a data reload each time
        Posts.getUserPosts(User.getActiveUserId()).then(function(data)
        {
            $scope.posts = data;
        });
    });  

    Posts.getUserPosts($scope.userData.id).then(function(results){
        $scope.posts = results;
    });

    $scope.changeUserPicture = function()
    {
        var options =  {
            // Some common settings are 20, 50, and 100 
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,            
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE             
        };

        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture(options).then(function(imageUri) {
                User.updateProfileImage(imageUri);
            });
        });
    }
})

.controller('PostCommentCtrl', function($scope, $state, Posts, $ionicScrollDelegate, $ionicHistory) {
    $scope.comment = { text: "" };
    
    $scope.comments = $state.params.postData.Comments;
    $scope.post = $state.params.postData;
    $ionicScrollDelegate.scrollBottom();

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    };

    $scope.addComment = function()
    {
        Posts.addCommentToPost($scope.post, $scope.comment.text);                
        $ionicScrollDelegate.scrollBottom(true);        
        $scope.comment.text = "";
    }
});
