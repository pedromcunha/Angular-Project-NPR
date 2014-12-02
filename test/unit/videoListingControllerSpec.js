'use strict';
describe('Controller: VideoListingController', function() {
	var scope;
	var headerController;
	var videoListingController;
	var $httpBackend;

	beforeEach(function(){
	    module('trailerParke');
	});

	beforeEach( inject(function($controller, $rootScope, _$httpBackend_, VideoStorage) {
		scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		headerController = $controller('headerController', {
	        $scope: scope,
	        VideoStorage: VideoStorage
	    });

	    videoListingController = $controller('VideoListingController', {
	        $scope: scope,
	        VideoStorage: VideoStorage
	    });
	}));

	describe('Searching for a trailer', function(){
		beforeEach( function() {
			var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=rating&q=The Avengers+official+trailer&type=video&videoDefinition=high&videoEmbeddable=true&key=AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo';
			$httpBackend.expectGET(url).respond(
				{
                "items": [
	                {
	                    "id": {
	                        "kind": "youtube#video",
	                        "videoId": "MfETYdF8UuQ"
	                    }
	                }, 
	                {
	                    "id": {
	                        "kind": "youtube#video",
	                        "videoId": "M0Y3MvOyMcY"
	                    }
	                }, 
	                {
	                    "id": {
	                        "kind": "youtube#video",
	                        "videoId": "_gZELN9VLjM"
	                    }
	                }
                ]
				}
			);
		});

		it('Should load up the controllers', function(){
			expect(headerController).not.toBeUndefined();
			expect(videoListingController).not.toBeUndefined();
		});
		it('Should load up the youtube videos when a query is entered', function(){
			expect(videoListingController.trailers).toEqual({}); //empty
			headerController.searchYoutube('The Avengers', 3);
			scope.$digest();
			$httpBackend.flush();
			expect(videoListingController.trailers.videos.length).toBe(3);//An array of 3 trailers
		});
		it('Should load up the youtube videos when a query is entered', function(){
			expect(videoListingController.trailers).toEqual({}); //empty
			headerController.searchYoutube('The Avengers', 3);
			scope.$digest();
			$httpBackend.flush();
			expect(videoListingController.trailers.videos.length).toBe(3);//An array of 3 trailers
		});
	});
	describe('Search for trailers by genre', function() {
		var items = [];

		beforeEach(function() {

			for (var i = 0; i < 21; i++) {
				items[i] =  
					{
	                    "id": {
	                        "kind": "youtube#video",
	                        "videoId": "MfETYdF8UuQ"
	                    }
	                };
			};
		});

		it('Should load up the genre trailers when a genre is searched', function(){
			var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=21&order=rating&q=action+official+movie+trailer+-game+-gameplay&type=video&videoDefinition=high&key=AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo';

			$httpBackend.expectGET(url).respond(
				{
                "items": items
				}
			);

			expect(videoListingController.trailers).toEqual({}); //empty
			headerController.searchByGenre('action');
			scope.$digest();
			$httpBackend.flush();
			expect(videoListingController.trailers.videos.length).toBe(21);//An array of 3 trailers
		});
		it('Should restrict the url when searching for fantasy to omit final fantasy results', function(){
			var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=21&order=rating&q=fantasy+official+movie+trailer+-game+-gameplay+-final&type=video&videoDefinition=high&key=AIzaSyDYhqH1guvlxxocuttrwxE2kkvYefu0cqo';

			$httpBackend.expectGET(url).respond(
				{
                "items": items
				}
			);

			expect(videoListingController.trailers).toEqual({}); //empty
			headerController.searchByGenre('fantasy');
			scope.$digest();
			$httpBackend.flush();
			expect(videoListingController.trailers.videos.length).toBe(21);//An array of 3 trailers
		});
	});
});