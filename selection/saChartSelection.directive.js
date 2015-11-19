'use strict';

<<<<<<< HEAD
angular.module('saChart')
=======
angular.module('ngSaApp')
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  	.directive('saChartSelection', function ($rootScope, $filter)
  	{
  		var directive =
  		{
<<<<<<< HEAD
  			templateUrl: 'bower_components/sa-chart/selection/saChartSelection.html',
=======
  			templateUrl: 'components/saChart/selection/saChartSelection.html',
>>>>>>> 9041755cfdf848bd091c42c1b08136e1acf58ba1
  			restrict: 'EA',
  			scope:
  			{
  			},
  			link: function (scope, element, attrs, ctrl)
  			{
  				// Watch for when the reports have completed
  				scope.$on('ng-sa-reports-completed', function (event, options)
  				{
					// Get the original xaxis range
					var origXaxis =
					{
						from: options.$plot.getAxes().xaxis.min,
						to: options.$plot.getAxes().xaxis.max
					};
					
					scope.zoomed = false;

					function setSelection(from, to, zoomed)
					{
						// Set the specified selection
						setXAxis(from, to);
						scope.zoomed = zoomed;
						$plot.setSelection(from, to);
					}
					
					function setXAxis(from, to)
					{
						// Set the xaxis range
						$.each(options.$plot.getXAxes(), function(_, axis)
						{
							axis.options.min = from;
							axis.options.max = to;
						});
						options.$plot.setupGrid();
						options.$plot.draw();
						options.$plot.clearSelection();
					}

					scope.clearSelection = function ()
					{
						// Clear the selections
						setSelection(origXaxis.from, origXaxis.to, false);
					};
						
					var rangeSelectionCallback = function (o)
					{
			            setSelection(o.start, o.end, true);
						scope.$digest();
			        };
			        
			        function getYMinMax(datasets)
			        {
			        	var minmax = [Number.MAX_VALUE, Number.MIN_VALUE];
			        	$.each(datasets, function (i, dataset)
			        	{
				        	$.each(dataset.data, function (j, data)
				        	{
				        		minmax[0] = Math.min(minmax[0], data[1]);
				        		minmax[1] = Math.max(minmax[1], data[1]);
				        	});
			        	});
			        	return minmax;
			        }
  					
					// Create the chart
					var $chart = element.find('.selectionChart');
			        var datasets = $.extend(true, [], options.datasets);
			        $.each(datasets, function (i, dataset)
			        {
			        	dataset.label = undefined;
			        });
			        var minmax = getYMinMax(datasets);
					var $plot = $.plot($chart, datasets,
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
							show: false,
							min: Math.floor(minmax[0] - minmax[0] * 0.05),
							max: Math.ceil(minmax[1] + minmax[1] * 0.05)
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
		                grid:
		                {
		                	borderWidth: 0
		                },
		                rangeselection:
		                {
		                    color: '#909090',
		                    start: origXaxis.from,
		                    end: origXaxis.to,
		                    enabled: true,
		                    callback: rangeSelectionCallback
		                }			        		
			        });

	  				// Watch for a report selection change
	  				scope.$on('ng-sa-reports-plotselected', function (event, ranges)
	  				{
	  					setSelection(ranges.xaxis.from, ranges.xaxis.to, true);
						scope.$digest();
	  				});
  				});
  			}
  		};
  		return directive;
  	});
