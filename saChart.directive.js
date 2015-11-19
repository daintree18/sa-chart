'use strict';

angular.module('saChart', [])
  	.directive('saChart', function ($rootScope)
  	{
  		var directive =
  		{
  			templateUrl: 'bower_components/sa-chart/saChart.html',
  			restrict: 'EA',
  			scope:
  			{
  				data: '='
  			},
  			link: function (scope, element, attrs, ctrl)
  			{
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
