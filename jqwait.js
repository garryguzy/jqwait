/*
 * jqwait.js  
 *
 * version 0.1 test
 * 
 * by garry gu (garry.guzy@gmail.com)
 *
 * underscore-min.js needed for this plugin 
 *
 */

 /* for wait handle */

 /* define wait varibles */
var derectives=[];
var derectivechecklist=[];
var jqwaitid;
var jqwait_args;
var jqwait_available=true;
 /* end fo varibles defining */

 /* jqwait main function */
function jqwait_init(){
	$('body').append('<div id=\"popupwindow\" class="hidden"><\/div>');
	$('body').append('<div id=\"popupmask\" class="hidden"><\/div>');
}
function jqwait(args){
	if(jqwait_available){
		jqwait_available=false;
		if(!args.mask) args.mask='transparent';
		if(!args.type) args.type='icon';
		showmask(args.mask);
		preventhandle();
		jqwait_args=args;	
		jqwait_showpopup(args.type);
		if(args.start) args.start();
		jqwaitid=setInterval(jqwait_check,1000);
	}
}
function jqwait_check(){
	var newderectives=[];
	for (derective in derectives)	{
		if(_.include(derectivechecklist,derectives[derective])){
			if(jqwait_args.type=='text') popuptext({clear:false,text:derectives[derective]+'.........ok<br>'});
			continue;
		}
		else newderectives.push(derectives[derective]);
	}
	derectives=newderectives;
	if(_.isEmpty(derectives)){
		jqwait_close();
		jqwait_args.end();
	}
}
function jqwait_showpopup(type){
	$("div#popupwindow").empty();
	if(type=='icon'){
		$("div#popupwindow").append('<img src="i/progress.gif"></img>');
		$("div#popupwindow").css('width',32);
		$("div#popupwindow").css('height',32);
		$("div#popupwindow").css('border','none');
		$("div#popupwindow").css('background','transparent');
	}
	else if(type=='text'){
		$("div#popupwindow").css('border','1px solid #cccccc');
		$("div#popupwindow").css('width',200);
		$("div#popupwindow").css('height',100);
		$("div#popupwindow").css('background','white');
	}
	centerpopup();
	showpopup();
}
function jqwait_close(){
	clearInterval(jqwaitid);
	$("div#popupwindow").html('');
	closemask();
	closepopup();
	releasepreventhandle();
	jqwait_available=true;
}
/* end of jqwait */


/* for popup */
function getwindowsize(){
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	return {
		width: windowWidth,
		height: windowHeight
	}
}
function getpopupwindowsize(){
	var popupHeight = $("div#popupwindow").height();
	var popupWidth = $("div#popupwindow").width();
	return { width:popupWidth,height:popupHeight};
}

function showmask(mask){
	windowsize=getwindowsize();
	$("div#popupmask").height($('body').height());
	$("div#popupmask").width(windowsize.width);
	$("div#popupmask").css('background',mask);
	$("div#popupmask").show('fast');	
}
function showpopup(){
	$("div#popupwindow").show('fast');	
}
function preventhandle(){
	$(document).bind('keypress',function(event,ui){
		event.preventDefault();
	})
	$(document).bind('mousedown',function(event,ui){
		event.preventDefault();
	})
}
function releasepreventhandle(){
	$(document).unbind('keypress');
	$(document).unbind('mousedown');
}

function closepopup(){
	$("div#popupwindow").hide('fast');
}
function closemask(){
	$("div#popupmask").hide('fast');
}

function popuptext(args){//clear,
	if(args.clear==false){
		$("div#popupwindow").append(args.text);
	}
	if(args.clear==true){
		$("div#popupwindow").html('');
		$("div#popupwindow").append(args.text);
	}
}
function centerpopup(){
//request data for centering
	windowsize=getwindowsize();
	var popupHeight = $("#popupwindow").height();
	var popupWidth = $("#popupwindow").width();
	//centering
	$("div#popupwindow").css({
	"position": "absolute",
	"top": windowsize.height/2-popupHeight/2,
	"left": windowsize.width/2-popupWidth/2
	});
}
/* end for popup */