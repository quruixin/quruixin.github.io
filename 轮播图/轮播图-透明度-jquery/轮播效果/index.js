$(function(){
    //焦点图
    $("#slideBox").slider(3000,500);
});

 /**
*	焦点图
*	s = 切换间隔
*	d = 淡入速度
*	执行：$("#slideBox").slider(3000,500);
*/
;(function($,window,document,undefined){

	$.fn.slider = function(s,d){
		
		var index = 0,
			stop_flag = false,
			bd = this.find(".bd ul li"),
			hd = this.find(".hd ul li"),
			len = hd.length,
			prev = this.children(".prev"),
			next = this.children(".next");
		
		//点击切换
		hd.click(function(){
			index = hd.index(this);
			slide(index);
		});
		prev.click(function(){
			index-=1;
			if(index<0){
				index = len-1;
			}
			slide(index);
		});
		next.click(function(){
			index+=1;
			if(index==len){
				index = 0;
			}
			slide(index);
		});
		//鼠标悬停
		this.hover(function(){
			stop_flag = true;
		},function(){
			stop_flag = false;
		});
		//监测滚动
		$(window).scroll(function(i){
			var s = $(document).scrollTop();
			if(s > 500){
				stop_flag = true;
			}
			else{
				stop_flag = false;
			}
		});
		
		window.setInterval(function(){
			if ( !stop_flag ){
				next.click();
			}
		},s);
		//计数器
		function num(){
			slide(index);
			index++;
			if(index==len){
				index = 0;
			}
		}
		//动画效果
		function slide(i){
			bd.eq(i).stop().animate({opacity:1},d).css("z-index","1").siblings("li").animate({opacity:0},d).css("z-index","0");
			hd.eq(i).addClass("on").siblings("li").removeClass("on");
		}
		return this;
	};
	
})(jQuery,window,document);
