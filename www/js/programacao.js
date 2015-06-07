angular.module("viradapp.programacao", [])
.factory('Programacao', function() {
    return {
        init: function(){console.log("stub service")},
    }
})
.filter('lefilter', function(){
    /**
     * This filter receives 3 objects:
     * 1 - Events Lazy sequence
     * 2 - Spaces Lazy sequence
     * 3 - And a Filter object
     *
     * Returns the Filtered Lazy Sequence
     *
     */
    return function(events, spaces, filters){
        var lefilter = function (event){
            var hasSpace = false;
            var space = spaces.findWhere({
                id: event.spaceId.toString()
            });
            if(typeof space !== 'undefined'){
                if(filters.places.data.length > 0){
                    // If the places array is not empty,
                    // test if the event belongs to one of the places
                    if(!Lazy(filters.places.data).contains(space.id)){
                        return false;
                    }
                }

                var lm = new RegExp((filters.query), 'ig');
                hasSpace = lm.test(space.name.substring(filters.query));

                event.spaceData = space;
            }
            var date = moment(event.startsOn + " " + event.startsAt,
                          "YYYY-MM-DD hh:mm").format('x');

            return (date <= filters.ending
                    && date >= filters.starting)
                    && (event.name.indexOf(filters.query) >= 0
                        || hasSpace);
        };

        return events.filter(lefilter);
    };
})
.filter('toSpaces', function(){
    /**
     * This filter receives a:
     * 1 - Filtered Lazy sequence as data
     *
     * Returns an array with filtered spaces
     *
     */
    return function(data){
        var currSpaces = [];
        var toSpaces = function(event){
            if(typeof event.spaceData !== 'undefined'){
                var curr = Lazy(currSpaces)
                    .findWhere({id : event.spaceData.id});
                if(typeof curr !== 'undefined'){
                    delete event.spaceData;
                    curr.events.push(event);
                } else {
                    curr = event.spaceData;
                    curr.events = [];
                    curr.events.push(event);
                    currSpaces.push(curr);
                }

            }
            return true;
        };
        data.each(toSpaces);

        return currSpaces;
    };
})
.filter('searchPlaces', function(){
  return function (items, query) {
    if(typeof items === 'undefined') return;
    var filtered = [];
    var letterMatch = new RegExp((query), 'ig');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (query) {
        if (letterMatch.test(item.name.substring(query.length))) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
