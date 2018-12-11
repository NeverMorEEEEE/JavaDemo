var WEB_APP ="/hrss"; //pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

// 导出当前页
function gridCurrentExcleDownLoad(gridId) {
	var grid = mini.get(gridId);
	var title_ = grid.title;
	var headers = "";
	var fields = "";
	var columns = grid.getBottomColumns();
	columns = columns.clone();
	for (var i = 0; i < columns.length; i++) {
		var column = columns[i];
		if (column.field) {
			var h = column.header;
			headers = headers + h + ","
			fields = fields + column.field + ","
		}
	}
	var title = title_ == "" ? "导出当前页" : title_;
	headers = headers.substring(0, headers.length - 1);
	fields = fields.substring(0, fields.length - 1);
	var excelFileName = title_ == "" ? "导出当前页" : title_;
	var param = {
		title : title,
		headers : headers,
		fields : fields,
		excelFileName : excelFileName
	};
	var data = null;
	data = grid.getData();
	if (data.length < 1) {
		alert("当前没有需要导出的数据！");
		return;
	}
	excleDownLoad(param, mini.encode(data), WEB_APP
					+ "/sysmanager/export/exportExcel");
}

// 导出当前页
/**
 * 解决之前的在IE下面第二次点击，<br/> 
 * 一直报错exportForm.remove()找不到这个方法的问题.<br/>
 * by yuanzp <br/>
 * 2016.5.12
 */
function excleDownLoad(param, data, url) {

	data = encodeURI(data) + " ";// 处理360 下载第二次请求会去掉最后一个字符
	/*
	 * if(url.indexOf("?")>0){ url = url+"&"+encodeParam(param); }else{ url =
	 * url+"?"+encodeParam(param); }
	 */
	var exportForm = document.getElementById("_exportForm");
	var hiddenField = document.getElementById("_dataList");
	if (!exportForm) {
		// exportForm.remove();
		exportForm = document.createElement("form");
		exportForm.setAttribute('id', "_exportForm");
		exportForm.setAttribute("method", "post");

		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", "_dataList");
		hiddenField.setAttribute("name", "dataList");

	}
	exportForm.setAttribute("action", url);
	hiddenField.setAttribute("value", data);
	exportForm.appendChild(hiddenField);
	encodeParamToForm(exportForm, param);
	document.body.appendChild(exportForm);
	exportForm.submit();
}

// 导出全部
function gridAllExcleDownLoad(gridId) {
	var grid = mini.get(gridId);
	var title_ = grid.title;
	var headers = "";
	var fields = "";
	var columns = grid.getBottomColumns();
	columns = columns.clone();
	for (var i = 0; i < columns.length; i++) {
		var column = columns[i];
		if (column.field) {
			var h = column.header;
			headers = headers + h + ","
			fields = fields + column.field + ","
		}
	}
	var title = title_ == "" ? "导出全部" : title_;
	headers = headers.substring(0, headers.length - 1);
	fields = fields.substring(0, fields.length - 1);
	var params = {
		pageSize : 2000,
		pageIndex : 0
		};
	
	var dataUrl = grid.getUrl();
	var excelFileName = title_ == "" ? "导出全部" : title_;
	var param = {
		title : title,
		headers : headers,
		fields : fields,
		dataUrl : dataUrl,
		excelFileName : excelFileName
	};
	excleAllDownLoad(param, params);
}

// 导出全部
function excleAllDownLoad(param, params) {
	var url = WEB_APP + "/sysmanager/export/exportExcelAll";
	var exportAllForm = document.getElementById("_exportAllForm");
	if (!exportAllForm) {
		exportAllForm = document.createElement("form");
		exportAllForm.setAttribute("id", "_exportAllForm");
		exportAllForm.setAttribute("method", "post");
	}
	encodeParamToForm(exportAllForm, param);
	encodeParamToForm(exportAllForm, params);
	exportAllForm.setAttribute("action", url);
	document.body.appendChild(exportAllForm);
	exportAllForm.submit();
}

var encodeParam = function(json, params) {
	var tmps = [];
	for (var key in json) {
		tmps.push(key + '=' + json[key]);
	}
	for (var key in params) {
		tmps.push(key + '=' + params[key]);
	}
	return tmps.join('&');
}

var encodeParamToForm = function(form, param) {
	if (!form) {
		return false;
	}
	for (var key in param) {
		if (!form[key]) {
			formAddHideInput(form, key, param[key]);
			continue;
		}
		form[key].value = param[key];
	}
}

var formAddHideInput = function(form, name, val) {
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("id", "_dataList");
	hiddenField.setAttribute("name", name);
	hiddenField.setAttribute("value", val);
	form.appendChild(hiddenField);
}
