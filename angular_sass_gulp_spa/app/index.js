/**
 * Created by ziki on 2015/10/19.
 */

angular
    .module('app', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login/login.html',
                    controller: 'loginCtrl'
                });
        }]);