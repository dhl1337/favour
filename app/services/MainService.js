/**
 * Created by danle on 1/5/16.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .service('MainSvc', ['$firebaseObject', '$firebaseArray', 'fb', MainSvc]);

    function MainSvc ($firebaseObject, $firebaseArray, fb) {

        var ref = new Firebase (fb.url);
        var events = $firebaseArray(ref);
        //console.log(events);

        var currentUser = null;
        var ref = new Firebase(fb.url);
        ref.onAuth(function (user) {
            if(user) {
                //console.log('hello');
                currentUser = user;
            } else {
                console.log('user got blank');
            }
        });

        //getting current user info
        this.currentUser = function () {
            if(currentUser) {
                //console.log('Got User: ',  currentUser);
                var ref = new Firebase(fb.url+'/users/'+currentUser.uid);
                return $firebaseObject(ref);
            } else {
                console.log('No Current User');
                return null;
            }
        };

        //getting the users
        this.getUsers = function () {
            var ref = new Firebase(fb.url+'/users/');
            var usersArr = $firebaseArray(ref);
            return usersArr;
        };

        this.getUser = function (userId) {
            var ref = new Firebase (fb.url + '/users/' + userId);
            return $firebaseObject(ref);
        };


        this.getFavors = function() {
            var ref = new Firebase(fb.url+'/favor/');
            var favorArr = $firebaseArray(ref);
            return favorArr;
        };



        this.addFavoriteFavors = function () {
            var ref = new Firebase(fb.url+'/favorites/'+currentUser.uid);
            var favsArr = $firebaseArray(ref);
            return favsArr;
        };

        this.addFavor = function (newfavor) {
            var ref = new Firebase(fb.url+'/favor');
            var favArr = $firebaseArray(ref);
            favArr.$add(newfavor);
        };

        //this.deleteFavor = function (id) {
        //    var ref = new Firebase(fb.url+'/favor');
        //    var favArr = $firebaseArray(ref);
        //    favArr.$remove(id);
        //};

    }
})();