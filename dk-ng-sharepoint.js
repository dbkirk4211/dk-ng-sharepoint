angular.module("ng-dk-sharepoint", [])
.service("SP", ["$http", "$q", "$interval", "spObjectManager", function($http, $q, $interval, spObjectManager){
	var SP = this;
	
	SP.host_base = null;
	SP.request_digest = null;
	
	(function(deferred){
		SP.initialized = deferred.promise;
		
		var promise = $interval(function(){
			if($scope.test = angular.element("#__REQUESTDIGEST").val()){
				$interval.cancel(promise);
				deferred.resolve(SP);
			}
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
	
	SP.loadList = function(api_url){
		return SP.request({
			url: api_url
		}).then(function(response){
			return spObjectManager.createList(response.data.d);
		})
	}
}])

.service("spObjectManager", function(){
	var ObjectManager = this;
  	
  	var List = function(response){
  		var List = this;
  		
  		List.id = response.Id;
  		List.api = response.__metadata.uri;
  	}
  	
  	List.prototype.update = function(response){
  		var List = this;
  		
  		List.name = response.Title;
  	}
  	
  	List.prototype.reload = function(){
  		var List = this;
  		
  		return SP.response({
  			url: List.api
  		}).then(function(response){
  			List.update(response);
  			
  			return List;
  		})
  	}
  	
  	ObjectManager.createList = function(response){
  		return new List(response);
  	}
})
