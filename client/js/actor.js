(function () {

	var app = angular.module('actor', []);

	app.controller('actorCtrl', ['$scope', '$routeParams', 'Actor', 'Actortype', function ($scope, $routeParams, Actor, Actortype) {

		//------------ Actortypes --------------------------
		$scope.requiredPorts = [];
		$scope.Actortypes = [];

		Actortype.find(null, function (list) {
			$scope.Actortypes = list;
		});


		$scope.selectActortype = function (id) {
			Actortype.findById({ id: id }, function (obj) {
				$scope.requiredPorts = obj.ports;
			})

		}


		//--------------------------------------------------

		$scope.actorList = [];
		$scope.selectedActor = {};


		// Aufruf per /:id
		if ($routeParams.id) {
			Actor.findById({ id: $routeParams.id })
				.$promise
				.then(function (result) {
					if (result) {
						$scope.selectActor(result);
					} else {
						$scope.noResults = true;
					}
				});
		}
		// ----------------


		$scope.getActorList = function () {
			Actor.find({ filter: { include: ['location','ports']} })
			.$promise
			.then(function (list) {
				console.log(list);
				$scope.actorList = list;
			});
		};

		$scope.selectActor = function (obj) {
			$scope.selectedActor = obj;
			$scope.selectActortype(obj.type);
		}

		$scope.newActor = function () {
			$scope.selectedActor = {};
			$scope.selectedActor.id = 0;
		}

		$scope.saveActor = function (obj) {
			console.log(obj);
			console.log($scope.ctrl.frm.$dirty);
			if (obj.id > 0) {
				$scope.selectedActor.$save().then(function () { $scope.getActorList(); $scope.selectedActor = {}; });
			} else {
				Actor.create(obj).$promise.then(function () { $scope.getActorList(); $scope.selectedActor = {}; });
			}
		}

		$scope.IoData = function (obj, data) {
			Actor.data({ id: obj.id }, { dataObject: data })
				.$promise
				.then(function (result) {
					obj.data = result;
				})
		}

		$scope.checkActor = function (obj) {
			Actor.ping({ id: obj.id })
				.$promise
				.then(function (result) {
					console.log(result);
					$scope.testout = result;
				});
		}

		$scope.commands = function (obj, cmdstr) {
			Actor.commands({ id: obj.id }, { commands: Array(cmdstr) })
				.$promise
				.then(function (result) {
				})
		}



	} ]);

})();
