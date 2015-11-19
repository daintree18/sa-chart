'use strict';

<<<<<<< HEAD
angular.module('saChart', [])
=======
angular.module('ngSaApp')
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  	.directive('saChart', function ($rootScope)
  	{
  		var directive =
  		{
<<<<<<< HEAD
  			templateUrl: 'bower_components/sa-chart/saChart.html',
=======
  			templateUrl: 'components/saChart/saChart.html',
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  			restrict: 'EA',
  			scope:
  			{
  				data: '='
  			},
  			link: function (scope, element, attrs, ctrl)
  			{
<<<<<<< HEAD
=======
  				console.info('data');
  				console.info(scope.data);
  				
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  				scope.isShowThermostat = function ()
  				{
  					return (scope.data.zone.deviceCounts.thermostats >= 1);
  				};

  				scope.isShowTemperature = function ()
  				{
  					return (scope.data.zone.deviceCounts.temperatureSensors >= 1);
  				};
  			}
  		};
  		return directive;
  	});
