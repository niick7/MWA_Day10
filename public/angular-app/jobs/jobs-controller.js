angular.module("jobsSearching").controller("jobsController", jobsController);

function jobsController($http, $location) {
  const vm = this;

  $http.get("/api/jobs").then(function(response) {
    vm.jobs = response.data;
  });

  vm.createJob = function() {
    const newJob = {
      title: vm.title,
      salary: vm.salary,
      description: vm.description,
      experience: vm.experience,
      skills: vm.skills,
      postDate: vm.postDate
    };

    $http.post("/api/jobs/", newJob).then(function(_) {
      vm.message = "Create job successfully";
      delete vm.error;
    }).catch(function(error){
      vm.error = error;
      delete vm.message;
    });
  }

  vm.deleteJob = function(jobId) {
    $http.delete("/api/jobs/" + jobId).then(function(_){
      vm.message = "Delete job successfully.";
      delete vm.error;
    }).catch(function(err){
      vm.error = err;
      delete vm.message;
    })
  }
}