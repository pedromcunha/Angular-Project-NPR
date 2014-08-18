'use strict';
describe('factory tests', function() {
	beforeEach(module('appFactoriesModule'));

	describe('Make sure the http calls work', function(){
		it('should connect to the youtube api', inject(function(youtubeApiService, rottenTomatoesService){
			expect(youtubeApiService.getVideos('https://gdata.youtube.com/feeds/api/videos?q=the+lion+king+official+trailer&v=2&max-results=3&alt=json&category=movies&callback=JSON_CALLBACK')).toBeDefined();
			expect(rottenTomatoesService.getRatings("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=4cwjthjq2hyxz7amh6jj5p4p&q=this+is+it&page_limit=5&callback=JSON_CALLBACK")).toBeDefined();
		}));
	});
});