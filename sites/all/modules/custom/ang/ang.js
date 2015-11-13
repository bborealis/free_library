angular.module('nodeListing', ['ngResource', 'ngDialog'])

  //Factory for the ngResource service.
  .factory('Node', function($resource) {
    return $resorce(Drupal.settings.basePath + 'api/node/:param', {}, {
      'search' : {method : 'GET', isArray : true}
    });
  })

  .controller('ListController', ['$scope', 'Node', 'ngDialog', function($scope, Node, ngDialog) {
    //Initial list of nodes.
    $scope.nodes = Node.query();

    //Callback for performing the search using a param from the textfield.
    $scope.doSearch = function() {
      $scope.nodes = Node.serach({param: $scope.serach});
    };

    //Callback to load the node info in the module
    $scope.open = function(nid) {
      $sope.loadedNode =Node.get({param: nid});
      ngDialog.open({
        template: 'loadedNodeTemplate',
        scope: $scope
      });
    };

  }]);
