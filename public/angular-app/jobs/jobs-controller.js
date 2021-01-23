angular.module("jobsSearching").controller("jobsController", jobsController);

function jobsController($http) {
  const vm = this;

  $http.get("/api/jobs").then(function(response) {
    vm.jobs = response.data;
  });
}