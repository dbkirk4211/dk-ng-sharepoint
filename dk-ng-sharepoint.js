angular.module("ng-dk-sharepoint", [])
.service("SP", ["$http", "$q", "$interval", function($http, $q, $interval){
  var SP = this;
  
  SP.host_base = null;
  SP.request_digest = null;
  
  (function(deferred){
    SP.initialized = deferred.promise;
    
    var promise = $interval(function(){
			if($scope.test = angular.element("#__REQUESTDIGEST").val()){
			  $interval.cancel(promise);
			  deferred.resolve(SP);
    },0,0,false)
  })($q.defer())
  
  SP.request = function(request){
    return SP.initialized.then(function(){
      request.headers = request.headers || {};
      request.headers["X-RequestDigest"] = SP.request_digest;
      request.headers["accept"] = "application/json; odata=verbose";
      
      return $http(request);
    })
  }
}])
