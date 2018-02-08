define(function(require, exports, module){

    var $=require("$");
    var highcharts = require('highcharts');
    

	function Chart(param) {
		this.title = param.title || "";
		this.subtitle = param.title || "";
		this.type = param.type || "spline";
		this.bgColor = param.bgColor || "#fff";
		this.colors = param.colors || ['#b7d94d', '#78bef9', '#ffaf10', '#ff5757', '#20c6ce', '#ff793e', '#3a86f5', '#ffee1f'],
		this.formatStyle = param.formatStyle || ".2f",
		this.legend = param.legend || false,
		this.element = param.element;
		this.xDataArr = param.xDataArr;
		this.dataArr = param.dataArr;
		this.init();
	}
	Chart.prototype.init = function() {
		var self = this;

		$(self.element).highcharts({
			colors: self.colors,
			legend: {
            	enabled: self.legend
        	},
		    chart : {
		        type: self.type,
		        backgroundColor: self.bgColor,
		    },
		    title: {
	            text: self.title
	        },
	        subtitle: {
	            text: self.subtitle
	        },
	        lang: {
            	noData: '暂无数据'
        	},
	        xAxis: {
	            categories: self.xDataArr,
	            crosshair: true
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ''
	            }
	        },
	        tooltip: {
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:'+self.formatStyle+'} </b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            },
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false
	                },
	                showInLegend: self.legend
	            }
	   //          pie: {
				// 	allowPointSelect: true,
				// 	cursor: 'pointer',
				// 	dataLabels: {
				// 		enabled: true,
				// 		format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				// 		style: {
				// 			color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				// 		}
				// 	}
				// }
	        },
	        series: self.dataArr
		}); 
	};

	return Chart; 
});