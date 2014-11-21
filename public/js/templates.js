angular.module('templates-main', ['../public/templates/login-modal.html', '../public/templates/register.html', '../public/templates/trailer-listings.html']);

angular.module("../public/templates/login-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/login-modal.html",
    "");
}]);

angular.module("../public/templates/register.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/register.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title text-center\">Register for an account</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form name=\"userRegistration\">\n" +
    "    	<div class=\"form-group\" ng-class=\"{'has-error': modal.form.submitted === true && userRegistration.username.$invalid === true}\">\n" +
    "    		<div class=\"row\">\n" +
    "	    		<div class=\"col-md-3 col-md-offset-2\">\n" +
    "			    	<label for=\"username\">Username</label>\n" +
    "			    </div>\n" +
    "		    	<div class=\"col-md-6\">\n" +
    "			    	<input ng-model=\"vm.username\" type=\"text\" placeholder=\"Enter a username\" name=\"username\" class=\"form-control\" required>\n" +
    "	    		</div>\n" +
    "	    	</div>\n" +
    "	    </div>\n" +
    "	    <div class=\"form-group\" ng-class=\"{'has-error': modal.form.submitted === true && userRegistration.password.$invalid === true}\">\n" +
    "	    	<div class=\"row\">\n" +
    "	    		<div class=\"col-md-3 col-md-offset-2\">\n" +
    "			    	<label for=\"username\">Password</label>\n" +
    "			    </div>\n" +
    "		    	<div class=\"col-md-6\">\n" +
    "			    	<input ng-model=\"vm.password\" type=\"text\" placeholder=\"Enter a username\" name=\"password\" class=\"form-control\" required>\n" +
    "	    		</div>\n" +
    "	    	</div>\n" +
    "    	</div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" ng-click=\"modal.registerUser()\">OK</button>\n" +
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
