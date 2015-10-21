angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("app/app/contact/contact.html","<div>Contact info goes here!</div>");
$templateCache.put("app/app/network/network.html","<div>Network info goes here!</div>");
$templateCache.put("app/app/profile/profile.html","<div>Profile info goes here!</div><div>{{profile.title}}</div>");
$templateCache.put("app/app/skills/skills.html","<div>Skills go here!</div>");}]);