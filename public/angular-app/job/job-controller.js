angular.module("jobsSearching").controller("jobController", jobController);

function jobController($http, $routeParams) {
  const vm = this;

  $http.get("/api/jobs/" + $routeParams.jobId).then(function(response) {
    vm.job = response.data;
  });

  vm.updateJob = function(){
    const updateJob = {
      title: vm.title,
      salary: vm.salary,
      description: vm.description,
      experience: vm.experience,
      skills: vm.skills,
      postDate: vm.postDate
    };

    $http.put("/api/jobs/" + $routeParams.jobId, updateJob).then(function(response) {
      vm.message = "Update job successfully";
      delete vm.error;
    }).catch(function(error){
      vm.error = error;
      delete vm.message;
    });
  }
}