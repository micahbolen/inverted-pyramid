'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {
            $('#repo').repo({ user: 'micahbolen', name: 'inverted-pyramid', branch: 'gh-pages' }); 
  }]);