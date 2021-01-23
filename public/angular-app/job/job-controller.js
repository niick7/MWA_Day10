angular.module("jobsSearching").controller("jobController", jobController);

function jobController($http, $routeParams) {
  const vm = this;

  $http.get("/api/jobs/" + $routeParams.jobId).then(function(response) {
    vm.job = response.data;
  });
}