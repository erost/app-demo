(function() {
    'use strict';

    function supports_history_api() {
        return !!(window.history && history.pushState);
    }

    // horrible workaround
    // http://stackoverflow.com/questions/4508574/remove-hash-from-url seems an issue in angular+html5 mode
    // if we have a trailing # in html5mode it cause havoc :D
    if(window.location.href.indexOf('#') === (window.location.href.length-1) && supports_history_api()) {
        window.history.pushState("", document.title, window.location.pathname);
    }

    var app = angular.module('hera',['ui.router']);

    /**
      * Configure angular-ui-router here...
      */
      app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.strictMode(false);
        $locationProvider.html5Mode(true);

        var productResolver = {
          product: function(Product, InitialData, $stateParams) {
            return InitialData.isLoaded ? Product.get($stateParams.id) : InitialData.load();
          }
        }

        //the app is wrapped around it's own abstract status
        $stateProvider.state('home', {
          url : '/',
          template: '<h1>This is the angularJS app home</h1>'
        }).state('product', {
          url: '/product/:id',
          controller: function(product) {
            this.product = product;
          },
          controllerAs: 'prodResolver',
          template: '<product-component product="prodResolver.product"></product-component>',
          resolve: productResolver
        });

        $urlRouterProvider.otherwise('/');
      });

      app.factory('Product', function($http) {
        var extractData = function(data) {
            return data.data;
        }

        return {
            get: function(id) {
                return $http.get('api/product/' + id).then(extractData);
            }
        }
      });

      app.directive('productComponent', function(Product) {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                product: '='
            },
            controller: function() {

            },
            controllerAs: 'productCtrl',
            templateUrl: 'components/product/product.html'
        }
      });

      app.factory('InitialData', function($document) {
        return {
            isLoaded: false,

            load: function() {
                console.log('loading data...');
                console.log($document[0].title);
                var raw = $document[0].querySelector('#hera-initial-data').text;
                var data = JSON.parse(raw);
                console.log('loaded data: ' + data);
                this.isLoaded = true;
                return data;
            }
        }
      });
})();