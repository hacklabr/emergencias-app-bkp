angular.module('viradapp.services', [])

.factory('Virada', function($http, Lazy) {
    var spaces = $http.get("assets/spaces-order.json")
    .then(function(res){
        return Lazy(res.data);
    });

    var events = $http.get("assets/events.json")
    .success(function(data){
    })
    .error(function(data, status, headers,config){
        console.log(status);
    })
    .then(function(res){
        return Lazy(res.data);
    });

    return {
        events: function() {
            return events;
        },
        spaces: function() {
            return spaces;
        },

        get: function(event_id) {
            for (var i = 0; i < spaces.length; i++) {
                if (spaces[i].id === parseInt(event_id)) {
                    return spaces[i];
                }
            }
            return null;
        }
    };
});
