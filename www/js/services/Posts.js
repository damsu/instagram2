

angular.module('someklone.services').factory('Posts', function($q, $http, appConfig, $cordovaFileTransfer, Users, User) {


    var posts = [];

    return {
        // posts from myself and the from the users i am following
        following: function() 
        {
            return $q(function(resolve, reject){
                $http.get(appConfig.apiAddr + "posts").then(function(response){

                    /*var posts = response.data.map(function(elem){                        
                        var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
                        elem.caption = elem.caption.replace(replacePattern1, '$1<a href="https://twitter.com/search?q=$2">#$2</a>');
                        return elem;
                    });*/

                    resolve(response.data);
                },function(err){
                    reject();
                });
            });
        },
        // most recent posts 
        recent: function()
        {
            return $q(function(resolve, reject){
                resolve(posts);
            });
        },
        // search posts based on tags
        searchTag: function()
        {
            return $q(function(resolve, reject){
                resolve(posts);
            });
        },
        // get all posts of single user
        getUserPosts: function(userId)
        {
            return $q(function(resolve, reject){                
                $http.get(appConfig.apiAddr + "posts/user/" + userId).then(function(response){
                    resolve(response.data);
                }).catch(function(err){
                    reject();
                });                
            });
        },
        new: function(imageUri, caption)
        {
            return $q(function(resolve, reject) {

                var options = new FileUploadOptions()
                options.fileKey = "image";
                options.params = {
                     userId: User.getActiveUserId(),
                     caption: caption
                };

                $cordovaFileTransfer.upload(appConfig.apiAddr + "posts", imageUri, options).then(function(result) {
                    console.log("File upload complete");
                    console.log(result);
                    resolve();     
                }, function(err) {
                    console.log("File upload error");
                    console.log(err);
                    reject();                           
                }, function (progress) {
                    // constant progress updates
                    console.log(progress);
                });                
            });
        },
        toggleLike: function(post)
        {
            if(post.userLike)
            {
                post.likes--;
                $http.post(appConfig.apiAddr + "posts/" + post.id + "/unlike", {
                    likerUserId: User.getActiveUserId()
                });
            }
            else{
                post.likes++;
                $http.post(appConfig.apiAddr + "posts/" + post.id + "/like", {
                    likerUserId: User.getActiveUserId()
                });
            }
            post.userLike = !post.userLike;            
        },
        addCommentToPost: function(post, comment)
        {
            post.Comments.push({ User: User.getActiveUser(),
                                 text: comment 
            });
            return $q(function(resolve, reject){
                $http.post(appConfig.apiAddr + "posts/" + post.id + "/comment", {
                    userId: User.getActiveUserId(),
                    comment: comment
                }).then(function(){
                    resolve();
                });
            });
        },
    };
});
