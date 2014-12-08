angular.module('templates-main', ['../public/templates/login-modal.html', '../public/templates/register-modal.html', '../public/templates/trailer-listings.html']);

angular.module("../public/templates/login-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/login-modal.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title text-center\">Login</h3> <a href ng-click=\"modal.closeModal()\"><i class=\"fa fa-close\"></i></a>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "	<div class=\"alert col-md-9 col-md-offset-2\"  ng-if=\"modal.responseMessage\" ng-class=\"{'alert-danger': modal.responseMessage.loggedIn === false, 'alert-success': modal.responseMessage.loggedIn === true}\" role=\"alert\">\n" +
    "		<i class=\"fa\" ng-class=\"{'fa-exclamation-triangle': modal.responseMessage.loggedIn === false, 'fa-check': modal.responseMessage.loggedIn === true}\"></i>\n" +
    "		{{modal.responseMessage.message}}\n" +
    "	</div>\n" +
    "    <form name=\"modal.userLogin\" novalidate>\n" +
    "    	<div class=\"form-group\" ng-class=\"{'has-error': modal.formSubmitted === true && modal.userLogin.username.$invalid === true}\">\n" +
    "    		<div class=\"row\">\n" +
    "	    		<div class=\"col-md-3 col-md-offset-2\">\n" +
    "			    	<label for=\"username\">Username</label>\n" +
    "			    </div>\n" +
    "		    	<div class=\"col-md-6\">\n" +
    "			    	<input ng-model=\"modal.username\" type=\"text\" placeholder=\"Enter a username\" name=\"username\" class=\"form-control\" ng-enter=\"modal.login()\" required>\n" +
    "	    		</div>\n" +
    "	    	</div>\n" +
    "	    </div>\n" +
    "	    <div class=\"form-group\" ng-class=\"{'has-error': modal.formSubmitted === true && modal.userLogin.password.$invalid === true}\">\n" +
    "	    	<div class=\"row\">\n" +
    "	    		<div class=\"col-md-3 col-md-offset-2\">\n" +
    "			    	<label for=\"username\">Password</label>\n" +
    "			    </div>\n" +
    "		    	<div class=\"col-md-6\">\n" +
    "			    	<input ng-model=\"modal.password\" type=\"password\" placeholder=\"Enter a username\" name=\"password\" class=\"form-control\" ng-enter=\"modal.login()\" required>\n" +
    "	    		</div>\n" +
    "	    	</div>\n" +
    "    	</div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"modal.login()\">Login</button>\n" +
    "    <button class=\"btn btn-warning\" ng-click=\"modal.closeModal()\">Cancel</button>\n" +
    "</div>");
}]);

angular.module("../public/templates/register-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/register-modal.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title text-center\">Register for an account</h3> <a href ng-click=\"modal.closeModal()\"><i class=\"fa fa-close\"></i></a>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "	<div class=\"alert col-md-9 col-md-offset-2\"  ng-if=\"modal.responseMessage\" ng-class=\"{'alert-danger': modal.responseMessage.registered === false, 'alert-success': modal.responseMessage.registered === true}\" role=\"alert\">\n" +
    "		<i class=\"fa\" ng-class=\"{'fa-exclamation-triangle': modal.responseMessage.registered === false, 'fa-check': modal.responseMessage.registered === true}\"></i>\n" +
    "		{{modal.responseMessage.message}}\n" +
    "	</div>\n" +
    "    <form name=\"modal.userRegistrationForm\" novalidate>\n" +
    "    	<div class=\"form-group\" ng-class=\"{'has-error': modal.formSubmitted === true && modal.userRegistrationForm.username.$invalid === true}\">\n" +
    "    		<div class=\"row\">\n" +
    "	    		<div class=\"col-md-3 col-md-offset-2\">\n" +
    "			    	<label for=\"username\">Username</label>\n" +
    "			    </div>\n" +
    "		    	<div class=\"col-md-6\">\n" +
    "			    	<input ng-model=\"modal.username\" type=\"text\" placeholder=\"Enter a username\" name=\"username\" class=\"form-control\" required>\n" +
    "	    		</div>\n" +
    "	    	</div>\n" +
    "	    </div>\n" +
    "	    <div class=\"form-group\" ng-class=\"{'has-error': modal.formSubmitted === true && modal.userRegistrationForm.password.$invalid === true}\">\n" +
    "	    	<div class=\"row\">\n" +
    "	    		<div class=\"col-md-3 col-md-offset-2\">\n" +
    "			    	<label for=\"username\">Password</label>\n" +
    "			    </div>\n" +
    "		    	<div class=\"col-md-6\">\n" +
    "			    	<input ng-model=\"modal.password\" type=\"password\" placeholder=\"Enter a username\" name=\"password\" class=\"form-control\" required>\n" +
    "	    		</div>\n" +
    "	    	</div>\n" +
    "    	</div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-disabled=\"modal.successMessage !== undefined\" ng-click=\"modal.registerUser()\">Submit</button>\n" +
    "    <button class=\"btn btn-warning\" ng-click=\"modal.closeModal()\">Cancel</button>\n" +
    "</div>");
}]);

angular.module("../public/templates/trailer-listings.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/trailer-listings.html",
    "<div class=\"content\">\n" +
    "	<div class=\"row\">\n" +
    "		<div class=\"col-xs-8 pull-right\">\n" +
    "			<ul class=\"programs-list scrollable\">\n" +
    "					<h2 class=\"no-vids-error\" ng-if=\"vm.trailers.videos.length == 0\">No videos found</h2>\n" +
    "		 		<li ng-repeat=\"video in vm.trailers.videos\" ng-class=\"{'genre-videos' : vm.trailers.videos.length > 3}\">\n" +
    "					<span ng-if=\"vm.userState.user !== null\"><h4 class=\"pull-left\">Rating: </h4><rating class=\"ratingQueryLarge\" ng-model=\"vm.rating\" max=\"5\" on-hover=\"hoveringOver(value)\" on-leave=\"overStar = null\"></rating> </span>\n" +
    "					<iframe class=\"youtube-player\" type=\"text/html\" width=\"640\" height=\"385\" ng-src=\"{{video}}\" frameborder=\"0\" allowfullscreen>\n" +
    "					</iframe>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
