/**
 * Edit by GoryWolf, LiuHongXin, ZhuHe on 2016-06-30.
 * For LiShui only.
 * Create one new SeasUtil object with given host.
 */
if (typeof JSON !== 'object') {JSON = {};}
(function () {'use strict';function f(n) {return n < 10 ? '0' + n : n;}
if (typeof Date.prototype.toJSON !== 'function') {Date.prototype.toJSON = function (key) {return isFinite(this.valueOf())? this.getUTCFullYear()+'-'+f(this.getUTCMonth() + 1) + '-' +f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON = function (key){return this.valueOf();};}
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent, meta = {'\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"' : '\\"','\\': '\\\\'},rep;
function quote(string) {escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function(a){var c = meta[a];return typeof c === 'string'? c: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key, holder) { var i,k,v,length,mind = gap,partial,value = holder[key];if (value && typeof value==='object' && typeof value.toJSON==='function') {value = value.toJSON(key);}if (typeof rep === 'function') {value = rep.call(holder, key, value);}switch (typeof value) { case 'string':return quote(value);case 'number': return isFinite(value) ? String(value) : 'null';case 'boolean':case 'null':return String(value);case 'object': if (!value){return 'null';}gap += indent;partial = [];if (Object.prototype.toString.apply(value) === '[object Array]') {length = value.length;for (i = 0; i < length; i += 1) {partial[i] = str(i, value) || 'null';}v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';gap = mind;return v;}if (rep && typeof rep === 'object') {length=rep.length;for (i=0; i<length;i+=1){if (typeof rep[i] === 'string') {k = rep[i];v = str(k, value);if(v){partial.push(quote(k) + (gap ? ': ' : ':') + v);}}}}else{for(k in value){if (Object.prototype.hasOwnProperty.call(value, k)){v = str(k, value);if(v){partial.push(quote(k) + (gap ? ': ' : ':') + v);}}}}v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';gap = mind;return v;}}
if (typeof JSON.stringify !== 'function') {JSON.stringify = function (value, replacer, space) { var i;gap = '';indent = '';if (typeof space === 'number') {for (i = 0; i < space; i += 1) {indent += ' ';}}else if (typeof space === 'string') {indent = space;}rep = replacer;if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {throw new Error('JSON.stringify');} return str('', {'': value});};}
if (typeof JSON.parse !== 'function') {JSON.parse = function (text, reviver) { var j;function walk(holder, key) {var k, v, value = holder[key];if (value && typeof value === 'object') {for (k in value) {if (Object.prototype.hasOwnProperty.call(value, k)) {v = walk(value, k);if (v !== undefined) {value[k] = v;}else{delete value[k];}}}}return reviver.call(holder, key, value);}text = String(text);cx.lastIndex = 0; if (cx.test(text)) {text = text.replace(cx, function (a) {return '\\u' +('0000' + a.charCodeAt(0).toString(16)).slice(-4);});}if (/^[\],:{}\s]*$/ .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {j = eval('(' + text + ')');return typeof reviver === 'function' ? walk({'': j}, ''): j; } throw new SyntaxError('JSON.parse');};}
}());

function SeasUtil(seasHost) {
	// servlet default settings
	this.indexServlet = "/index.jsp";
	this.stateServlet = "/cloginserver?cmd=state";
	this.loginServlet = "/cloginserver?userName=$userAccount&password=$userPwd&serverId=$serverId";
	this.logoutServlet = "/reLoginAction.do";
	this.queryServlet = "/method/cSeasSearchAction.do?typeId=$docTypeId&condition=$condition&forward=objectsxml";
	this.queryXmlServlet = "/method/explore.do?cmd=searchObjects&objectid=$docTypeId&filter=$condition&showBlob=true&forward=objectsxml";
	this.inputServlet = "/method/newrecord.do?ns_mod=$modId&operation=nsi_$docTypeId&objectid=$objectId&refreshurl=$refreshUrl";
	this.deleteServlet = "/method/delete.do?ns_mod=$modId&operation=delete&objectid=$objectId";
	this.modifyServlet = "/method/modifyinput.do?ns_mod=$modId&operation=modifyinput&objectid=$objectId&refreshurl=$refreshUrl";
	this.moduleServlet = "/method/explore.do?cmd=getModules&moduleid=$modId&objectid=$objectId";
	this.queryChildrenServlet = "/method/explore.do?cmd=getChildren&objectid=$objectId&root=$root";
	this.queryIndexServlet = "/method/searchindex.do?keyword=$keyword&objectid=$objectid&type=$type&flag=$flag";
	this.queryIndexXmlServlet = "/method/explore.do?cmd=indexSearchObjects&showblob=true&keyword=$keyword&objectid=$objectid&type=$type&flag=$flag&forward=objectsxml";

	// if you should like to use XmlHttp otherwise SeasWeb, set this parameter
	// to 'false'.
	this.useSeasWeb = true;

	// host & serverId infomation
	if (seasHost)
		this.seasHost = SEASTRANSADDRESSGetAccessAdd(seasHost);
	else {
		// use default
		this.seasHost = "http://" + window.location.host + "/seas";
	}

	this.serverId = "default";
	this.sessionId = "";
	this.userAccount = "";
	this.userPwd = "";
	this.appPath = "";

	this.getServlets();

	this.checkState();
};

/*
 * Description: login seas with given user & pwd. Parameters: userAccount:
 * userPwd: Return: true/false->success/error
 */
SeasUtil.prototype.login = function(userAccount, userPwd) {
	if (this.checkState())
		this.logout();

	var params = [ "$userAccount", userAccount, "$userPwd", userPwd,
			"$serverId", this.serverId ];
	var seasUri = this.populateUri(this.loginServlet, params);
	var res = this.sendRequest(seasUri);

	if (res) {
		this.loginOk = res.getResponseHeader("ns_state") == "0";
		if (this.loginOk) {
			this.sessionId = res.responseText;
			this.userAccount = userAccount;
			this.userPwd = userPwd;
		}
	} else
		this.loginOk = false;

	return this.loginOk;
};

/*
 * Description: get visual url when business in bank. Parameters: SEASTRANSADDRESSGetAccessAddIn: normal url for SI net
 * Return: string of seas access url. exp: http://x.x.x.x:x/seas
 */
function SEASTRANSADDRESSGetAccessAdd(SEASTRANSADDRESSGetAccessAddIn){
	var SEASTRANSADDRESSRTNFso, SEASTRANSADDRESSRTNTf;
	var SEASTRANSADDRESSRTNForReading=1;
	var SEASTRANSADDRESSGetAccessAddRtn=SEASTRANSADDRESSGetAccessAddIn;
	var SeasAddressConfigFile="c://SeasAddressConfig.txt";
	try {
		SEASTRANSADDRESSRTNFso = new ActiveXObject("Scripting.FileSystemObject");
		if(SEASTRANSADDRESSRTNFso.FileExists(SeasAddressConfigFile)){
			SEASTRANSADDRESSRTNTf = SEASTRANSADDRESSRTNFso.OpenTextFile(SeasAddressConfigFile, SEASTRANSADDRESSRTNForReading);
			SEASTRANSADDRESSGetAccessAddRtn=SEASTRANSADDRESSRTNTf.ReadLine();
			SEASTRANSADDRESSRTNTf.Close();
		}
	}catch(e){}
	return SEASTRANSADDRESSGetAccessAddRtn;
};

/*
 * Description: make current user logout.
 */
SeasUtil.prototype.logout = function() {
	var seasUri = this.populateUri(this.logoutServlet);
	// alert(seasUri);
	res = this.sendRequest(seasUri);
	if (res) {
		if (res.status == 200) {
			this.loginOk = false;
			return true;
		}
	}
	return false;
};

/*
 * Description: open seas page in current window.
 */
SeasUtil.prototype.openpage = function(seasUri, userAccount, userPwd) {
	var sUri;
	if (seasUri)
		sUri = this.populateUri(seasUri);
	else
		sUri = this.populateUri(this.indexServlet);

	if (userAccount && userPwd) {
		var oForm = document.createElement("<form action='" + sUri
				+ "' method='post'>");
		var oAccount = document
				.createElement("<input name='userName' type='hidden' value='"
						+ userAccount + "'>");
		var oPwd = document
				.createElement("<input name='password' type='hidden' value='"
						+ userPwd + "'>");
		var oServer = document
				.createElement("<input name='serverId' type='hidden' value='"
						+ this.serverId + "'>");

		oForm.appendChild(oAccount);
		oForm.appendChild(oPwd);
		oForm.appendChild(oServer);
		document.body.appendChild(oForm);

		oForm.submit();
	} else {
		if (!this.loginOk)
			throw new Error("You should login first, please.");
		// window.location.replace(sUri);
		window.showModalDialog(sUri, window,
				"dialogWidth=4000px;dialogHeight=4000px");
	}
};

SeasUtil.prototype.postpage = function(seasUri, params) {
	var sUri;
	if (seasUri)
		sUri = this.populateUri(seasUri);
	else
		sUri = this.populateUri(this.indexServlet);

	var oForm = document.createElement("<form name='n123' id='n123' action='"
			+ sUri + "' method='post'>");
	var oItem;
	if (params) {
		for (var i = 1; i < params.length; i += 2) {
			oItem = document.createElement("<input name='" + params[i - 1]
					+ "' type='hidden'>");
			oItem.value = params[i];
			oForm.appendChild(oItem);
		}
	}
	document.body.appendChild(oForm);
	oForm.submit();
};

/*
 * query document from seas. Parameters: docTypeId: document type id, you can
 * get it after create document library; condition: query condition,
 */
SeasUtil.prototype.query = function(docTypeId, condition, showResult) {
	if (!this.loginOk)
		throw new Error("You should login first, please.");

	var params;
	var seasUri;
	var res;

	if (showResult) {
		params = [ "$docTypeId", docTypeId, "$condition", condition ];
		seasUri = this.populateUri(this.queryServlet, params);
		this.openpage(seasUri);
	} else {
		params = [ "$docTypeId", docTypeId, "$condition", condition ];
		seasUri = this.populateUri(this.queryXmlServlet, params);
		// alert(seasUri);
		res = this.sendRequest(seasUri);
		if (res) {
			if (res.status == 200) {
				var resText = "" + res.responseText;
				var objXML = new ActiveXObject('MSXML2.DOMDocument.4.0');
				objXML.loadXML(resText);
				// alert(resText);
				return objXML;
			}
		}
	}

	return null;
};

/*
 * queryIndex document from seas. Parameters: objectId: the objectid of the
 * library. keyword: query keyword,
 */
SeasUtil.prototype.queryIndex = function(objectid, keyword, showResult) {
	if (!this.loginOk)
		throw new Error("You should login first, please.");

	var params;
	var seasUri;
	var res;

	if (showResult) {
		params = [ "$objectid", objectid, "$keyword", keyword, "$type", "0",
				"$flag", "first" ];
		seasUri = this.populateUri(this.queryIndexServlet, params);
		// alert(seasUri);
		this.openpage(seasUri);
	} else {
		params = [ "$objectid", objectid, "$keyword", keyword, "$type", "0",
				"$flag", "first" ];
		seasUri = this.populateUri(this.queryIndexXmlServlet, params);
		// alert(seasUri);
		res = this.sendRequest(seasUri);
		if (res) {
			if (res.status == 200) {
				var resText = "" + res.responseText;
				var objXML = new ActiveXObject('MSXML2.DOMDocument.4.0');
				objXML.loadXML(resText);
				// alert(resText);
				return objXML;
			}
		}
	}

	return null;
};

/*
 * get module instance id from seas. Parameters: modId: modId type id objectId:
 * objectId
 */
SeasUtil.prototype.getModInstId = function(modId, objectId) {
	var params = [ "$modId", modId, "$objectId", objectId ];
	var sUri = this.populateUri(this.moduleServlet, params);
	var result = this.sendRequest(sUri);
	var resText = "" + result.responseText;
	var objXML = new ActiveXObject('MSXML2.DOMDocument.4.0');
	objXML.loadXML(resText);
	var parseDoc = objXML.XMLDocument;
	var root = objXML.documentElement;
	var moduleList = root.getElementsByTagName("module");
	var moduleid = moduleList.item(0).getAttribute("inst");
	return moduleid;
}

/*
 * open seas input page. Parameters: docTypeId: document type id, you can get it
 * after create document library; objectId: objectId
 */
SeasUtil.prototype.input = function(seasUri, docTypeId, objectId) {

	var params;
	var modId = this.getModInstId(2117, objectId);
	if (seasUri)
		params = [ "$modId", modId, "$docTypeId", docTypeId, "$objectId",
				objectId, "$refreshUrl", seasUri ];
	else
		params = [ "$modId", modId, "$docTypeId", docTypeId, "$objectId",
				objectId ];
	var sUri = this.populateUri(this.inputServlet, params);
	var oForm = document.createElement("<form action='" + sUri
			+ "' method='post'>");
	document.body.appendChild(oForm);
	oForm.submit();
}

/*
 * open seas modifyinput page. Parameters: objectId: objectId
 */
SeasUtil.prototype.modify = function(seasUri, objectId) {
	var params;
	var modId = this.getModInstId(2119, objectId);
	if (seasUri)
		params = [ "$modId", modId, "$objectId", objectId, "$refreshUrl",
				seasUri ];
	else
		params = [ "$modId", modId, "$objectId", objectId ];
	var sUri = this.populateUri(this.modifyServlet, params);
	var oForm = document.createElement("<form action='" + sUri
			+ "' method='post'>");
	document.body.appendChild(oForm);
	oForm.submit();
}

/*
 * execute seas delete function. Parameters: objectId: objectId
 */
SeasUtil.prototype.deleteoperation = function(objectId) {
	var modId = this.getModInstId(2104, objectId);
	var params = [ "$modId", modId, "$objectId", objectId ];
	var sUri = this.populateUri(this.deleteServlet, params);
	var result = this.sendRequest(sUri);
}

/*
 * get the children info form seas. Parameters: objectId: objectId
 */
SeasUtil.prototype.getChildren = function(objectId, root) {
	var params;
	if (root)
		params = [ "$objectId", objectId, "$root", root ];
	else
		params = [ "$objectId", objectId ];
	var sUri = this.populateUri(this.queryChildrenServlet, params);
	var result = this.sendRequest(sUri);
	var resText = "" + result.responseText;
	var objXML = new ActiveXObject('MSXML2.DOMDocument.4.0');
	objXML.loadXML(resText);
	return objXML;
}

/*
 * Description: view the document content. Note: the SeasBrowser must be
 * installed. prameters: objectId ->objectId or objectId array objectName
 * ->[optional] object title displayed on viewer's navigator tree. objectFilter
 * ->[optional] filter for children objects
 */
SeasUtil.prototype.view = function(objectId, objectName, objectFilter) {
	var param = "";

	if (objectName)
		param += "\"-objectName=" + objectName + "\"";
	if (objectFilter)
		param += " \"-objectFilter=" + objectFilter + "\"";

	return this.callSeasShell("view", objectId, param);
};

/*
 * Description: view the document content embed IE. Note: the SeasBrowser must
 * be installed. prameters: objectId ->objectId or objectId array objectName
 * ->[optional] object title displayed on viewer's navigator tree. objectFilter
 * ->[optional] filter for children objects htmlobjId ->[optional] object id for
 * SeasBrowser control in html style ->[optional] style for SeasBrowser control
 * closeAction ->[optional] close SeasBrowser control of action
 */
SeasUtil.prototype.view2 = function(objectId, objectName, objectFilter,
		htmlobjId, style, closeAction) {

	if (htmlobjId == undefined || htmlobjId == "")
		htmlobjId = "SeasFormView";

	var i = this.seasHost.lastIndexOf("/");
	var param = "";
	if (objectName)
		param += "\\\"-objectName=" + objectName + "\\\"";
	if (objectFilter)
		param += " \\\"-objectFilter=" + objectFilter + "\\\"";

	var sCmd = "view";
	sCmd += " -host=" + this.seasHost.substring(0, i);
	sCmd += " -webapp=" + this.seasHost.substring(i);
	sCmd += " -server=" + this.serverId;
	sCmd += " -session=" + this.sessionId;
	sCmd += " -apppath=" + this.appPath;

	if (param)
		sCmd += " " + param;

	if (typeof (objectId) == "object") {
		for (i = 0; i < objectId.length; i++) {
			sCmd += " &" + objectId[i] + ".";
		}
	} else {
		sCmd += " &" + objectId + ".";
	}
	var html = "<OBJECT ID = \""
			+ htmlobjId
			+ "\" style=\""
			+ style
			+ "\" classid=\"clsid:1942AC1E-B297-4156-8C10-7AF9388BAF70\"></OBJECT>";
	html += "<script language=\"javascript\">";
	html += htmlobjId + ".DoCmd(\"" + sCmd + "\");";
	html += "</script> "
	html += "<script language=\"javascript\" for=\"" + htmlobjId
			+ "\" event=\"ReturnButtonClick()\">";
	html += closeAction;
	html += "</script>"

	// alert(html);
	document.write(html);
};

/*
 * Description: download file to appoint path. Note: the SeasBrowser must be
 * installed. prameters: objectId ->objectId or objectId array path ->appoint
 * full path
 */
SeasUtil.prototype.downloadFile = function(objectId, path) {
	if (!this.loginOk)
		throw new Error("You should login first, please.");

	var modId = this.getModInstId(2139, objectId);

	var downTool;
	try {
		downTool = new ActiveXObject("SeasShell.clsTools");
	} catch (e) {
		alert("No browser installed.");
		return false;
	}

	var i = this.seasHost.lastIndexOf("/");
	var sCmd, sFile, oFilePro;
	sCmd = "downloadFile";
	sCmd += " -host=" + this.seasHost.substring(0, i);
	sCmd += " -webapp=" + this.seasHost.substring(i);
	sCmd += " -server=" + this.serverId;
	sCmd += " -session=" + this.sessionId;
	sCmd += " -apppath=" + this.appPath;
	sFile = "&" + objectId + "." + modId;
	var result = downTool.DownloadFileFromSeas(sCmd, sFile, path, oFilePro, 0);
	if (result != 1) {
		return false;
	}
	return true;
}

/*
 * Description: download the document. Note: the SeasBrowser must be installed.
 */
SeasUtil.prototype.save = function(objectId) {
	return this.callSeasShell("save", objectId);
};

/*
 * Description: print the document. Note: the SeasBrowser must be installed.
 */
SeasUtil.prototype.print = function(objectId) {
	return this.callSeasShell("print", objectId);
};

/*
 * Not implemented!
 */
SeasUtil.prototype.update = function(objectId) {
	return this.callSeasShell("update", objectId);
};

/*
 * upload blob file
 */
SeasUtil.prototype.upload = function(parentObjectId) {
	return this.callSeasShell("upload2", parentObjectId);
}

/*
 * get login state of current session
 */
SeasUtil.prototype.checkState = function() {
	var seasUri = this.populateUri(this.stateServlet);
	var res = this.sendRequest(seasUri);

	if (res) {
		this.loginOk = res.getResponseHeader("ns_state") == "0";
		if (this.loginOk) {
			this.serverId = res.getResponseHeader("ns_serverId");
			this.sessionId = res.getResponseHeader("ns_sessionId");
			this.userAccount = res.getResponseHeader("ns_userAccount");
			// alert(this.serverId+","+this.sessionId+","+this.userAccount);
		}
	}

	return this.loginOk;
}

/**
 * 
 */
SeasUtil.prototype.getServlets = function() {
	var seasUri = this.seasHost + "/seasdeamon?servlet";
	var res = this.sendRequest(seasUri);

	if (res) {
		var resText = res.responseText;
		// alert(resText);
		var servlets = resText.split("\r\n");

		for (i = 0; i < servlets.length; i++) {
			if (servlets[i].length > 0 && servlets[i].indexOf("=") >= 0) {
				var key = servlets[i].substring(0, servlets[i].indexOf("="));
				var uri = servlets[i].substring(servlets[i].indexOf("=") + 1);
				// alert(key + ":" + uri);

				if (key == "indexServlet")
					this.indexServlet = uri;

				if (key == "stateServlet")
					this.stateServlet = uri;

				if (key == "loginServlet")
					this.loginServlet = uri;

				if (key == "logoutServlet")
					this.logoutServlet = uri;

				if (key == "queryServlet")
					this.queryServlet = uri;

				if (key == "queryXmlServlet")
					this.queryXmlServlet = uri;

				if (key == "inputServlet")
					this.inputServlet = uri;

				if (key == "deleteServlet")
					this.deleteServlet = uri;

				if (key == "modifyServlet")
					this.modifyServlet = uri;

				if (key == "moduleServlet")
					this.moduleServlet = uri;

				if (key == "queryChildrenServlet")
					this.queryChildrenServlet = uri;

				if (key == "appPath")
					this.appPath = uri;

				if (key == "queryIndexServlet")
					this.queryIndexServlet = uri;

				if (key == "queryIndexXmlServlet")
					this.queryIndexXmlServlet = uri;
			}
		}
	}

}

// /////////////////////////////////////////////////////////////////
// common utility,maybe changed
// /////////////////////////////////////////////////////////////////

SeasUtil.prototype.callSeasShell = function(sCmd, objectId, param) {
	if (!this.loginOk)
		throw new Error("You should login first, please.");

	var i = this.seasHost.lastIndexOf("/");
	var sh;
	try {
		sh = new ActiveXObject("SeasShell.clsShell");
	} catch (e) {
		alert("No browser installed.");
		return false;
	}

	sCmd += " -host=" + this.seasHost.substring(0, i);
	sCmd += " -webapp=" + this.seasHost.substring(i);
	sCmd += " -server=" + this.serverId;
	sCmd += " -session=" + this.sessionId;
	sCmd += " -apppath=" + this.appPath;

	if (param)
		sCmd += " " + param;

	if (typeof (objectId) == "object") {
		// objectId is array.
		for (i = 0; i < objectId.length; i++) {
			sCmd += " &" + objectId[i] + ".";
		}
	} else
		sCmd += " &" + objectId + ".";

	// alert(sCmd);
	var ret = sh.Execute("seasshell.exe", "", sCmd, 1);
	if (ret < 32) {
		alert("Error to open file");
		return false;
	} else
		return true;
};

SeasUtil.prototype.encodeValue = function(str) {
	if (typeof (str) == "string") {
		var ret = str.replace(/%/g, "%25");
		ret = ret.replace(/ /g, "%20");
		ret = ret.replace(/&/g, "%26");
		ret = ret.replace(/=/g, "%3d");
		ret = ret.replace(/#/g, "%23");
		ret = ret.replace(/\?/g, "%3f");
		return ret;
	} else
		return str;
}

SeasUtil.prototype.populateUri = function(seasUri, params) {
	var sUri = seasUri;

	if (params) {
		for (var i = 1; i < params.length; i += 2) {
			// sUri=sUri.replace(params[i-1],this.encodeValue(params[i]));
			sUri = sUri.replace(params[i - 1], encodeURI(params[i]));
		}
	}

	if (sUri.indexOf(this.seasHost) == 0)
		return sUri;
	else
		return this.seasHost + sUri;
};

SeasUtil.prototype.sendRequest = function(srcUrl) {
	try {
		var xmlHttp = this.createHttpRequest();
		xmlHttp.open("GET", srcUrl, false); // sync
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				// alert(xmlHttp.responseText);
				// elem.innerHTML=xmlHttp.responseText;
			}
		};
		xmlHttp.send('123');
		return xmlHttp;
	} catch (e) {
		alert("sendRequest1:" + e);
		return null;
	}
};

SeasUtil.prototype.sendRequestAsync = function(srcUrl, fCallback) {
	try {
		// alert(srcUrl);
		var xmlHttp = this.createHttpRequest();
		xmlHttp.open("GET", srcUrl, true); // async
		if (fCallback) {
			fCallback.xmlHttp = xmlHttp;
			xmlHttp.onreadystatechange = fCallback;
		}
		// call in new thread to allow ui to update
		window.setTimeout(function() {
			xmlHttp.send(null);
		}, 10);
		return true;
	} catch (e) {
		alert("sendRequest:" + e);
		return false;
	}
};

/*
 * simulate SeasWeb.HttpClient as XMLHttpRequest
 */
function SeasHttpRequest() {
	this.seasWeb = new ActiveXObject("SeasWeb.HttpClient");
	this.httpRequest = null;
	this.httpResponse = null;

	// /properties
	this.readyState = 1;
	this.responseBody = null;
	this.responseStream = null;
	this.responseText = "";
	this.responseXML = null;
	this.status = 0;
	this.statusText = "";

	// /method
	this.open = function(sMethod, sUrl, bAysnc, sUser, sPwd) {
		var regUrl = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/gi
		var arrUrl = regUrl.exec(sUrl);
		var sProtocol = RegExp.$1;
		var sHost = RegExp.$2;
		var sPort = RegExp.$3;
		var sUri = RegExp.$4;
		if (sPort == "")
			sPort = 80;
		else if (sPort.indexOf(":") == 0)
			sPort = sPort.substring(1); // :7001 -> 7001

		this.seasWeb.OpenSession(sHost, sPort)
		var req = new ActiveXObject("SeasWeb.HttpRequestMessage");
		if (sMethod && "post" == sMethod.toLowerCase()) {
			req.Method = 1;
		} else
			req.Method = 0;
		req.URI = sUri;
		this.httpRequest = req;
		this.httpResponse = null;
		this.readyState = 1;
	};
	this.send = function(vBody) {
		var res = this.seasWeb.SendRequest(this.httpRequest);
		this.responseText = res.Response;
		this.status = parseInt(res.Code);
		this.httpResquest = null;
		this.readyState = 4;
		this.httpResponse = res;
	};

	this.setRequestHeader = function(sName, sValue) {
		this.httpRequest.AddHeader(sName, sValue);
	};

	this.getResponseHeader = function(sName) {
		return this.httpResponse.GetHeader(sName);
	};

	this.getAllResponseHeaders = function() {
		var headers = this.httpResponse.Headers;
		var i;
		var s = "";
		for (i = 1; i <= headers.Count(); i++) {
			if (i > 1)
				s += ",";
			s += headers(i).name;
		}

		return s;
	};

	this.abort = function() {
		// do nothing
	};
};

SeasUtil.prototype.createHttpRequest = function() {
	if (this.useSeasWeb) {
		try {
			return new SeasHttpRequest();
		} catch (es) {
			// alert(es);

			// failed to create SeasWeb.HttpClient,I'll use default
		}
	}

	try {
		if (window.XMLHttpRequest) {
			var req = new XMLHttpRequest();

			// some versions of Moz do not support the readyState property
			// and the onreadystate event so we patch it!
			if (req.readyState == null) {
				req.readyState = 1;
				req.addEventListener("load", function() {
					req.readyState = 4;
					if (typeof req.onreadystatechange == "function")
						req.onreadystatechange();
				}, false);
			}

			return req;
		}
		if (window.ActiveXObject) {
			return new ActiveXObject(this.getXmlHttpPrefix() + ".XmlHttp");
		}
	} catch (ex) {
	}
	// fell through
	throw new Error("Your browser does not support XmlHttp objects");
};

SeasUtil.prototype.getXmlHttpPrefix = function() {
	if (this.xmlHttpPrefix)
		return this.xmlHttpPrefix;

	var prefixes = [ "MSXML2", "Microsoft", "MSXML", "MSXML3" ];
	var o;
	for (var i = 0; i < prefixes.length; i++) {
		try {
			// try to create the objects
			o = new ActiveXObject(prefixes[i] + ".XmlHttp");
			return this.xmlHttpPrefix = prefixes[i];
		} catch (ex) {
		}
		;
	}

	throw new Error("Could not find an installed XML parser");
};

/*
 * author=zhue 判断参数是不是json对象
 */
SeasUtil.prototype.ToTypeJson = function(jsonIn) {

	var flag = typeof (jsonIn) == "object"
			&& Object.prototype.toString.call(jsonIn).toLowerCase() == "[object object]"
			&& !jsonIn.length;
	if (flag) {
		return jsonIn;
	} else {
		// 由JSON字符串转换为JSON对象
		var obj = JSON.parse(jsonIn);
		return obj;
	}
};
// 5.2.3 原件浏览OriginalBrowser(string jsonIn)
SeasUtil.prototype.OriginalBrowser = function(jsonIn) {
	if (!this.loginOk) {
		alert("请先登录! ");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		var account = this.userAccount;
		var pwd = this.userPwd;

		// this.SetCookie("SeasInterfaceUserAccount",account);
		// this.SetCookie("SeasInterfaceUserPassword",pwd);
		// alert(document.cookie);
		// 由JSON字符串转换为JSON对象
		// var obj = JSON.parse(jsonIn);
		// UUID(String) 原件的唯一标示字段
		var UUID = jsonIn.UUID;
		// NewWindow 是否弹出新窗口进行浏览
		var NewWindow = jsonIn.NewWindow;
		// uri 路径
		var seasUri;
		// alert(NewWindow);
		// 校验参数名是否正确，还未对参数值进行严格校验
		if (!UUID && NewWindow) {
			throw new Error("参数列表错误！");
		}
		// 判断是否弹出新窗口（当NewWindow为true时，弹出新窗口显示，为false时，在）
		if (NewWindow == "true") {
			var originalEditorUri = this.seasHost
					+ "/seas/method/originalbrowser.do?jsonIn="
					+ JSON.stringify(jsonIn);
			// alert(originalEditorUri);
			var seasAccount = new Object();
			seasAccount.SeasInterfaceUserName = account;
			seasAccount.SeasInterfaceUserPassword = pwd;
			var newwin = window
					.showModalDialog(originalEditorUri, seasAccount,
							"status:no; dialogWidth:4000px; dialogHeight:4000px;help=no;scrollbars=no");
			/*
			 * window.dialogArguments (来取得传递进来的参数。)
			 */
		} else {
			var originalEditorUri = this.seasHost
					+ "/seas/method/originalbrowser.do?jsonIn="
					+ JSON.stringify(jsonIn);
			// alert(originalEditorUri);
			window.location.href = originalEditorUri;
		}
	}

};
//5.2.4 原件采集OriginalEditor(string jsonIn)
SeasUtil.prototype.OriginalEditor = function(jsonIn) {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		// 取出各个参数
		var UUID = jsonIn.UUID;
		var NewWindow = jsonIn.NewWindow;
		var SystemCode = jsonIn.SystemCode;
		var OperatorCode = jsonIn.OperatorCode;
		var UnitCode = jsonIn.UnitCode;
		//jsonIn乱码问题解决 2次encodeURI转码
		var strjsonIn = JSON.stringify(jsonIn);
		strjsonIn = encodeURI(encodeURI(strjsonIn));
		// 校验参数名是否正确，还未对参数值进行严格校验
		if (!UUID && NewWindow && SystemCode && OperatorCode && UnitCode) {
			throw new Error("参数列表错误! ");
		}
		// 判断弹窗 true弹出新窗口 false在原界面上刷新
		if ("true" == NewWindow) {
			var originalEditorUri = this.seasHost
					+ "/seas/method/originaleditor.do?jsonIn="
					+ strjsonIn;
			// alert(originalEditorUri);
			var newwin = window
					.showModalDialog(originalEditorUri, "原件浏览",
							"status:no; dialogWidth:4000px; dialogHeight:4000px;help=no;scrollbars=no");
			return this.OriginalCount(jsonIn);
		} else if ("false" == NewWindow) {
			var originalEditorUri = this.seasHost
					+ "/seas/method/originaleditor.do?jsonIn="
					+ strjsonIn;
			// alert(originalEditorUri);
			window.location.href = originalEditorUri;
		}
	}
};
// 5.2.5 原件初始化采集OriginalInit(string jsonIn)
SeasUtil.prototype.OriginalInit = function(jsonIn) {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		// 取出各个参数
		var NewWindow = jsonIn.NewWindow;
		var MainBodyCode = jsonIn.MainBodyCode;
		var MainBodyType = jsonIn.MainBodyType;
		
		var MainBodyName = jsonIn.MainBodyName;
		var IdCardNoOrCompanyCode = jsonIn.IdCardNoOrCompanyCode;
		
		var SystemCode = jsonIn.SystemCode;
		var OperatorCode = jsonIn.OperatorCode;
		var UnitCode = jsonIn.UnitCode;
		var strjsonIn = JSON.stringify(jsonIn);
		strjsonIn = encodeURI(encodeURI(strjsonIn));
		// 校验参数名是否正确，还未对参数值进行严格校验
		if (!NewWindow && MainBodyCode && MainBodyType && SystemCode
				&& OperatorCode && UnitCode && MainBodyName && IdCardNoOrCompanyCode) {
			throw new Error("参数列表错误！");
		}
		// 判断弹窗 true弹出新窗口 false在原界面上刷新
		if ("true" == NewWindow) {
			var originalEditorUri = this.seasHost
					+ "/seas/method/originaleditor.do?jsonIn="
					+ strjsonIn;
			var newwin = window
					.showModalDialog(originalEditorUri, "原件浏览",
							"status:no; dialogWidth:4000px; dialogHeight:4000px;help=no;scrollbars=no");
		} else if ("false" == NewWindow) {
			var originalEditorUri = this.seasHost
					+ "/seas/method/originaleditor.do?jsonIn="
					+ strjsonIn;
			window.location.href = originalEditorUri;
		}
	}
};
// 5.2.6 查看单个原件OriginalSingleView(string jsonIn)
SeasUtil.prototype.OriginalSingleView = function(jsonIn) {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		// 取出各个参数
		var NewWindow = jsonIn.NewWindow;
		var BlobId = jsonIn.BlobId;
		if (!NewWindow && BlobId) {
			throw new Error("参数列表错误！");
		}
		var OriginalSingleViewUri = this.seasHost + "/media/" + BlobId + "/";
		// alert(OriginalSingleViewUri);
		if ("true" == NewWindow) {
			 var newwin = window.showModalDialog(OriginalSingleViewUri,
			 "查看单个原件","status:no; dialogWidth:1000px;dialogHeight:600px;help=no;scrollbars=no");
//			window.open(OriginalSingleViewUri);
		} else if ("false" == NewWindow) {
			// window.location.href = OriginalSingleViewUri;
			// alert(this.seasHost+"/seas/jsp/module/lishui/viewimginoriginaleditor.html");
			// alert(this.seasHost);
			// window.showModalDialog(this.seasHost+"/seas/jsp/module/lishui/viewimginoriginaleditor.html",OriginalSingleViewUri,"status:no;
			// dialogWidth:800px; dialogHeight:500px;help=no;scrollbars=no");
//			window
//					.showModalDialog(OriginalSingleViewUri, "",
//							"status:no; dialogWidth:800px; dialogHeight:500px;help=no;scrollbars=no");
			 window.location.href = OriginalSingleViewUri;
		}
	}
};
	// 5.2.7 获得原件地址OriginalGet (string jsonIn)
	SeasUtil.prototype.OriginalGet = function(jsonIn) {
//		 校验是否登陆
		 if (!this.loginOk) {
		 alert("请先登录! ");
		 } else {
//		 取出各个参数
		var BlobId = jsonIn.BlobId;
		if (!BlobId) {
			throw new Error("参数列表错误！");
		}
		var OriginalSingleViewUri = this.seasHost + "/media/" + BlobId + "/";
		// alert("OriginalSingleViewUri="+OriginalSingleViewUri);
		return OriginalSingleViewUri;
		// }

	}
};
// 5.2.8 文件查询QueryFile(string jsonIn)
SeasUtil.prototype.QueryFile = function(jsonIn) {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		// 取出各个参数
		var NewWindow = jsonIn.NewWindow;
		var uuid = jsonIn.UUID;
		var docTypeId = 34876;
		var condition = "s26 = '" + uuid + "'";
		if (!NewWindow && uuid) {
			throw new Error("参数列表错误！");
		}
		if ("true" == NewWindow) {
			this.query(docTypeId, condition, true);
		} else if ("false" == NewWindow) // 不会写在本页面打开
		{
			params = [ "$docTypeId", docTypeId, "$condition", condition ];
			seasUri = this.populateUri(this.queryServlet, params);
			window.location.href = seasUri;
		}
	}

};
// 5.2.9 获取文件内原件数量OriginalCount(string jsonIn)
SeasUtil.prototype.OriginalCount = function(jsonIn) {

	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录!");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		jsonIn.type = "1005";
		jsonIn.targets = jsonIn.UUID.split('|');
		var argStr = JSON.stringify(jsonIn);
		var params = [ "$arg", argStr ];
		var originaleditorUri = "/dataoperate?arg=$arg";
		var originaleditorSeasUri = this.populateUri(originaleditorUri, params);
		res = this.sendRequestPost(originaleditorSeasUri);

		// 取出各个参数
		var uuid = jsonIn.UUID;
		if (!uuid) {
			throw new Error("参数列表错误！");
		}
		if (res) {
			if (res.status == 200) {
				var resText = "" + res.responseText;
				var jsonRestext = JSON.parse(resText);
				return jsonRestext.sources;
			}
		}
	}
};

SeasUtil.prototype.sendRequestPost = function(srcUrl) {
	try {
		var xmlHttp = this.createHttpRequest();
		xmlHttp.open("POST", srcUrl, false); // sync
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4) {
				// alert(xmlHttp.responseText);
				// elem.innerHTML=xmlHttp.responseText;
			}
		};
		xmlHttp.send(null);
		return xmlHttp;
	} catch (e) {
		alert("sendRequest1:" + e);
		return null;
	}
};


//5.2.4 档案移交Transferfile(string jsonIn)
SeasUtil.prototype.TransferFile3 = function(jsonIn) {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
	} else {
		jsonIn = SeasUtil.prototype.ToTypeJson(jsonIn);
		// 取出各个参数
		var UUID = jsonIn.UUID;
		var NewWindow = jsonIn.NewWindow;
		var SystemCode = jsonIn.SystemCode;
		var OperatorCode = jsonIn.OperatorCode;
		var UnitCode = jsonIn.UnitCode;
		//jsonIn乱码问题解决 2次encodeURI转码
		var strjsonIn = JSON.stringify(jsonIn);
		strjsonIn = encodeURI(encodeURI(strjsonIn));
		// 校验参数名是否正确，还未对参数值进行严格校验
		if (!UUID && NewWindow && SystemCode && OperatorCode && UnitCode) {
			throw new Error("参数列表错误! ");
		}
		// 判断弹窗 true弹出新窗口 false在原界面上刷新
		if ("true" == NewWindow) {
			var originalEditorUri = this.seasHost+ "/seas/method/transferFile.do?jsonIn="+ strjsonIn;
			// alert(originalEditorUri);
//			var newwin = window.showModalDialog(originalEditorUri, "档案移交","status:no; dialogWidth:1050px; dialogHeight:600px;help=no;scrollbars=no");
//			var newwin = window.open(originalEditorUri, 档案移交, windowFeatures, optionalArg4)
			var newwin = window.open(originalEditorUri);
//			this.openpage(originalEditorUri);
//			return this.OriginalCount(jsonIn);
		} else if ("false" == NewWindow) {
			var originalEditorUri = this.seasHost + "/seas/method/transferFile.do?jsonIn="+ strjsonIn;
			// alert(originalEditorUri);
			window.location.href = originalEditorUri;
		}
	}
};
//5.2.4 档案移交Transferfile(string jsonIn)
SeasUtil.prototype.TransferFile2 = function() {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
		return ;
	} else {
		// 取出各个参数
		var UUID = "4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40";
		var userName = "张三";
		var originalEditorUri = this.seasHost + "/seas/method/transferFile.do";

		var oForm = document.createElement("<form action='" + originalEditorUri
				+ "' method='post'>");
		var oAccount = document
				.createElement("<input name='userName' type='hidden' value='"
						+ userName + "'>");
		var oPwd = document
				.createElement("<input name='UUID' type='hidden' value='"
						+ UUID + "'>");

		oForm.appendChild(oAccount);
		oForm.appendChild(oPwd);
		document.body.appendChild(oForm);

		oForm.submit();
		/*
		 * var name = "_blank"; // alert(originalEditorUri); // var newwin =
		 * window.showModalDialog(originalEditorUri, "档案移交","status:no;
		 * dialogWidth:1050px; dialogHeight:600px;help=no;scrollbars=no"); //
		 * var newwin = window.open(originalEditorUri, 档案移交, windowFeatures,
		 * optionalArg4) // var newwin = window.open(originalEditorUri); //
		 * this.openpage(originalEditorUri); // return
		 * this.OriginalCount(jsonIn);
		 * 
		 * 
		 * //首先创建一个form表单 var tempForm = document.createElement("form");
		 * tempForm.id="tempForm1"; //制定发送请求的方式为post tempForm.method="post";
		 * //此为window.open的url，通过表单的action来实现 tempForm.action="transferFile";
		 * //利用表单的target属性来绑定window.open的一些参数（如设置窗体属性的参数等） tempForm.target=name;
		 * //创建input标签，用来设置参数 var hideInput = document.createElement("input");
		 * hideInput.type="hidden"; hideInput.name= "userName"; hideInput.value=
		 * userName; //将input表单放到form表单里 tempForm.appendChild(hideInput);
		 * 
		 * 
		 * var hideInput2 = document.createElement("input"); hideInput2.type =
		 * "hidden"; hideInput2.name = "UUID"; hideInput2.value = UUID;
		 * tempForm.appendChild(hideInput2);
		 * 
		 * //此为给form表单绑定事件（onsubmit），由于存在浏览器兼容问题所以此处加了一个判断。
		 * //但实质都是为form表单绑定一个提交事件，以便之后触发实现window.open效果 if(document.all){
		 * tempForm.attachEvent("onsubmit",function(){}); //IE }else{ var subObj =
		 * tempForm.addEventListener("submit",function(){},false); //firefox }
		 * //将此form表单添加到页面主体body中 document.body.appendChild(tempForm);
		 * //然后触发onsubmit事件时执行openWindow(name)函数。因为有特定浏览器会打开一个空白页面所以这里的function（甚至整个if）可以根据情况省略，经试验这不会影响模拟window.open的效果。
		 * if(document.all){ tempForm.fireEvent("onsubmit",function(){openWindow(name); }); }
		 * else{ //tempForm.dispatchEvent(new
		 * Event("submit")); $("form").trigger("onsubmit",function(){
		 * openWindow(name); }); } //手动触发，提交表单 tempForm.submit();
		 * //从body中移除form表单 document.body.removeChild(tempForm);
		 */
	}
};
//5.2.4 档案移交Transferfile(string jsonIn)
SeasUtil.prototype.TransferFile = function(UUID,userName) {
	// 校验是否登陆
	if (!this.loginOk) {
		alert("请先登录! ");
		return ;
	} else {
//		var UUID = "4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40,4C44C688FDE245CBB69A59053C8FB5F5,66C9F507A3BE4F5594CF9ED4B558BB51,56366D7F2004470F8BFA44925FB8C1C7,ACA7174149134D0C9C200174834627CE,704BEB77193D446CA518F82AFEE0831B,5208E6FD4ACF41D6B5C8B42495187825,BE526BB39A804993B95563F50561723F,54A66988993D4CF9B9AFAEB60F164F40";
//		var userName = "张三";
		var url = this.seasHost + "/seas/method/transferFile.do";
		var name = "transferFile";
		var tempForm = document.createElement("form");
		tempForm.id = "tempForm1";
		tempForm.method = "post";
		tempForm.action = url;
		tempForm.target = name;
		var hideInput = document.createElement("input");
		hideInput.type = "hidden";
		hideInput.name = "UUID"
		hideInput.value = UUID;
		tempForm.appendChild(hideInput);
		
		var hideInput2 = document.createElement("input");
		hideInput2.type = "hidden";
		hideInput2.name = "userName"
		hideInput2.value = userName;
		tempForm.appendChild(hideInput2);
		
		tempForm.attachEvent("onsubmit", function() {openWindow(name);});
		document.body.appendChild(tempForm);
		tempForm.fireEvent("onsubmit");
		tempForm.submit();
		document.body.removeChild(tempForm);
	}
};
//网上找的方法，post提交,并且打开新网页
function openPostWindow(url, data, name) {
	var tempForm = document.createElement("form");
	tempForm.id = "tempForm1";
	tempForm.method = "post";
	tempForm.action = url;
	tempForm.target = name;
	var hideInput = document.createElement("input");
	hideInput.type = "hidden";
	hideInput.name = "content"
	hideInput.value = data;
	tempForm.appendChild(hideInput);
	tempForm.attachEvent("onsubmit", function() {openWindow(name);});
	document.body.appendChild(tempForm);
	tempForm.fireEvent("onsubmit");
	tempForm.submit();
	document.body.removeChild(tempForm);
}
function openWindow(name) {
	window.open('about:blank',name,'height=400, width=400, top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=yes, status=yes');
}
