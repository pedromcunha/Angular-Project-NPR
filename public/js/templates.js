angular.module('templates-main', ['../public/templates/login-modal.html', '../public/templates/register.html', '../public/templates/trailer-listings.html']);

angular.module("../public/templates/login-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/login-modal.html",
    "");
}]);

angular.module("../public/templates/register.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/register.html",
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
    "					<h2 class=\"no-vids-error\" ng-show=\"programs == ''\">No videos found</h2>\n" +
    "		 		<li ng-repeat=\"video in programs.videos\" ng-class=\"{'genre-videos' : programs.length > 5}\">\n" +
    "						<iframe class=\"youtube-player\" type=\"text/html\" width=\"640\" height=\"385\" ng-src={{video}} frameborder=\"0\" allowfullscreen>\n" +
    "					</iframe>\n" +
    "				</li>\n" +
    "<!-- 				<div ng-repeat=\"video in programs.videos\">\n" +
    "					{{video}}\n" +
    "					<iframe ng-src=\"{{video}}\"></iframe>\n" +
    "				</div> -->\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
