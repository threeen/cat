(function() {
    var root = this;
    var config = {
        alias: {
            '$': 'jquery/jquery/1.10.1/jquery',
            '$-debug': 'jquery/jquery/1.10.1/jquery-debug',
            'jquery': 'jquery/jquery/1.10.1/jquery',
            'jquery-debug': 'jquery/jquery/1.10.1/jquery-debug',
			// 'handlebars': 'alinw/handlebars/1.3.0/runtime',
            'handlebars': 'alinw/handlebars/1.3.0/handlebars',
			'select': 'alinw/select/2.0.6/select',
            'uploader': 'alinw/upload/2.0.5/upload',
            'calendar': 'alinw/calendar/1.1.1/calendar',
            'dialog': 'alinw/dialog/2.0.6/dialog',
            'validator': 'alinw/validator/3.1.0/validator',
            'ConfirmBox': 'alinw/dialog/2.0.6/confirmbox',
            'pagination': 'alinw/pagination/2.0.3/pagination',
            'autosearchtext': 'alinw/autosearchtext/1.1.0/autosearchtext-debug',
            'tip': 'alinw/tip/2.1.0/tip',
            'highcharts':'highcharts/highcharts',
            // 'exporting':'highcharts/modules/exporting',
            'select2': 'jquery/select2/3.4.5/select2',
            // 'bootstrap': "/web/lib/js/bootstrap.min",
            // "bootstrap-hover": "/web/lib/js/bootstrap-hover-dropdown.min"
           
        },
        paths: {},
        comboSyntax: ['??', ','],
        comboMaxLength: 1000,
        preload: ['$'],
        charset: 'utf-8',
        timeout: 1000,
        debug: true
    };

    // 仅限浏览器时使用
    if (root.seajs) {
        if (typeof define === 'function') {
            define(function(require, exports, module) {
                module.exports = config; // avoid warning on console
            });
        }
        root.seajs.config(config);
    }

    return config;
}).call(this);
