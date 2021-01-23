angular.module("jobsSearching", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-app/dashboard/index.html"
    })
    .when("/jobs", {
      templateUrl: "angular-app/jobs/jobs.html",
      controller: "jobsController",
      controllerAs: "vm"
    })
    .when("/jobs/:jobId", {
      templateUrl: "angular-app/job/job.html",
      controller: "jobController",
      controllerAs: "vm"
    }).otherwise({
      redirectTo: "/"
    })
}