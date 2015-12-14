define([
	'app',
	'jquery',
	'services/jobs',
	'factories/job'
], function(app, $) {
	app.registerController('PlaybookJobsCtrl', ['$scope', 'jobs', function($scope, jobs) {
		$scope.jobs = jobs;

		jobs.get($scope.playbook, function () {
		});

		$scope.add = function () {
			$('#addJob').modal('show');
		}

		$scope.deleteJob = function (job) {
			job.delete($scope.playbook);
            $('.modal-backdrop').hide();
			jobs.get($scope.playbook, function () {
			});
		}

		$scope.runJob = function (job) {
			job.run($scope.playbook);
		}

		// Edit host
        $scope.editJob = function(job) {
          $scope.editing = job;
        }

        // Update existing hostgroup
        $scope.save = function (job) {
            job.save($scope.playbook, job).success(function (data, status, headers) {
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse = data;
                console.log(data);
            });
        };

	}]);

	app.registerController('AddJobCtrl', ['$scope', 'Job', 'jobs', function($scope, Job, jobs) {
		$scope.job = new Job();

		$scope.add = function () {
			$('#addJob').modal('hide');

			$scope.job.add($scope.playbook);

			jobs.get($scope.playbook, function () {
			});
		}
	}]);
});