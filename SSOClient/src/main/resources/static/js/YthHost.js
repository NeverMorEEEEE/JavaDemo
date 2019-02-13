/**
 * 基于jquery，miniui cpii公共处理
 */
function _CpiGetContext (){
	if(WEB_APP){
		return WEB_APP;
	}else{
		var pathName=window.document.location.pathname;  
		return pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	}
}

var Cpii = Cpii||{};
Cpii.context = _CpiGetContext();

Cpii.requestAuth = function(url, passFn){
	$.ajax({
		url:url,
		success:function(){
			passFn();
		},
		error:function(jqXHR){
			if(jqXHR.status==403){
				Cpii.Authorize(jqXHR, url, passFn);
			}else if(jqXHR.status==401){
				Cpii.CPIReset(url, passFn);
			}else{
				try{mini.unmask();}catch(e){};
				tz.alert("CPII服务事项获取失败，请联系管理员！");
			}
		}
	});
}

Cpii.CPIReset = function(url, passFn){
	$.ajax({
		url:Cpii.context+"/CPIReset",
		type:"get",
		cache: false,
		dataType:"text",
		success: function (text,textStatus,jqXHR) {
			if(text || text=="true"){
				Cpii.requestAuth(url,passFn);
			}else{
				tz.alert("CPII远程服务连接失败！");
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			tz.alert(jqXHR.responseText);
		}
	});
}

Cpii.Authorize = function (jqXHR, url, passFn){
	var param = {
		contextPath:   jqXHR.getResponseHeader("CPI_CONTEXT_PATH"),
		domain:		   jqXHR.getResponseHeader("CPI_DOMAIN"),
		username:	   jqXHR.getResponseHeader("CPI_USERNAME"),
		password:	   jqXHR.getResponseHeader("CPI_PASSWORD"),
		needValidate:  jqXHR.getResponseHeader("CPI_NEED_VALIDATE"),
		domainName:    jqXHR.getResponseHeader("CPI_DOMAIN_TITLE")
	};
	mini.open({
		width:560,
		height:420,
		title:"帐号绑定",
		url:Cpii.context+"/business/cpii/cpii_authorize.jsp?"+$.param(param),
		onload:function(){
			var iframe = this.getIFrameEl();
       	 	iframe.contentWindow.SetData(param);
		},
		ondestroy:function(r){
			if(r=='ok'){
				passFn();
			}
		}
	});
}

var YTH = YTH||{};
(function(){
	window.name = "_TZYTH_WINDOW";
	
	// 一体化处理类型 
	YTH.TYPE = {
		"ACCEPT" : "accept", // 受理
		"PRETRIAL" : "pretrial", // 预审
		"PROCESS" : "process", // 过程处理
		"END" : "end", // 办结
		"VIEW" : "view", // 查看
		"BATCH" : "batch" // 批量业务
	};
	
	YTH.surl = function(url, param){
		if(!url){
			return "";
		}
		if(url.indexOf("http")==-1){
			return tz.furl(url,param);
		}
		
		if(url.indexOf("?")==-1){
			url +="?"; 
		}
	}
	
	YTH.load = function(iframe, url, param){
		mini.mask({
			el: document.body,
            cls: 'mini-mask-loading',
            html: '加载中...'
        });
		
		try{
			if(typeof iframe == "string"){
				iframe = document.getElementById(iframe);
			}
			
			if(url.indexOf("cpi")!=-1){
				if(url.indexOf("/cpi/unkown/node")!=-1){
					param = param||{};
					param.flow = param.aga002;
					param.node = param.azb065||"";
					param.id = param.bod001||"";
				}
				Cpii.requestAuth(YTH.surl(url,param), function(){
					request();
				});
			}else{
				request();
			}
		}catch(e){
			mini.unmask();
		}	
		
		function request(){
			$(iframe).attr("src", YTH.surl(url,param));
			
			if (iframe.attachEvent){ 
				iframe.attachEvent("onload", function(){ 
					setIframeHeight(iframe);
					mini.unmask();
				}); 
			} else { 
				iframe.onload = function(){ 
					setIframeHeight(iframe);
					mini.unmask();
				}; 
			} 
			
			function setIframeHeight(iframe) {
				if (iframe) {
					var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
					if (iframeWin.document.body) {
						iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
					}
				}
			};
		}
	}
})()
