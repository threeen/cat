define(function(require, exports, module){

    var $=require("$");

	function CountDown(param) {
		this.element = param.element;
		this.number = param.number;
		this.step = param.step || 100;
		this.i = 0;
		this.timer();
	};

	CountDown.prototype.timer = function(){
		var self = this;
		var $this = $(self.element);
		var speed = self.number / self.step;

		setTimeout(function(){
			self.i = self.i + Math.floor(Math.random() * speed) + 1;
			if(self.i > self.number) {
				$this.text(self.number);
			}else {
				self.timer();
				$this.text(self.i)
			}
		},1)
	};

	return CountDown; 
});