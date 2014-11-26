(function() {
    var app = angular.module('youtubeFactoryModule', []);

    function youtubeFactory ($http, trailerParkeApi, apiKeys) {
    	var youtubeAPI = {
            getTrailer: function (searchText, maxResults) {
                return $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='+
                                    maxResults+
                                    '&order=rating&q='+
                                    searchText+
                                    'official+trailer&type=video&videoDefinition=high&videoEmbeddable=true&key=' + 
                                    apiKeys.youtubeAPI);
            }
    	};

    	return youtubeAPI;
    }

    youtubeFactory.$inject = ['$http', 'trailerParkeApi', 'apiKeys'];

    app.factory('youtubeFactory', youtubeFactory);

})();