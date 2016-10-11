angular.module('starter.services', ['config'])

    .factory('DataService', function ($q, $http) {

        return {
            all: function () {
                // return promise 
                return $q(function (resolve, reject) {
                    $http.get('https://instagramdamien.herokuapp.com/api/posts').then(function (response) {
                        // do something with the response if necessary

                        // here the response body (which contains the JSON data we are interested in) is returned
                        resolve(response.data);
                    });
                })
            }
        };
    })
    .factory('Users', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var users = [{
            id: 0,
            name: 'Ben Sparrow',
            face: 'img/ben.png',
            followers: [1, 2, 3, 4, 5],
            following: [1, 2, 3, 4, 5]
        }, {
            id: 1,
            name: 'Max Lynx',
            followers: [0, 2, 3, 4, 5],
            following: [0, 2, 3, 4, 5],
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            followers: [0, 1, 3, 4, 5],
            following: [0, 1, 3, 4, 5],
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            followers: [0, 1, 2, 4, 5],
            following: [0, 1, 2, 4, 5],
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            followers: [0, 1, 2, 3, 5],
            following: [0, 1, 2, 3, 5],
            face: 'img/mike.png'
        }, {
            id: 5,
            name: 'damien',
            face: 'https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/10502074_10153145101446416_4071352603442079179_n.jpg?oh=72e67ed294c0bbb6c1bc585be5bf2c1b&oe=58654897',
            followers: [0, 1, 2, 3, 4],
            following: [0, 1, 3]
        }];

        return {
            all: function () {
                return users;
            },
            remove: function (user) {
                users.splice(users.indexOf(user), 1);
            },
            get: function (userId) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id === parseInt(userId)) {
                        return users[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('User', function ($q, $http, API_ENDPOINT) {
  
        var user = null;

        return {
            login: function(username, password) {
                return $q(function(resolve, reject){
                    $http.post(API_ENDPOINT.url + "login", { username: username, password: password }).then(function (result) {
                        if(result.status == 200)
                        {
                            user = { id: result.data.id, username: result.data.username };
                            resolve();
                        }
                        else
                        {
                            reject();
                        }
                    }).catch(function(){
                        reject();
                    });
                });
            },
            isLogged: function()
            {
                return $q(function(resolve, reject){
                    if(user != null)
                    {
                        resolve();
                    }
                    else
                    {
                        reject();
                    }
                });
            },
            userId: function () {
                return user;
            },
            register: function (username, password) {
                $http.post(API_ENDPOINT.url + "register", { username: username, password: password });
            
            }
        };
    })
            

    





.factory('Pictures', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var pictures = [{
        id: 0,
        username: 'damien',
        userId: 5,
        caption: 'You on your way?',
        face: 'http://kurld.com/images/wallpapers/profile-pictures/profile-pictures-14.jpg',
        pic: 'https://s-media-cache-ak0.pinimg.com/564x/7c/64/8e/7c648e102e26b7c5fa2d9dfcebfb1750.jpg',
        likes: [],
        comments: []
    }];

    return {
        all: function() {
            return pictures;
        },
        remove: function(picture) {
            pictures.splice(pictures.indexOf(picture), 1);
        },
        get: function(pictureId) {
            for (var i = 0; i < pictures.length; i++) {
                if (pictures[i].id === parseInt(pictureId)) {
                    return pictures[i];
                }
            }
            return null;
        },
        put: function(pictureId, content) {
            for (var i = 0; i < pictures.length; i++) {
                if (pictures[i].id === pictureId) {
                    //console.log(pictures[i]);
                    pictures[i].comments.push(content);
                }
            }
            return null;
        },
        set: function (picture) {
            pictures.unshift(picture);
        },
        like: function (pictureId) {
            var found = false;
            for (var i = 0; i < pictures.length; i++) {
                if (pictures[i].id === pictureId) {
                    for (var j = 0; j < pictures[i].likes.length; j++) {
                        if (pictures[i].likes[j] === 'damien') {
                            pictures[i].likes.splice(j, 1);
                            var found = true;
                            break;
                        }                       
                    }
                    if (found == false) {
                    pictures[i].likes.push('damien');}
                }
            }
            return null;
        }
    };
})

.factory('Camera', function ($q) {

    return {
        getPicture: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }

});
