define(function(require, exports, module){
    var $=require("$");
    var ConfirmBox=require('ConfirmBox');
   
    module.exports=function(code){

		ConfirmBox.alert(code, function() {
            
            }, {
            	
            	confirmTpl: '<a class="btn btn-success" href="javascript:;">确&nbsp;&nbsp;定</a>',					
            	title:"错误信息",
                width: 300,
                closeTpl: '×'
            });
    };
});