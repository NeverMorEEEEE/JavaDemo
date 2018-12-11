/**
 * Extminiui是在原有的miniui基础上做一层简单的封装
 * 
 * by yuanzp
 *
 * Date : 2016-05-15
 * 
 */
var M1 = M1 || {};
(function() {
	var ContextPath = "/hrss";
	/**
	 * 其实也可以在原有miniui基础在，自己扩展方法
	 */
	mini.ext = function() {
		alert("miniui--->ext");
	}
	M1.test = function() {
		alert("yuanzp");
	}

	tz = {
		test : function(e) {
			alert(e);
		},
		// ======================================miniui扩展方法区域=================================================//
		/**
		 * --->alert提示框方法
		 * e:提示信息
		 * 
		 */
		alert : function(message, title, callback) {
			if (tz.isBlank(message)) {
				tz.alertWarn("提示信息不能为空！");
				return false;
			}
			if (tz.isBlankFn(callback)) {
				return false;
			}
			//			var callback = function(action){
			//				
			//			};
			title = tz.isBlank(title) ? "提示" : title;
			mini.alert(message, title, function(action) {
				if (!tz.isUndefined(callback)) {
					callback(action);
				}
			});
		},
		/**
		 * --->alerCloset提示框方法
		 * message:提示信息
		 * title:标题
		 * 
		 */
		alertClose : function(message, title) {
			tz.alert(message,title,function(action){
				if (action == "ok") {
					tz.closeWindow("ok");
				}
			});
			
			
			/*if (tz.isBlank(message)) {
				tz.alertWarn("提示信息不能为空！");
				return false;
			}
			title = tz.isBlank(title) ? "提示" : title;
			mini.alert(message, title, function(action) {
				if (action == "ok") {
					tz.closeWindow("ok");
				}
			});*/
		},
		/**
		 * --->alertAutoOff提示框方法，三秒后自动关闭。$$$
		 * e:提示信息
		 * 
		 */
		alertAutoOff : function(message, title, callback) {
			var waitSeconds = 3;
			var alertId = tz.alert(message+"<br/><br/><font color='red'>"
					+ waitSeconds + "</font>秒后自动关闭...", title, callback);
			var interval = setInterval(function() {
				waitSeconds--;
				if (waitSeconds == 0) {
					clearInterval(interval);
					mini.hideMessageBox(alertId);
					if (!tz.isUndefined(callback)) {
						callback("ok");
					}
				} else {
					$(".mini-messagebox-content-text font").html(waitSeconds);
				}
			}, 1000);
		},
		/**
		 * --->showTips提示框方法$$$
		 * confirm(message)
		 * message:提示信息 <Y>
		 * 
		 */
		showTips : function(message,position) {
			message = tz.isBlank(message)?"保存成功!":message;
			position = tz.isBlank(position)?"center":position;
			var options = {
					 content: message,    
					 state: "info",      //default|success|info|warning|danger
					 x: "center",          //left|center|right
					 y: position,          //top|center|bottom
					 timeout: 2500     //自动消失间隔时间。默认2000（2秒）。
			};
			mini.showTips(options);
		},
		/**
		 * --->confirm提示框方法
		 * confirm(message,okFn,title)
		 * message:提示信息 <Y>
		 * okFn ：确定之后的回调函数 <N>
		 * title ：标题 <N>
		 * 
		 */
		confirm : function(message, okFn, cancelFn, title) {
			if (tz.isBlank(message) || !tz.isString(message)) {
				tz.alertWarn("提示信息无效！");
				return false;
			}
			if (tz.isBlankFn(okFn) || tz.isBlankFn(cancelFn)) {
				return false;
			}
			if (!tz.isUndefined(title) && !tz.isString(title)) {
				tz.alertWarn("标题必须为String格式！");
				return false;
			}
			title = tz.isBlank(title) ? "提示" : title;
			mini.confirm(message, title, function(data) {
				if (data == "ok") {
					if (!tz.isUndefined(okFn)) {
						okFn();
					}
					return true;
				} else {
					if (!tz.isUndefined(cancelFn)) {
						cancelFn();
					}
					return true;
				}
			});
		},
		/**
		 * --->增加grid底部工具条的导出功能按钮
		 * setExportButtons(e)
		 * e:grid的ID <Y>
		 */
		setExportButtons : function(e) {
			var _grid = mini.get(e);
			var _dom = $("#" + e);
			var _html = "<div id=\""+e+"_buttons\">"
					+ "<a class=\"mini-button\" iconCls=\"icon-excel\" plain=\"true\" tooltip = \"导出当前页\" onclick = \"gridCurrentExcleDownLoad('"
					+ e
					+ "')\"></a>"
					+ "<a class=\"mini-button\" iconCls=\"icon-excelAll\" plain=\"true\" tooltip = \"导出全部\" onclick = \"gridAllExcleDownLoad('"
					+ e + "')\"></a>" + "</div>";
			_dom.after(_html);
			_grid.setPagerButtons("#"+e+"_buttons");
		},
		/**
		 * --->grid请求列表
		 * gridLoad(grid,data,url)
		 * grid : 需要加载的grid <Y>
		 * data ：所需的参数(约定：不能够在表单里面直接赋值) <N>
		 * url ： 请求地址 <N>
		 * 
		 */
		/*gridLoad : function(grid, data, url) {
			if (tz.isBlank(grid) || !tz.isObj(grid)) {
				tz.alertWarn("grid无效！");
				return;
			}
			if (tz.isBlankObj(data)) {
				return;
			}
			data = tz.isUndefined(data) ? {} : data;
			if(tz.isUndefined(data)){
				data = {};
			}else if(!tz.isObj(data)){
				tz.alertWarn("data必须是Object！");
				return false;
			}

			if(tz.isUndefined(url)&&tz.isUndefined(grid.getUrl())){
				tz.alertWarn("Url不能为空！");
				return false;
			}else{
				if(!tz.isUndefined(url)){
					
				}
			}

			if (tz.isBlankStr(url)) {
				return false;
			}
			if (tz.isString(url)) {
				grid.setUrl(url);
			}
			if (tz.isBlank(grid.getUrl())) {
				tz.alertWarn("Url不能为空！");
				return false;
			}
			if (grid.getUrl().indexOf(ContextPath) == -1) {
				grid.setUrl(ContextPath + grid.getUrl());
			}
			grid.load(data, function(data_) {
				var dto = eval("(" + data_.text + ")");
				if (!dto.success && !tz.isUndefined(dto.success)) {
					tz.alert(dto.message);
					return;
				} else {
					if (tz.isBlank(dto.code)) {// code为空,直接跳提示语message
						tz.alert(dto.message);
					}
				}
			}, function() {
				tz..alert("fail");
			});
		},*/
		/**
		 *
		 * 
		 * */
		//TODO
		gridLoad : function(grid,data,successFn){
			if (tz.isBlank(grid) || !tz.isObj(grid)) {
				tz.alertWarn("grid无效！");
				return false;
			}
			if (tz.isBlankObj(data)) {
				return;
			}
			data = tz.isUndefined(data) ? {} : data;
			// 方法参数预判断
			if (tz.isBlankFn(successFn)) {
				return;
			}
			grid.load(data, function(data_) {
				var dto = eval("(" + data_.text + ")");
				/*if (!dto.success && !tz.isUndefined(dto.success)) {
					tz.alert(dto.message);
					return;
				} */
				if (dto.success == false) {
//					tz.alert(data_.message);
					if (dto.status == "timeOut") {// 登录超时(無效！因為shiro問題，無法攔截到ajax請求。(已解决 ‎2016‎年‎6‎月‎27‎日))
						/*tz.alert(dto.message,"",function(action){
							top.location.href = ContextPath
							+ "/LogonDialog.jsp";
						})*/
						top.location.href = ContextPath+ "/sessionNull.jsp";
					}else{
						tz.alert(dto.message);
					}
					return;
				}else {
					/*if (tz.isBlank(dto.code)) {// code为空,直接跳提示语message
						tz.alert(dto.message);
					}*/
				}
				
				if (!tz.isUndefined(successFn)) {
					successFn(data);
				}
			}, function() {
				tz.alert("fail");
			});
		},
		/**
		 * --->增加grid底部工具条的出按钮
		 * 
		 */
		setGridButtons : function(e) {
			// 自定义grid底部分页条按钮
		},
		/**
		 * --->整个tab页面产生遮罩
		 * openTabLoad()
		 * 
		 */
		openTabLoad : function(message) {
			try{
				message = tz.isString(message)?message:"执行中，请稍等...";
				var tabs = window.parent.mini.get("mainTabs");
				if(tz.isBlank(tabs)){
					tz.mask();//用于iframe页面遮罩
				}else{
					mini.mask({
						el : tabs.getTabBodyEl(tabs.getActiveTab()),
						cls : 'mini-mask-loading',
						html : message
					});
				}
			}catch(e){
				
			}
		},
		/**
		 * --->取消整个tab页面产生遮罩
		 * closeTabLoad()
		 * 
		 */
		closeTabLoad : function() {
			try{
				var tabs = window.parent.mini.get("mainTabs");
				if(tz.isBlank(tabs)){
					tz.unmask();
				}else{
					mini.unmask(tabs.getTabBodyEl(tabs.getActiveTab()));
				}
			}catch(e){
				
			}
		},
		/**
		 * --->弹窗打开一个新的页面
		 * open(obj,data)
		 * obj:基础配置参数 <Y>
		 * data：onload()方法所需参数 <N>
		 * (注：url地址不能为空，并且自动会组装ContextPath)
		 * 
		 */
		open : function(obj, data) {
			if (!tz.isObj(obj)) {
				tz.alertWarn("options无效！");
				return;
			}
			if (tz.isBlank(obj["url"])) {
				tz.alertWarn("url地址不能为空！");
				return;
			} else {
				if ((obj["url"]).indexOf(ContextPath) == -1) {
					obj["url"] = ContextPath + obj["url"];
				}
			}
			if (tz.isBlankObj(data)) {
				return;
			}
			data = tz.isUndefined(data) ? {} : data;
			var options = {
				url : "", //页面地址
				title : "标题", //标题
				iconCls : "", //标题图标//icon-ok//fa-pencil
				width : 835, //宽度
				height : 535, //高度
				allowResize : true, //允许尺寸调节
				allowDrag : true, //允许拖拽位置
				showCloseButton : true, //显示关闭按钮
				showMaxButton : true, //显示最大化按钮
				showModal : true, //显示遮罩
				loadOnRefresh : false, //true每次刷新都激发onload事件
				onload : function() {//弹出页面加载完成
					var iframe = this.getIFrameEl();
					//调用弹出页面方法进行初始化
					iframe.contentWindow.setData(data);

				},
				ondestroy : function(action) { //弹出页面关闭前
				//				    	alert(action);
					/*if (action == "ok") {       //如果点击“确定”
					    var iframe = this.getIFrameEl();
					    //获取选中、编辑的结果
					    var data = iframe.contentWindow.GetData();
					    data = mini.clone(data);    //必须。克隆数据。
					  
					}  */
				}
			};
			//参数匹配方法
			if (!tz.setOptions(obj, options)) {
				return;
			}

			mini.open(options);
		},
		setData : function(data) {
			setData(data);
		},
		/**
		 * --->ajax请求方法 
		 * ajax(url, data, successFn, json)
		 * url:请求地址  <Y>
		 * data:请求参数（json格式） <N>
		 * successFn：请求成功之后的回调函数 <N>
		 * obj：额外参数,方便以后扩展 <N>
		 * 
		 */
		ajax : function(url, data, successFn, obj) {
			data = tz.isBlank(data) ? {
				"date" : new Date().getTime()
			} : data;
			// 方法参数预判断
			if (tz.isBlankUrl(url) || tz.isBlankFn(successFn)) {
				return;
			}
			if (url.indexOf(ContextPath) == -1) {
				url = ContextPath + url;
			}
			if (tz.isBlankObj(obj)) {
				return;
			}
			obj = tz.isUndefined(obj) ? {} : obj;
			
			var options = {
					url : url,
					data : data,
					type : "post",
					dataType : "json",
					async : true,
					cache : true,
					timeout : 0,
					 contentType: "application/x-www-form-urlencoded",
					beforeSend : function() {
						tz.openTabLoad();
					},
					dataFilter:function(data ,type ){
//						alert("dataFilter");
						var data_ = eval('('+ data +')');
						tz.closeTabLoad();
						if (data_.success == false) {
//							tz.alert(data_.message);
							if (data_.status == "timeOut") {// 登录超时(無效！因為shiro問題，無法攔截到ajax請求。(已解决 ‎2016‎年‎6‎月‎27‎日))
								/*tz.alert(data_.message,"",function(action){
									top.location.href = ContextPath
									+ "/LogonDialog.jsp";
								})*/
								top.location.href = ContextPath+ "/sessionNull.jsp";
							}else{
								tz.alert(data_.message);
							}
							return;
						} else {
							if (tz.isBlank(data_.code)) {// code为空,直接跳提示语message
								if (tz.needClose()) {
									tz.alert(data_.message, "", function(action) {
										if (action == "ok") {
											tz.closeWindow("ok");
										}
									});
								} else {
									tz.alert(data_.message);
								}

							}
						}
						return data;
					},
					success : function(data) {
						if (!tz.isUndefined(successFn)) {
							successFn(data);
						}
					},
					error : function(e) {
						tz.closeTabLoad();
						/*if (!tz.isUndefined(errorFn)) {
							errorFn();
						}*/
						// window.location=ContextPath+"/sysmanager/logon/main_index";
					}
				};
			//参数匹配方法
			if (!tz.setOptions(obj, options)) {
				return;
			}
			$.ajax(options);
		},
		// ======================================miniui扩展方法区域=================================================//

		// ======================================基础工具方法区域=================================================//
		/**
		 * 判断对象是否为空
		 */
		isBlank : function(e) {
			if (e == null || e == "" || typeof (e) == "undefined") {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 判断是否是无效的url
		 */
		isBlankUrl : function(e) {
			if (e == null || e == "" || typeof (e) == "undefined") {
				tz.alertWarn("ajax.url can't be empty!");
				return true;
			}
		},
		/**
		 * 判断obj是否是Object
		 */
		isObj : function(obj) {
			if (typeof (obj) == "object") {
				return true;
			} else {
				return false;
			}
			/*var isjson = typeof (obj) == "object"
					&& Object.prototype.toString.call(obj).toLowerCase() == "[object object]"
					&& !obj.length;
			return !isjson;*/
			/*e = (e == null || e == "" || typeof (e) == "undefined") ? {
				"e" : new Date().getTime()
			} : e;
			return e;*/
		},
		/**
		 * 判断是否是空的object
		 */
		isBlankObj : function(e) {
			if (typeof e != 'object' && typeof (e) != "undefined") {
				tz.alertWarn("The object is not an effective object!");
				return true;
			} else {
				return false;
			}

		},
		/**
		 * 判断obj是否是Undefined
		 */
		isUndefined : function(obj) {
			if (typeof (obj) == "undefined") {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 判断obj是否是String
		 */
		isString : function(obj) {
			if (typeof (obj) == "string") {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 判断是否是空的function
		 */
		isBlankStr : function(e) {
			if (typeof e != 'string' && typeof (e) != "undefined") {
				tz.alertWarn("The object is not an effective string!");
				return true;
			} else {
				return false;
			}

		},
		/**
		 * 判断是否是空的function
		 */
		isBlankFn : function(e) {
			if (typeof e != 'function' && typeof (e) != "undefined") {
				tz.alertWarn("The callback is not an effective function!");
				// mini.alert("ajax.successFn is not a function!", "警告");
				return true;
			} else {
				return false;
				/*if (typeof e == 'function') {
					return false;
				}else{ 
					return true; 
				}*/

			}

		},
		/**
		 * 判断是否是function
		 */
		isFunction : function(e) {
			if (typeof e == 'function') {
				return true;
			} else {
				return false;
			}

		},
		/**
		 * alert提示警告信息 e：警告内容
		 */
		alertWarn : function(e) {
			mini.alert(e, "警告");
		},
		/**
		 * 产生遮罩
		 */
		mask : function(message) {
			message = tz.isString(message)?message:"加载中...";
			mini.mask({
				el : document.body,
				cls : 'mini-mask-loading',
				html : message
			});
		},
		/**
		 * 关闭遮罩
		 */
		unmask : function() {
			mini.unmask(document.body);
		},
		/**
		 * obj匹配options，会有相应的基础判断。
		 */
		setOptions : function(obj, options) {
			for ( var o in obj) {
				var flag = false;
				for ( var s in options) {
					if (o == s) {
						flag = true;
						if (typeof (obj[o]) != typeof (options[s])) {
							tz.alertWarn("参数\"" + s + "\"的类型\""
									+ typeof (obj[o]) + "\"无效！有效类型是："
									+ typeof (options[s]));
							return false;
						} else {
							options[s] = obj[o];
							break;
						}
					}
				}
				if (!flag) {
					tz.alertWarn("参数\"" + o + "\"属于无效参数！");
					return false;
				}
			}
			return true;
		},
		closeWindow : function(action) {
			if (window.CloseOwnerWindow) {
				window.CloseOwnerWindow(action);
			} else {
				window.close();
			}
		},
		getRequest : function() {
			var url = decodeURI(location.search); //获取url中"?"符后的字串 
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = unescape(strs[i]
							.split("=")[1]);
				}
			}
			return theRequest;
		},
		needClose : function() {
			if (tz.getRequest().nc == "false") {
				return false;
			} else {
				return true;
			}
		},
		urlAddParam : function(url,param){
			if (url.indexOf("?") == -1) {
	            url += "?" + param;
	        } else {
	            url += "&" + param;
	        }
			return url;
		}
	// ======================================基础工具方法区域=================================================//

	}
})()


tz = tz||{};

tz.show = function(id, option){
	var win = mini.get(id);
	if(!win){
		$("body").append('<div id="'+id+'" class="mini-window" bodyStyle="padding:0px;"></div>');
		mini.parse();
		win = mini.get(id);
	}
	win.set(option);
	win.showAtPos();
	return win;
}




