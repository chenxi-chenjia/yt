// 获取元素函数$
var classstr=function(classstr,classname){
	var str=classstr.split(" ")
	for (var i = 0; i < str.length; i++) {
		if (str[i]==classname) {
			return true;
		}
	}
			return false;
}
var getClass=function(classname,range){
	range=range?range:document;
	if(document.getElementsByClassName){
		return range.getElementsByClassName(classname);
	}else{
		var all = range.getElementsByTagName("*");
		var arr = [];
		for (var i = 0; i < all.length; i++) {
			if(classstr(all[i].className,classname)){
 				arr.push(all[i]);
			}
		};
		return arr;
	}
}
var $ =function(selecter,range){
	if(typeof selecter=="string"){
		range=range?range:document;
	// var str=selecter.trim();
	if(selecter.charAt(0)=="#"){
		return document.getElementById(selecter.substring(1));
	}else if(selecter.charAt(0)=="."){
		return getClass(selecter.substring(1),range);
	}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selecter)){
		return range.getElementsByTagName(selecter);
	}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(selecter)){
		return document.createElement(selecter.slice(1,-1));
	}
}else if(typeof selecter=="function"){
	window.onload=function(){
		selecter();
	}
}
}
// 获取元素样式函数
// obj 为对象名，arry为属性
function getstyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,null)[attr];
	}
}
// 选项卡函数
// 选项卡样式
// tab是触发标签，contro是控制标签
function tabcontrol(tab,control){
	for (var i = 0; i < tab.length; i++) {
		tab[i].hot=i;
		tab[i].onmouseover=function(){
			control[this.hot].style.display="block";
		}
		tab[i].onmouseout=function(){
			control[this.hot].style.display="none";
		}
	};
}
function rollfunction(l,center,imgs,bc,oc,cl,cr,time){
// 瞬时轮播 参数 
/*
参数：l；标签选项卡 center；轮播元素区域 imgs：轮播图片
bc：选项卡默认颜色 oc：选项卡鼠标移入颜色 
cl；左把手 cr；右把手 time；轮播时间
*/
// 轮播函数
imgs[0].style.display="block";
l[0].style.background=bc;
var now=0;
var roll=function(){
		now++;
		if(now==imgs.length){
			now=0;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.display="none";
			l[i].style.background=oc;
		}
		imgs[now].style.display="block";
		l[now].style.background=bc;
	}
	t=setInterval(roll,time)
// 鼠标移入下方小格子中的两方匹配
for (var i = 0; i < l.length; i++) {
		l[i].hot=i;
		l[i].onmouseover=function(){
			for (var i = 0; i < l.length; i++) {
			 		imgs[i].style.display="none";
			 		l[i].style.background=oc;
			};
			imgs[this.hot].style.display="block";
			l[this.hot].style.background=bc;
			now=this.hot;
		}
	};
var rollback=function(){
	now--;
	if(now<0){
		now=imgs.length-1;
	}
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].style.display="none";
		l[i].style.background=oc;
	}
	imgs[now].style.display="block";
	l[now].style.background=bc;
}
// 鼠标移入时停止轮播 center 为banner图中间盒子
 center.onmouseover=function(){
		clearInterval(t);
	}
	center.onmouseout=function(){
		t=setInterval(roll,3000);
	}
// 两边把手 cl为左边 cr为右边
cr.onclick=function(){
	roll();
}
cl.onclick=function(){
	rollback();
}
}
/*
 无缝滑动动画效果
 obj为父元素 
 now为当前位置
 判断标签falg（对函数是否运算完成进行判断）
*/	
function slide (obj){
	var imgs=$(".imgs",obj);
	var btnn=$("li",obj);
	var btnl=$(".btnl",obj)[0];
	var btnr=$(".btnr",obj)[0];
	var mw=getstyle(imgs[0],"width");
	var time=3000;
	var now=0;
	var flag=true;
	imgs[0].style.display="block";
	btnn[0].style.background="#b61b1f";
	// 滑动运动函数
	var slid=function(){
		if(flag){
			flag=false;
		if(now>=imgs.length){
			now=0;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.display="none";
			btnn[i].style.background="#3e3e3e";
		}
		var next=now+1;
		if (next>=imgs.length) {
			next=0;
		};
		imgs[now].style.display="block";
		btnn[next].style.background="#b61b1f";
		imgs[next].style.display="block";
		imgs[next].style.left=mw;
		animate(imgs[now],{left:-parseInt(mw)});
		animate(imgs[next],{left:0},function(){
			return flag=true;
		});
		return now=next;
	}else{
		return;
	}
	}	
	var t=setInterval(slid,time);
	// 鼠标移入下方小格子中的两方匹配
	for (var i = 0; i < btnn.length; i++) {
		btnn[i].hot=i;
		imgs[i].hot=i;
		btnn[i].onmouseover=function(){
			if (flag) {
				flag=false
			for (var i = 0; i < btnn.length; i++) {
			 	imgs[i].style.display="none";
			 	btnn[i].style.background="#3e3e3e";
			};
			btnn[this.hot].style.background="#b61b1f";
			imgs[this.hot].style.display="block";
			if (now>this.hot) {
				imgs[now].style.display="block";
				imgs[this.hot].style.left=-parseInt(mw)+"px";
				animate(imgs[now],{left:parseInt(mw)});
				animate(imgs[this.hot],{left:0},function(){
			return flag=true;});
			}else if(now<this.hot){
				imgs[now].style.display="block";
				imgs[this.hot].style.left=mw;
				animate(imgs[now],{left:-parseInt(mw)});
				animate(imgs[this.hot],{left:0},function(){
					return flag=true;
					});
			}else{
				flag=true;
				return;
			}
			now=this.hot;
			return now;
		}else{
			return;
		}
		}
	};
    var slideback=function(){
	if (flag) {
		flag=false;
		if(now<0){
			now=imgs.length-1;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.display="none";
			btnn[i].style.background="#3e3e3e";
		}
		var next=now-1;
		if (next<0) {
			next=imgs.length-1;
		};
		imgs[now].style.display="block";
		btnn[next].style.background="#b61b1f";
		imgs[next].style.display="block";
		imgs[next].style.left=-parseInt(mw)+"px";
		animate(imgs[now],{left:parseInt(mw)});
		animate(imgs[next],{left:0},function(){
			return flag=true;});
	return now=next;
	}else{
		return;
	}
	}
	// 鼠标移入时停止轮播 center 为banner图中间盒子
 	obj.onmouseover=function(){
		clearInterval(t);
		btnr.style.display="block";
		btnl.style.display="block";
	}
	obj.onmouseout=function(){
		t=setInterval(slid,time);
		btnr.style.display="none";
		btnl.style.display="none";
	}
	// 两边把手 btnl为左边 btnr为右边
	btnr.onclick=function(){
		if(flag){
			slid();
		}else{
			return;
		}
	}
	btnl.onclick=function(){
		if(flag){
			slideback();
		}else{
			return;
		}
	}
}
/*
获取obj中的有效节点
*/
var selectnodes=function (obj,falg){
	falg=falg==undefined?true:false;
	var chlids=obj.childNodes;
	var arr=[];
	if (falg) {
		for(i in chlids){
			if(chlids[i].nodeType==1){
				arr.push(chlids[i]);
			}
		}
	}else{
		for(i in chlids){
			if(chlids[i].nodeType==1||chlids[i].nodeType==3&&chlids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(chlids[i]);
			}
		}
	}
	return arr;
}
// 获取下一个有效节点
/*
add，添加元素 now当前元素 flag：true元素节点，false有效节点，默认true
*/
var nextnode=function (now,falg){
	falg=falg===undefined?true:falg;
	var next=now.nextSibling;
	if(next==null){
		return false;
	}else{
		if(falg){
			if (next.nodeType==1) {
				return next;
			}else{
				return nextnode(next,falg);
			}
		}else{
			if(next.nodeType==1||next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")){
				return next;
			}else{
				return nextnode(next,falg);
			}
		}
	}
}
// 在任意一个元素后边加元素
var addnext=function(add,now,falg){
	var parent=now.parentNode;
	if(nextnode(now,falg)==false){
		parent.appendChild(add);
	}else{
		parent.insertBefore(add,now);
	}
}
/*
节点轮播，num为每次转过的照片数
*/
function noderoll(obj,num){
	num=num===undefined?1:num;
	var flag=true;
	var center=$(".center",obj)[0];
	var mw=parseInt(getstyle($("img",center)[0],"width"))+parseInt(getstyle($("img",center)[0],"marginRight"))+"px";
var move=function(){
		if(flag){
			flag=false;
		    animate(center,{left:-parseInt(mw)*num},function(){
			var img=selectnodes(center)[0];
			center.appendChild(img);
			center.style.left=0;
			return flag=true;
		})}
	}
	var moveback=function(){
		if(flag){
			flag=false;
			var divf=selectnodes(center)[0];
			var divl=selectnodes(center)[selectnodes(center).length-1];
			center.style.left=-parseInt(mw)+"px";
			center.insertBefore(divl,divf);
			animate(center,{left:0},function(){
			center.style.left=0;
			return flag=true;
		})}
	}
	obj.onmouseover=function(){
		clearInterval(t);
	}
	obj.onmouseout=function(){
		t=setInterval(move,3000);
	}
	cr.onclick=function(){
	if(flag){
		move();
	}else{
		return;
	}
}
cl.onclick=function(){
	if(flag){
		moveback();
	}else{
		return;
	}
}
	t=setInterval(move,3000);
}
// 透明度轮播
function opacityroll (obj){
	// var center=$(".center",obj)[0];
	var imgs=$(".imgs",obj);
	var btnn=$("li",obj);
	var btnl=$(".btnl",obj)[0];
	var btnr=$(".btnr",obj)[0];
	var imgs2=$(".imgs2");
	var now=0;
	var flag=true;
	imgs[0].style.opacity=1;
	btnn[0].style.background="#b61b1f";
	imgs2[0].style.opacity=1;
	// 透明度函数
	var slide=function(){
		if(flag){
			flag=false;
		if(now>=imgs.length){
			now=0;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.opacity=0;
			imgs2[i].style.opacity=0;
			btnn[i].style.background="#3e3e3e";
		}
		var next=now+1;
		if (next>=imgs.length) {
			next=0;
		};
		imgs[now].style.opacity=1;
		imgs2[now].style.opacity=1;
		btnn[next].style.background="#b61b1f";
		animate(imgs[now],{opacity:0});
		animate(imgs2[now],{opacity:0});
		animate(imgs2[next],{opacity:1})
		animate(imgs[next],{opacity:1},function(){
			return flag=true;
		});
		return now=next;
	}else{
		return;
	}
	}	
	var t=setInterval(slide,3000);
	// 鼠标移入下方小格子中的两方匹配
	for (var i = 0; i < btnn.length; i++) {
		btnn[i].hot=i;
		imgs[i].hot=i;
		btnn[i].onmouseover=function(){
			if (flag) {
				flag=false
			for (var i = 0; i < btnn.length; i++) {
			 	imgs[i].style.opacity=0;
			 	imgs2[i].style.opacity=0;
			 	btnn[i].style.background="#3e3e3e";
			};
			imgs[now].style.opacity=1;
			imgs2[now].style.opacity=1;
			btnn[this.hot].style.background="#b61b1f";
			animate(imgs[now],{opacity:0});
			animate(imgs2[now],{opacity:0});
			animate(imgs2[this.hot],{opacity:1})
			animate(imgs[this.hot],{opacity:1},function(){
				return flag=true;});
			now=this.hot;
			return now;
		}else{
			return;
		}
		}
	};
    var slideback=function(){
	if (flag) {
		flag=false;
		if(now<0){
			now=imgs.length-1;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.opacity=0;
			imgs2[i].style.opacity=0;
			btnn[i].style.background="#3e3e3e";
		}
		var next=now-1;
		if (next<0) {
			next=imgs.length-1;
		};
		imgs[now].style.opacity=1;
		imgs2[now].style.opacity=1;
		btnn[next].style.background="#b61b1f";
		animate(imgs2[now],{opacity:0});
		animate(imgs[now],{opacity:0});
		animate(imgs2[next],{opacity:1})
		animate(imgs[next],{opacity:1},function(){
			return flag=true;});
	return now=next;
	}else{
		return;
	}
	}
	// 鼠标移入时停止轮播 obj 为banner图中间盒子
 	obj.onmouseover=function(){
		clearInterval(t);
		btnl.style.display="block";
		btnr.style.display="block";
	}
	obj.onmouseout=function(){
		t=setInterval(slide,3000);
		btnl.style.display="none";
		btnr.style.display="none";
	}
	// 两边把手 btnl为左边 btnr为右边
	btnr.onclick=function(){
		if(flag){
			slide();
		}else{
			return;
		}
	}
	btnl.onclick=function(){
		if(flag){
			slideback();
		}else{
			return;
		}
	}
}
// 楼层选项卡
function tabcontroled(control,tab){
	control[0].style.fontWeight="bold";
	control[0].style.borderBottomColor="#e5004f";
	tab[0].style.display="block";
	for (var i = 0; i < control.length; i++) {
		control[i].tab=i;
		control[i].onmouseover=function(){
			for (var j = 0; j < control.length; j++) {
			 	control[j].style.fontWeight="normal";
				control[j].style.borderBottomColor="#333";
				tab[j].style.display="none";
			};
			control[this.tab].style.fontWeight="bold";
			control[this.tab].style.borderBottomColor="#e5004f";
			tab[this.tab].style.display="block";
		};
	}
}
// 移动边框
function moveborder(tab){
	for (var i = 0; i < tab.length; i++) {
		tab[i].bk=i;
		tab[i].onmouseover=function(){
			var sbk=$(".sbk",tab[this.bk])[0];
			var xbk=$(".xbk",tab[this.bk])[0];
			var zbk=$(".zbk",tab[this.bk])[0];
			var ybk=$(".ybk",tab[this.bk])[0];
			var bw=tab[this.bk].offsetWidth;
			var bh=tab[this.bk].offsetHeight;
			animate(sbk,{width:bw},400);
			animate(zbk,{height:bh},400);
			animate(xbk,{width:bw},400);
			animate(ybk,{height:bh},400);
		}
		tab[i].onmouseout=function(){
			var sbk=$(".sbk",tab[this.bk])[0];
			var xbk=$(".xbk",tab[this.bk])[0];
			var zbk=$(".zbk",tab[this.bk])[0];
			var ybk=$(".ybk",tab[this.bk])[0];
			var bw=tab[this.bk].offsetWidth;
			var bh=tab[this.bk].offsetHeight;
			animate(sbk,{width:0},400);
			animate(zbk,{height:0},400);
			animate(xbk,{width:0},400);
			animate(ybk,{height:0},400);
		}
	};
}
// 商标轮播
function sbslide (obj){
	var imgs=$(".imgs",obj);
	var btnl=$(".btnl",obj.parentNode)[0];
	var btnr=$(".btnr",obj.parentNode)[0];
	var mw=getstyle(obj,"width");
	var time=3000;
	var now=0;
	var flag=true;
	imgs[0].style.display="block";
	// 滑动运动函数
	var slide=function(){
		if(flag){
			flag=false;
		if(now>=imgs.length){
			now=0;
		}
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].style.display="none";
		}
		var next=now+1;
		if (next>=imgs.length) {
			next=0;
		};
		imgs[now].style.display="block";
		imgs[next].style.display="block";
		imgs[next].style.left=mw;
		animate(imgs[now],{left:-parseInt(mw)});
		animate(imgs[next],{left:0},function(){
			return flag=true;
		});
		return now=next;
	}else{
		return;
	}
	}	
	var slideback=function(){
		if (flag) {
			flag=false;
			if(now<0){
				now=imgs.length-1;
			}
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].style.display="none";
			}
			var next=now-1;
			if (next<0) {
				next=imgs.length-1;
			};
			imgs[now].style.display="block";
			imgs[next].style.display="block";
			imgs[next].style.left=-parseInt(mw)+"px";
			animate(imgs[now],{left:parseInt(mw)});
			animate(imgs[next],{left:0},function(){
				return flag=true;});
		return now=next;
			}else{
				return;
			}
	}
	// 两边把手 btnl为左边 btnr为右边
	btnr.onclick=function(){
		if(flag){
			slide();

		}else{
			return;
		}
	}
	btnl.onclick=function(){
		if(flag){
			slideback();
		}else{
			return;
		}
	}
}
// 楼层跳转
function storeyskip(obj,click){
	var xiahua=$(".xiahua",click[0].parentNode);
	var flag=true;
	window.onscroll=function(){
		if (flag) {
			for (var i = 0; i < obj.length; i++) {
				var are=document.body.scrollTop?document.body:document.documentElement;
				var top=obj[i].offsetTop;
				if (1120<=(are.scrollTop+201)) {
					click[0].parentNode.style.display="block";
					if (top<=(are.scrollTop+201)) {
						for (var j = 0; j < click.length; j++) {
							xiahua[j].style.display="none";
						};
						xiahua[i].style.display="block";
					};
				}else if(1120>(are.scrollTop+201)){
					click[0].parentNode.style.display="none";
				}
			};
		};	
	}
	for (var i = 0; i < click.length-1; i++) {
		click[i].tz=i;
		click[i].onclick=function(){
			flag=false;
			var top=obj[this.tz].offsetTop;
			animate(document.body,{scrollTop:top-200},function(){
				flag=true;
			});
			animate(document.documentElement,{scrollTop:top-200},function(){
				flag=true;
			});
		}
		click[i].onmouseover=function(){
			xiahua[this.tz].style.display="block";
		}
		click[i].onmouseout=function(){
			xiahua[this.tz].style.display="none";
		}
		click[click.length-1].onclick=function(){
			animate(document.body,{scrollTop:0});
			animate(document.documentElement,{scrollTop:0});
		}
		click[click.length-1].onmouseover=function(){
			xiahua[click.length-1].style.display="block";
		}
		click[click.length-1].onmouseout=function(){
			xiahua[click.length-1].style.display="none";
		}
	};
}
// 动画
/*
  函数 colorAnimate (obj,attr,val,dur,fn,callback)
  obj   要处理的对象
  attr  要处理的属性  background   color
  val   最终颜色 rbg    #
  fn    动画的方式
  callback  变化完成之后要处理的内容
*/
/*
   动画函数 animate (obj,attrObj,dur,fun,callback)
   obj   要动画的对象
   attrobj   要动画的属性对象{width:xxxx,height:xxx,left:xxxx,top:xxxx,opacity:xxx}
   dur   持续时间
   fun   动画方式
   callback 变化完成之后要处理的内容
*/

//动画算法
/*
		 Linear：无缓动效果(匀速运动)；
			Quad：二次方的缓动；
			Cubic：三次方的缓动
			Quartic：四次方的缓动；
			Quintic：五次方的缓动；
			Sinusoidal：正弦曲线的缓动；
			Exponential：指数曲线的缓动；
			Circular：圆形曲线的缓动；
			Elastic：指数衰减的正弦曲线缓动；
			Back：超过范围的三次方缓动）；
			Bounce：指数衰减的反弹缓动。
			

			每个效果都分三个缓动方式（方法），分别是：
			easeIn：从0开始加速的运动；
			easeOut：减速到0的运动；
			easeInOut：前半段从0开始加速，后半段减速到0的运动。
			


			函数的四个参数分别代表：
				t--- current time（当前时间）；0 +=60   
				b--- beginning value（初始值）；100  
				c--- change in value（变化量）；500-100
				d---duration（持续时间）  5000
			Tween.Quad.easeInt()
	     	运算的结果就是当前的运动路程。
		   整理翻译:Code宝宝
		   翻译或解释不对的地方希望各位修正、批评。
		   50
    Tween.Linear     
	Tween.Quad.easeIn
*/
 Tween = {  
    Linear: function(t,b,c,d){ return c*t/d+b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c*(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
 }
 /*
   动画函数 animate (obj,attrObj,dur,fun,callback)
   obj   要动画的对象
   attrobj   要动画的属性对象{width:xxxx,height:xxx,left:xxxx,top:xxxx,opacity:xxx}
   dur   持续时间
   fun   动画方式
   callback 回调函数 
   */
  
   function animate (obj,attrObj,dur,fun,callback) {
	 clearInterval(obj.t);
	if(arguments.length==2){
	  dur=500;
	  fun=Tween.Linear;
	  callback=null;
	}
	if(arguments.length==3){
	  if(typeof dur=="number"){
	  dur=dur;
	  fun=Tween.Linear;
	  callback=null;
	  }
	  if(typeof dur=="function"){
	    if(dur.length>=4){ 
			  fun=dur;
			  callback=null;
			  dur=500;
		}else{  
			  fun=Tween.Linear;
			  callback=dur;
			  dur=500;
		}
	  
	  }
	}
	if(arguments.length==4){
	   if(typeof dur=="number"){
	     dur=dur;
		 if(fun.length>=4){
			  fun=fun;
			  callback=null;
			  
		}else{
	     	  callback=fun;
			  fun=Tween.Linear;
		   
		}
		 
	   }else{	  
				  callback=fun;
				  fun=dur;
				  dur=500
				 
			
	  }
	}
    var time=0;
	var start={};var change={};
    for (var i in attrObj) {
	 start[i]=setCss(obj,i);
	 change[i]=attrObj[i]-start[i];
    }

	obj.t=setInterval(function(){
	  if(time>=dur){
	   clearInterval(obj.t);
	   for (var i in attrObj) {
		 setCss(obj,i,attrObj[i]);
	   }
	   if(callback){
	     callback.call(obj);
	   }
	  }else{
	  for (var i in attrObj) {
	   setCss(obj,i,fun(time,start[i],change[i],dur));
	  }
	  time+=60
	  }
	},60)
  }




 function setCss (obj,attr,val) {
   if(obj.nodeType!==1){
     return;
   }

   //初始化参数
  var attr=attr.replace(/^\s*|\s*$/g,"");
     //获取值
   if(arguments.length==2){
       //位置和尺寸
      if(attr=="height"||attr=="width"||attr=="top"||attr=="left"||attr=="right"|| attr=="bottom"){
	var val=obj.currentStyle?parseInt(obj.currentStyle[attr]):parseInt(getComputedStyle(obj,null)[attr]);
		if(!val){
		 var str="offset"+attr.replace(attr.charAt(0),attr.charAt(0).toUpperCase());

		 val=obj[str];
		}
		return val;
	  }

	  
	   if(attr=="padding"||attr=="margin"||attr=="paddingTop"||attr=="paddingLeft"||attr=="paddingRight"||attr=="paddingBottom"||attr=="marginTop"||attr=="marginLeft"||attr=="marginRight"||attr=="marginBottom"){
	    var cc= parseInt(obj.currentStyle? ((obj.currentStyle[attr]==undefined||obj.currentStyle[attr]=="auto")?0:obj.currentStyle[attr]):(getComputedStyle(obj,null)[attr]==undefined?0:getComputedStyle(obj,null)[attr]));

	     return cc;
	   }
        //透明度
	  if(attr=="opacity"){
	    return obj.currentStyle?parseFloat(obj.currentStyle[attr]||1):parseFloat(getComputedStyle(obj,null)[attr]||1);
	  }
	  //颜色
	  if(attr=='color'||attr=="background"|| attr=="backgroundColor"||attr=='borderBottomColor'||attr== 'borderLeftColor'||    attr=='borderRightColor'||attr=='borderTopColor'){
		   var colors=obj.currentStyle?(obj.currentStyle[attr]||"#000000"):(getComputedStyle(obj,null)[attr]||"#000000");
		   //获取对象
		
		   return getColor(colors);
         
		}
		if(attr=="scrollTop"){
		   return obj.scrollTop;
		}

	  return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,null)[attr];


   }else if(arguments.length==3){
     switch (attr) {
     case "width":
	 case "height":
	 case "top":
	 case "left":
	 case "bottom":
	 case "right":
	 case "padding":
	 case "margin":
	 case "paddingLeft":
	 case "paddingRight":
	 obj.style[attr]=val+"px";
	 break;
     case "opacity":
	 obj.style[attr]=val;
	 obj.style.filter="alpha(opacity="+val*100+")"
	 break;
	 case "scrollTop":
	 obj.scrollTop=val;
	 break;
	 case 'color':
		case "background":
		case "backgroundColor":
		case 'borderBottomColor':
		case 'borderLeftColor':
		case 'borderRightColor':
		case 'borderTopColor':
		obj.style[attr]=val;
	 break;
	 default:
	 obj.style[attr]=val;
     }

   }
 }

 //颜色渐变动画
 //获得颜色
function getColor (color) {
  var str,r,g,b,arr;
  if(typeof color=="string"){
    //16 进制
    if(color.charAt(0)==="#"){
	  str=color.substring(1)
	  r=parseInt(str.substr(0,2),16);
	  g=parseInt(str.substr(2,2),16);
	  b=parseInt(str.substr(4,2),16);
	  arr=[r,g,b]
	  return arr;
	}else{
	  str=color.substring(4,color.length-1)
	  return str.split(",")
	}
  }
  if(color instanceof Array){
    return color;
  }
}

/*
  函数 colorAnimate (obj,attr,val,dur,fn,callback)
  obj   要处理的对象
  attr  要处理的属性  background   color
  val   最终颜色 rbg    #
  fn    动画的方式
  callback  变化完成之后要处理的内容
*/
function colorAnimate (obj,attr,val,dur,fn,callback) {
if(obj.time){
  clearInterval(obj.time);
}
 
  var fn=fn||Tween.Linear;
  var start=setCss(obj,attr);
  var end=getColor(val);
  var times=0,r,g,b;
 obj.time= setInterval(function  () {
	 if(times>=dur){
	   clearInterval(obj.time)
       obj.time=null;
		   if(callback){
	        callback()
	      }
		  
	 }else{
     r=fn(times,parseInt(start[0]),parseInt(end[0])-parseInt(start[0]),dur)
     g=fn(times,parseInt(start[1]),parseInt(end[1])-parseInt(start[1]),dur)
	 b=fn(times,parseInt(start[2]),parseInt(end[2])-parseInt(start[2]),dur)	
		
	 setCss(obj,attr,"rgb("+parseInt(r)+","+parseInt(g)+","+parseInt(b)+")")
      times+=60;
	   }
  },60)

}