$(function(){
	// 图片懒加载
	$("img.lazy").lazyload({effect: "fadeIn"});
	// a链接改变
	$("a").attr("href","javascript:;").attr("rel","noopener noreferrer").attr("target","_blank");
	// banner图
	function banner(){
		var slide=$(".banner .lunbo");
		$(".imgs",slide).eq(0).css("opacity",1);
		$("li",slide).eq(0).css("background","#b61b1f");
		$(".imgs2").eq(0).css("opacity",1);
		var flag=true;
		var now=0;
		function opmove(){
			if (flag) {
				var next=now+1;
				flag=false;
				if(next>=$(".imgs",slide).length){
					next=0
				}
				$(".imgs",slide).eq(now).animate({"opacity":0});
				$(".imgs2").eq(now).animate({"opacity":0});
				$("li",slide).eq(next).css("background","#b61b1f");
				$("li",slide).eq(now).css("background","#3e3e3e");
				$(".imgs2").eq(next).animate({"opacity":1});
				$(".imgs",slide).eq(next).animate({"opacity":1},function(){
					now=next;
					flag=true;
				});
			}else{
				return;
			};
		}
		function opmoveback(){
			if (flag) {
				var next=now-1;
				flag=false;
				if(next<0){
					next=$(".imgs",slide).length-1;
				}
				$(".imgs",slide).eq(now).animate({opacity:0});
				$(".imgs2").animate({opacity:0});
				$("li",slide).eq(next).css("background","#b61b1f");
				$("li",slide).eq(now).css("background","#3e3e3e");
				$(".imgs2").eq(next).animate({"opacity":1});
				$(".imgs",slide).eq(next).animate({"opacity":1},function(){
					now=next;
					flag=true;
				});
			}else{
				return;
			};
		}
		$("li",slide).each(function(index){
			var index=index;
			$(this).mouseover(function(){
				if(flag){
					flag=false;
					if(now!=index){
						$(this).css("background","#b61b1f");
						$("li",slide).eq(now).css("background","#3e3e3e");
						$(".imgs",slide).eq(now).animate({opacity:0});
						$(".imgs2").eq(now).animate({opacity:0});
						$(".imgs2").eq(index).animate({"opacity":1});
						$(".imgs",slide).eq(index).animate({"opacity":1},function(){
							now=index;
							flag=true;
						});
					}else{
						flag=true;
					}
				}
			})
		})
		var t=setInterval(opmove,3000);
		slide.hover(function(){
			clearInterval(t);
			$(".btnl",slide).css("display","block");
			$(".btnr",slide).css("display","block");
		},function(){
			t=setInterval(opmove,3000);
			$(".btnl",slide).css("display","none");
			$(".btnr",slide).css("display","none");
		})
		$(".btnl",slide).click(opmoveback);
		$(".btnr",slide).click(opmove);
	}
	banner();
	// 选项卡
	$(".hide").hover(function(){
		$(".h1",this).css("display","block");
	},function(){
		$(".h1",this).css("display","none");
	})
	// 楼层选项卡
	$(".fc .kuang").eq(0).css("display","block");
	$(".ft").eq(0).css("display","block");
	$(".fc").each(function(index){
		var index=index;
		$(this).mouseover(function(){
			$(".fc .kuang").css("display","none").eq(index).css("display","block");
			$(".ft").css("display","none").eq(index).css("display","block");
		})
	})
	$(".f2c .kuang").eq(0).css("display","block");
	$(".f2t").eq(0).css("display","block");
	$(".f2c").each(function(index){
		$(this).mouseover(function(){
			$(".f2c .kuang").css("display","none").eq(index).css("display","block");
			$(".f2t").css("display","none").eq(index).css("display","block");
		})
	})
	$(".ydbk").hover()
	// 楼层轮播
	function ff(obj){
		var flag=true;
		var now=0;
		obj.each(function(){
			var xx=this;
			var mw=$(".imgs",xx).width();
			$(".imgs",xx).css({"left":mw,"display":"block"}).first().css("left",0);
			$("li",xx).first().css("background","#b61b1f");
			function move(){
				if (flag) {
					var next=now+1;
					flag=false;
					if(next>=$(".imgs",xx).length){
						next=0;
					}
					$(".imgs",xx).eq(now).animate({"left":-mw});
					$("li",xx).eq(next).css("background","#b61b1f");
					$("li",xx).eq(now).css("background","#3e3e3e");
					$(".imgs",xx).eq(next).animate({"left":0},function(){
						$(".imgs",xx).eq(now).css("left",mw);
						now=next;
						flag=true;
					});
				}else{
					return;
				};
			}
			function moveback(){
				if (flag) {
					var next=now-1;
					flag=false;
					if(next<0){
						next=$(".imgs",xx).length-1;
					}
					$(".imgs",xx).eq(next).css("left",-mw);
					$("li",xx).eq(now).css("background","#3e3e3e");
					$("li",xx).eq(next).css("background","#b61b1f");
					$(".imgs",xx).eq(now).animate({"left":mw});
					$(".imgs",xx).eq(next).animate({"left":0},function(){
						now=next;
						flag=true;
					});
				}else{
					return;
				};
			}
			$("li",xx).each(function(index){
				var index=index;
				$(this).mouseover(function(){
					if(flag){
						flag=false;
						if(now!=index){
							$(this).css("background","#b61b1f");
							$("li",xx).eq(now).css("background","#3e3e3e");
							if(now>index){
								$(".imgs",xx).eq(index).css({"left":-mw});
								$(".imgs",xx).eq(now).animate({"left":mw});
								$(".imgs",xx).eq(index).animate({"left":0},function(){
									now=index;
									flag=true;
								});
							}else{
								$(".imgs",xx).eq(now).animate({"left":-mw});
								$(".imgs",xx).eq(index).animate({"left":0},function(){
									$(".imgs",xx).eq(now).css({"left":mw});
									now=index;
									flag=true;
								});
							}
						}else{
							flag=true;
						}
					}
				})
			})
			var t=setInterval(move,3000);
			$(xx).hover(function(){
				clearInterval(t);
				$(".btnl",xx).css("display","block");
				$(".btnr",xx).css("display","block");
			},function(){
				t=setInterval(move,3000);
				$(".btnl",xx).css("display","none");
				$(".btnr",xx).css("display","none");
			})
			$(".btnl",xx).click(moveback);
			$(".btnr",xx).click(move);
		})	
	}
	$(".wflb").each(function(){
		ff($(this));
	})
	// 商标轮播
	function sblb(obj){
		var flag=true;
		var now=0;
		obj.each(function(){
			var xx=this;
			var mw=$(".imgs",xx).width();
			$(".imgs",xx).css({"left":mw,"display":"block"}).first().css("left",0);
			function move(){
				if (flag) {
					var next=now+1;
					flag=false;
					if(next>=$(".imgs",xx).length){
						next=0;
					}
					$(".imgs",xx).eq(now).animate({"left":-mw});
					$(".imgs",xx).eq(next).animate({"left":0},function(){
						$(".imgs",xx).eq(now).css("left",mw);
						now=next;
						flag=true;
					});
				}else{
					return;
				};
			}
			function moveback(){
				if (flag) {
					var next=now-1;
					flag=false;
					if(next<0){
						next=$(".imgs",xx).length-1;
					}
					$(".imgs",xx).eq(next).css("left",-mw);
					$(".imgs",xx).eq(now).animate({"left":mw});
					$(".imgs",xx).eq(next).animate({"left":0},function(){
						now=next;
						flag=true;
					});
				}else{
					return;
				};
			}
			$(".btnl",xx).click(moveback);
			$(".btnr",xx).click(move);
		})	
	}
	$(".ad_left_bottom").each(function(){
		sblb($(this));
	})
	function jump(){
		var flag=true;
		$(window).scroll(function(){
			if($(window).scrollTop()>1200){
				$("#fixed").css({"display":"block"});
				if(flag){
					$("#fixed .click").css("display","block");
					$(".ad").each(function(index){
						if($(window).scrollTop()>$(this).offset().top-200){
							$(".xiahua").css("display","none");
							$(".xiahua").eq(index).css("display","block");
						}
					})
				}	
			}else{
				$("#fixed").css("display","none");
			}
		})
		$("#fixed .click").each(function(index){
			var index=index;
			$(this).click(function(){
				flag=false;
				$("body").animate({scrollTop:$(".ad").eq(index).offset().top-199+"px"},function(){
					flag=true;
				})
			})
		})
		$("#fixed .click").each(function(index){
			var index=index;
			$(this).hover(function(){
				$(".xiahua").eq(index).css("display","block");
			},function(){
				$(".xiahua").eq(index).css("display","none");
			})
		})
		$(".xiahua:last").click(function(){
			$("body").animate({scrollTop:"0px"})
		})
	}
	jump();
})