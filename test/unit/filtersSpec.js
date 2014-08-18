'use strict';
describe('filter tests', function() {
	beforeEach(module('appFiltersModule'));

	describe('capitalize', function(){
		it('should capitalize the word through a filter', inject(function($filter){
			expect($filter('capitalize')('capitalize')).toEqual('Capitalize');
			expect($filter('capitalize')(['this', 'is', 'an', 'array'])).toEqual(['This', 'Is', 'An', 'Array']);
		}));
	});
});