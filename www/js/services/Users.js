angular.module('someklone.services').factory('Users', function($q, $http, appConfig) {
    
    /* Temporary users */
    var users = [
        {
            id: 1,
            username: "dtrump",
            fullName: "Donald Trump",
            profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg" 
        },
        {
            id: 2,
            username: "POTUS",
            fullName: "President of United States",
            profileImageSmall: "https://pbs.twimg.com/profile_images/738744285101580288/OUoCVEXG.jpg" 
        },
        {
            id: 3,
            username: "HillaryC",
            fullName: "Hillary Clinton",
            profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg" 
        }
    ];

    return {
        searchUser: function(searchWord) {
          

            var upperCaseSearchWord = searchWord.toUpperCase();
            return $q(function (resolve, reject) {
                return $http.get(appConfig.apiAddr + "users").then(function (response) {
                    
                    console.log(response.data);
                    if (searchWord.length > 0) {
                        var matches = response.data.filter(function (u) {
                            var testString = u.username.toUpperCase();
                            return testString.includes(upperCaseSearchWord);
                        });

                        resolve(matches);
                    }
                    else {
                        reject();
                    }
                });
            });
        },
        getOne: function(key)
        {
            return $q(function(resolve, reject){
                for(var i = 0; i < users.length; i++)
                {
                    if(users[i].id == key)
                    {
                        resolve(users[i]);
                    }
                }
                reject();
                
            });
        }        
    };
})