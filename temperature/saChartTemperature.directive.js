'use strict';

<<<<<<< HEAD
angular.module('saChart')
=======
angular.module('ngSaApp')
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  	.directive('saChartTemperature', function ($rootScope, zoneStatusApi, Attribute, $filter, $timeout)
  	{
  		var directive =
  		{
<<<<<<< HEAD
  			templateUrl: 'bower_components/sa-chart/temperature/saChartTemperature.html',
=======
  			templateUrl: 'components/saChart/temperature/saChartTemperature.html',
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  			restrict: 'EA',
  			scope:
  			{
  				data: '='
  			},
  			link: function (scope, element, attrs, ctrl)
  			{
  				scope.$plot = null;
  				
  				var $chart = null,
  					needSetup = true;
  				
  				function setup()
  				{
  					// Setup the chart
  					if (needSetup)
  					{
	  					// Destroy the chart if present
	  					if (scope.$plot)
	  					{
	  						scope.$plot.shutdown();
	  						scope.$plot = null;
	  						$chart.empty();
	  					}
	
	  					// Build the chart
	  					$timeout(function ()
	  					{		
			  				// Get the chart data
	  						var start = scope.data.occurred,
	  							end = (scope.data.cleared ? scope.data.cleared : new Date());
			  				zoneStatusApi.get(scope.data.facility.uuid, scope.data.zone.uuid, start, end)
			  					.then(function (response)
			  					{
			  						// Get the datasets
			  						var datasets = [
			  						{
			  							label: 'Room Temperature',
			  							data: [],
			  							color: '#9FB56F'
			  						}];
			  						$.each(response, function (i, status)
			  						{
			  							if (status.attribute === Attribute.TEMPERATURE_CURRENT)
			  							{
			  								datasets[0].data.push([status.timeref, status.valueF]);
			  							}
			  						});
			  						
			  						// Get the options
			  						var options =
			  						{
			  							xaxis:
			  							{
			  								mode: 'time',
			  								timeformat: '%m/%d %I:%M %P',
			  								tickLength: 0,
											font:
											{
											    size: 11,
											    color: '#8A8A8A'									
											}
			  							},
			  							yaxis:
			  							{
			  								tickFormatter: function(v, axis)
			  								{
			  									return $filter('temperature')(v, scope.data.facility.temperatureUnit);
			  							    },
											font:
											{
											    size: 11,
											    color: '#8A8A8A'									
											}
			  							},
			  							legend:
			  							{
			  								noColumns: datasets.length + 1,
			  								container: element.find('.legend')
			  							},
			  							series:
			  							{
			  								lines:
			  								{
				  								show: true,
				  								lineWidth: 2
			  								},
			  								curvedLines:
			  								{
			  									apply: true,
			  			                        active: true,
			  			                        monotonicFit: true
			  			                    },
			  			                    shadowSize: 0
			  			                },
			  			                selection:
			  			                {
			  			                	mode: 'x'
			  			                },
			  			                grid:
			  			                {
			  			                	borderWidth: 0
			  			                }
			  						};
			  						
			  						// Create the chart
			  						$chart = element.find('.chart');
			  						scope.$plot = $.plot($chart, datasets, options);
			  						
			  						// Add a shaded area to signify when the alert happened
			  						datasets.push(
			  						{
			  							data: [ [ start + moment().utcOffset() * 60 * 1000, scope.$plot.getAxes().yaxis.max ] ],
			  							color: (scope.data.category === 'Too Hot' ? '#FF5C33' : '#5CADFF'),
			  							bars:
			  							{
			  					            show: true, 
			  					            align: 'center',
			  					            barWidth: end - start,
			  					            lineWidth: 0
			  					        }		  							
			  						});
			  						scope.$plot = $.plot($chart, datasets, options);
			  						
			  						// Mark the reports as completed
			  						if (scope.$parent.isShowTemperature())
			  						{
				  						$rootScope.$broadcast('ng-sa-reports-completed',
				  						{
				  							$plot: scope.$plot,
				  							datasets: datasets
				  						});
			  						}
			  						
			  						function setXAxis(from, to)
			  						{
			  							// Set the xaxis range
			  							$.each(scope.$plot.getXAxes(), function(_, axis)
			  							{
			  								axis.options.min = from;
			  								axis.options.max = to;
			  							});
			  							scope.$plot.setupGrid();
			  							scope.$plot.draw();
			  							scope.$plot.clearSelection();
			  						}
			  						
			  						// Watch for selection changes
			  						$chart.bind('plotselected', function (event, ranges)
			  						{
			  							// Update the chart's selection
			  							setXAxis(ranges.xaxis.from, ranges.xaxis.to, true);
			  							scope.$digest();
			  							
			  							// Notify others
			  	  						$rootScope.$broadcast('ng-sa-reports-plotselected', ranges);
			  						}).bind('plotunselected', function (event)
			  						{
			  						});
			  					});
	  					}, 0);
	  					needSetup = false;
  					}
  				}
  				
  				// Watch for when this view becomes active
  				scope.$on('ng-sa-tab-selected', function(event, tab)
  				{
  					if (tab === 'detail')
  					{
  						setup();
  					}
				});
  			}
  		};
  		return directive;
  	});
