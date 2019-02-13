/**
 * jquery 设置
 */

/**
 * Ajax 请求权限异常,401,404,500 
 */
$(document).ajaxComplete(
		function(evt, req, settings) {
			if (req && req.responseJSON) {
				var json = req.responseJSON;
				if(json.code==401){
					if(base){
						window.location.href=base;
					}else{
						window.location.href="/";
					}
				}
			}
		});

/**
 * miniui扩展
 */
(function() {
	tz = {
		contextPath : "/",

		trim : function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		},
		ltrim : function(str) {
			return str.replace(/(^\s*)/g, '');
		},
		rtrim : function(str) {
			return str.replace(/(\s*$)/g, '');
		},
		startWith : function(source, str) {
			var reg = new RegExp("^" + str);
			return reg.test(source);
		},
		endWith : function(source, str) {
			var reg = new RegExp(str + "$");
			return reg.test(source);
		},

		furl : function(url, para) {
			if (!tz.startWith(url, "http://") && !tz.startWith(url, "https://")) {
				if (tz.startWith(url, tz.contextPath)) {
					url = tz.startWith(url, "/") ? url : "/" + url;
				} else {
					url = tz.startWith(url, "/") ? tz.contextPath + url
							: tz.contextPath + "/" + url;
				}
			}

			if (!para) {
				return url;
			}
			if (url.indexOf('?') == -1) {
				url = url + "?";
			}
			for ( var k in para) {
				url += "&" + encodeURI(k) + "=" + encodeURI(para[k]);
			}
			return url;
		}
	};
	
	tz.load = function(form, url, data) {
		if (typeof form == "string") {
			form = new mini.Form(form);
		}
		mini.mask({
			el : document.body,
			cls : 'mini-mask-loading',
			html : '加载中...'
		});
		$.ajax({
			url : url,
			data : data,
			type : "post",
			dataType : "json",
			success : function(r) {
				if (r.success) {
					form.setData(r.data);
					if (typeof successFn == "function")
						successFn(r.data, r);
				} else {
					if (typeof failedFn == "function")
						failedFn(r);
				}
				mini.unmask();
			},
			error : function() {
				mini.unmask();
			}
		})

	}

	tz.submit = function(form, url, data, successFn, failedFn) {
		mini.mask({
			el : document.body,
			cls : 'mini-mask-loading',
			html : '提交中...'
		});
		if (typeof form == "string") {
			form = new mini.Form(form);
		}
		form.validate();
		if (!form.isValid()) {
			mini.unmask();
			var errorItem = form.getErrors();
			var errorMsg = [];
			for (var i = 0, l = errorItem.length; i < l; i++) {
				errorMsg.push(errorItem[i].label + errorItem[i].errorText);
			}

			return tz.alert(errorMsg.join("；"), "错误");
		}
		$.ajax({
			url : url,
			data : data,
			type : "post",
			dataType : "json",
			success : function(r) {
				tz.alert(r.msg, "提示", function() {
					if (r.success) {
						if (typeof successFn == "function") {
							successFn(r.data, r);
						}
					} else {
						if (typeof failedFn == "function") {
							failedFn(r);
						}

					}
				});
				mini.unmask();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				mini.unmask();
				if (textStatus == 500) {
					tz.alert(errorThrown)
				}
			}
		})
	}

	tz.alert = function(msg, title, callback) {
		mini.alert(msg, title, callback);
	}
})();