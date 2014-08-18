'use strict';
describe('factory tests', function() {
	beforeEach(module('appFactoriesModule'));

	describe('youtubeApiService', function(){
		it('should connect to the youtube api', inject(function(youtubeApiService){
			expect(youtubeApiService.getVideos('https://gdata.youtube.com/feeds/api/videos?q=the+lion+king+official+trailer&v=2&max-results=3&alt=json&category=movies&callback=JSON_CALLBACK')).toBeDefined();
		}));
	});
});