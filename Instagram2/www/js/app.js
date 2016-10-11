// Ionic Starter App
angular.module('config', []).constant('API_ENDPOINT', {
    url: 'https://instagramdamien.herokuapp.com/'
});
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function ($ionicPlatform, $rootScope, User, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  //$rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {
  //    $state.go("login");
  //});
})


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider



  // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        resolve: {
            islogged: function (User) {
                return User.isLogged();
            }
        }
    })

  // Each tab has its own nav history stack:

  .state('tab.camera', {
      url: '/camera',
      views: {
          'tab-camera': {
              templateUrl: 'templates/tab-camera.html',
              controller: 'CameraCtrl'
          }
      }
  })

      .state('tab.home', {
          url: '/home',
          views: {
              'tab-home': {
                  templateUrl: 'templates/tab-home.html',
                  controller: 'HomeCtrl'
              }
          }
      })

      .state('tab.search', {
          url: '/search',
          views: {
              'tab-search': {
                  templateUrl: 'templates/tab-search.html',
                  controller: 'SearchCtrl'
              }
          }
      })

  .state('tab.news', {
      url: '/news',
      views: {
          'tab-news': {
              templateUrl: 'templates/tab-news.html',
              controller: 'NewsCtrl'
          }
      }
  })
    .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-chats': {
                templateUrl: 'templates/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

  .state('tab.account', {
      url: '/account',
      views: {
          'tab-account': {
              templateUrl: 'templates/tab-account.html',
              controller: 'AccountCtrl'
          }
      }
  })

    .state('tab.followers', {
        url: '/users/:userId/followers',
        views: {
            'tab-account': {
                templateUrl: 'templates/followers.html',
                controller: 'FollowersCtrl'
            }
        }
    })

    .state('tab.following', {
        url: '/users/:userId/following',
        views: {
            'tab-account': {
                templateUrl: 'templates/following.html',
                controller: 'FollowingCtrl'
            }
        }
    })

    .state('tab.users', {
        url: '/users/:userId',
        views: {
            'tab-account': {
                templateUrl: 'templates/userpage.html',
                controller: 'UsersCtrl'
            }

        }
    })

    .state('tab.pictures', {
        url: '/users/:userId/:pictureId',
        views: {
            'tab-account': {
                templateUrl: 'templates/pictures.html',
                controller: 'PicturesCtrl'
            }

        }
    })


    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    });

      //.state('register', {
      //    url: '/register',    
      //    templateUrl: 'templates/register.html',
      //    controller: 'RegCtrl'
      //});

  

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

    

});
