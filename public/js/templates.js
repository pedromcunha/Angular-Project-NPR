angular.module('templates-main', ['../public/templates/login-modal.html', '../public/templates/register.html', '../public/templates/trailer-listings.html']);

angular.module("../public/templates/login-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/login-modal.html",
    "");
}]);

angular.module("../public/templates/register.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../public/templates/register.html",
    "<div class=\"content\">\n" +
    "	<div class=\"col-md-12\">\n" +
    "		<h1>Register Page</h1>\n" +
    "	</div>\n" +
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
