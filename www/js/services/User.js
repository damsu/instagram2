angular.module('someklone.services').factory('User', function($q, appConfig, $http, $cordovaFileTransfer) {

    var activeUser = null;

    return {

        login: function(username, password)
        {
            return $q(function(resolve, reject){
                $http.post(appConfig.apiAddr + "users/login", { username: username, password: password }).then(function(response){
                    activeUser = response.data;
                    resolve();
                },function(err){
                    console.log(err);
                    reject();
                });
            });
        },
        register: function(username, password)
        {
            return $q(function(resolve, reject){
                $http.post(appConfig.apiAddr + "users", { username: username, password: password }).then(function(response){                    
                    resolve();
                },function(err){
                    console.log(err);
                    reject();
                });
            });
        },
        isLogged: function()
        {
            return $q(function(resolve, reject){
                if(activeUser != null)
                {
                    resolve();
                }
                else
                {
                    reject();
                }
            });
        },
        getActiveUser: function()
        {
            return activeUser;
        },
        getActiveUserId: function()
        {
            return activeUser.id;
        },
        getActiveUserActivity: function()
        {
            return activeUser.activity;
        },
        updateProfileImage: function(fileUri)
        {
            return $q(function(resolve, reject){
                var options = new FileUploadOptions()
                options.fileKey = "image";                

                $cordovaFileTransfer.upload(appConfig.apiAddr + "users/" + activeUser.id + "/photo", fileUri, options).then(function(result) {
                    console.log("File upload complete");
                    console.log(result);
                    var dataResp = JSON.parse(result.response);
                    activeUser.profileImageSmall = dataResp.profileImageSmall;
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
        }
    };
})