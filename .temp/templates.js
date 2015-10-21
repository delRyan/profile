angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/contact/contact.html","<div>Contact info goes here!</div>");
$templateCache.put("app/network/network.html","<div>Network info goes here!</div>");
$templateCache.put("app/profile/profile.html","<div>Profile info goes here!</div><div>{{profile.title}}</div>");
$templateCache.put("app/skills/skills.html","<div>Skills go here!</div>");}]);