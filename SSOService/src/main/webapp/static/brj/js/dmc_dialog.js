//
var js=document.scripts;
		var jsPath="";
		for(var i=js.length;i>0;i--){
		 if(js[i-1].src.indexOf("dmc_dialog.js")>-1){
		   jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
		 }
		};
if (frameElement&&frameElement.api){
		}else {
			//document.write("<link rel='stylesheet' type='text/css' href='"+jsPath+"/skins/iblue.css'  />");
			$.getScript(jsPath+"lhgdialog.js?skin=iblue",function(){
				$.getScript(jsPath+"lhgdialog.common.js");
			}); 
		};
		
var DmcDialog = function(props) {
	var self = this;

	var $cfg = {
		id : null,
		url : null,
//		width : 350,
		lock : true,
		resize: false,//改变窗口大小
		fixed:true,//开启静止定位，无最大化功能
		title : null,
		parent : null,
		_dialog : null
	};

	init();

	function init() {	
		//继承	
		$.extend($cfg, props);
		//initDialogProps();
	}

	function getId() {
		var id = "dmc_win_"+(new Date()).getTime() + (Math.random());
		id = id.replace(".","");
		return id;
	}
	var dArgs = null;
	function initDialogProps() {
		$cfg.id = $cfg.id ? $cfg.id : getId();
		$cfg.url = $cfg.url ? $cfg.url : "about:blank";
		//增加随机数
		$cfg.url = $cfg.url.indexOf("?") == -1 ? $cfg.url + "?_rnd=" + (new Date()).getTime() : $cfg.url + "&_rnd="+(new Date()).getTime();	
		dArgs = { 
			id: $cfg.id,
			content : "url:"+$cfg.url,
			title : $cfg.title,
			resize : $cfg.resize,
			lock : $cfg.lock,
			autoSize : false,
			data  : $cfg.argc,
			cover : true
		}; 
		if($cfg.height){
			dArgs["height"]=$cfg.height; 
		}
		if($cfg.width){
			dArgs["width"]=$cfg.width; 
		}
		if($cfg.close){
			dArgs["close"]=$cfg.close;
		}
		if (frameElement&&frameElement.api){
			dArgs["parent"] = frameElement.api;
		}
	}

	self.show = function(pars) {
		$.extend($cfg, pars);
		//设置参数		
		initDialogProps();
		if(frameElement&&frameElement.api) {//判断是否 iframe
			$cfg._dialog = frameElement.api.opener.$.dialog(dArgs);
		} else {
			$cfg._dialog = $.dialog(dArgs);
		};	
		$cfg._dialog.OkBtnClick = function(data){
			if($cfg.listeners && $cfg.listeners.onOkBtnClick) {
				$cfg.listeners.onOkBtnClick(data);
			}
		};
	};
	self.close = function(){
		$cfg._dialog.close();	
	};
};

function getDialog(){
	if (frameElement)
		return frameElement.api;
};

function getWindow(){ 
	if(frameElement&&typeof(frameElement.api) == "object") {
		return frameElement.api.opener;
	}else{
		return window;
	}
};

function getParentWindow(){
	if(frameElement&&typeof(frameElement.api) == "object") {
		return frameElement.api.parent;
	}else{
		return window;
	}
};

function getDialogArgc(){
	if(frameElement&&typeof(frameElement.api) == "object") {
		return frameElement.api.data;
	}
}

var $dl = getDialog();

var $win = getWindow();

var $pWin = getParentWindow();

var $argc = getDialogArgc();









