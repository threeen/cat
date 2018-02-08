$(function(){
	var timer1,timer2,timer3,timer4;

	$('#dowebok').fullpage({
		'navigation': true,
		anchors: ['page1', 'page2', 'page3', 'page4','page5','page6','page7'],
		menu: '#menu',
		afterLoad: function(anchorLink, index){
			$('.content').css('display','block');
			if(index == 2){
				$('.content2>.img').css('opacity','1');
				timer4 = setInterval(function(){
					next(-1);
				}, 5000)
			};
			if(index == 3){
				$('.content3>.img').css('opacity','1');
			};
			if(index == 4){
				$('.content4>.img').css('opacity','1');
			};
			if(index == 5){
				$('.content5>.img').css('opacity','1');
			};
			if(index == 6){
				$('.content6>.img').css('opacity','1');
				var aa = 100;
				var n1 = 2;
				var n2 = 2;
				var n3 = 2;
				var bb1,bb2,bb3;
				bb1 = aa*n1;
				bb2 = aa*n2;
				bb3 = aa*n3;
				$(".line1").css("transition-duration","80s");
				$(".line2").css("transition-duration","34s");
				$(".line3").css("transition-duration","56s");
				$('.line1').css('width', bb1 + '%');
				$('.line2').css('width', bb2 + '%');
				$('.line3').css('width', bb3 + '%');
				timer1 = setInterval(function(){
					n1++;
					bb1 = aa*n1;
					$('.line1').css('width', bb1 + '%');
				},80000);
				timer2 = setInterval(function(){
					n2++;
					bb2 = aa*n2;
					$('.line2').css('width', bb2 + '%');
				},34000)
				timer3 = setInterval(function(){
					n3++;
					bb3 = aa*n3;
					$('.line3').css('width', bb3 + '%');
				},56000)
			}
		},
		onLeave: function(index, direction){
			if(index == 2){
				$('.content2>.img').css('opacity','0');
				clearInterval(timer4);
				$('.me-list').css({left: '6px'});
			};
			if(index == 3){
				$('.content3>.img').css('opacity','0');
			};
			if(index == 4){
				$('.content4>.img').css('opacity','0');
			};
			if(index == 5){
				$('.content5>.img').css('opacity','0');
			};
			if(index == 6){
				$('.content6>.img').css('opacity','0');
				window.clearInterval(timer1);
				window.clearInterval(timer2);
				window.clearInterval(timer3);
				$(".line1").css("transition-duration","1s");
				$(".line2").css("transition-duration","1s");
				$(".line3").css("transition-duration","1s");
				$(".line1").css("width","100%");
				$(".line2").css("width","100%");
				$(".line3").css("width","100%");
			};
		}
	});
	$(".components>li").hover(function(){
		var itemIndex = $(this).index();
		$(".phone>.show").removeClass("show");
		$(".phone>li").eq(itemIndex).addClass("show");
	},function(){});
	$('.me-prev').on('click',function(){
		next(1);
	});
	$('.me-next').on('click',function(){
		next(-1);
	});
	var scrollSwitch = true;
	function next(n){
		if(scrollSwitch){
			scrollSwitch = false;
			var itemWidth = $('.me-item')[0].offsetWidth + 12;
			var _left = parseFloat($('.me-list').css('left'));
			var _n = Math.abs((_left - 6)/itemWidth);
			_left += itemWidth*n;
			var parentWidth = parseFloat($('.me-list-in').css('width'));
			var childWidth = parseFloat($('.me-list').css('width'));
			var parentLeft = $('.me-list-in').offset().left;
			var childLeft = $('.me-list').offset().left;
			var cha = parentLeft-childLeft;
			var right = childWidth - parentWidth - cha;
			if(right < itemWidth*2 && n < 0){
				$('.me-next').removeClass('nextBg1');
				$('.me-next').addClass('nextBg2');
				clearInterval(timer4);
			}else{
				$('.me-next').removeClass('nextBg2');
				$('.me-next').addClass('nextBg1');
			};
			if(_left*-1+10 < itemWidth && n > 0){
				$('.me-prev').removeClass('prevBg1');
				$('.me-prev').addClass('prevBg2');
			}else{
				$('.me-prev').removeClass('prevBg2');
				$('.me-prev').addClass('prevBg1');
			};
			if((right > itemWidth && n < 0) || (_left < itemWidth && n > 0)){
				$('.me-list').css({left: _left + 'px'});
			};
			setTimeout(function(){
				scrollSwitch = true;
			}, 400)
		}
	};

})
