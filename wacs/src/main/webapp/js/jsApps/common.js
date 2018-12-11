function close_win() {
	ClientWin.CloseWindow();
}

function max_restore_win() {
	if (ClientWin.MaxRestoreWindow() == "false") {
		$("#winMaxRestore").attr("title", "最大化");
		$("#winMaxRestore span").attr("class", "fa fa-expand");
	} else {
		$("#winMaxRestore").attr("title", "还原");
		$("#winMaxRestore span").attr("class", "fa fa-compress");
	}
}

function min_win() {
	ClientWin.MinWindow();
}

function read_card() {
	// 身份证
	var user = ClientReadCard.read();
	if (user.status != 0) {
		tz.alert(user.message)
		return;
	}
	var str = "<p>";
	str += "身份证号：" + user.number;
	str += "<br/>姓名：" + user.name;
	str += "<br/>性别：" + user.sex;
	str += "<br/>民族：" + user.nation;
	str += "<br/>生日：" + user.birth;
	str += "<br/>地址：" + user.address;
	str += "<br/>发证机关：" + user.department;
	str += "<br/>有效期限：" + user.expirDay;
	str += "<br/>照片：" + user.photoBmpBuffer;
	str += "</p>";
	mini.get("cardWindow").show();
	$("#cardArea").html(str);

	// 社保卡读卡：
	/*var user = ClientSBReadCard.readSB();
	if (user.status != 0) {
		tz.alert(user.message)
		return;
	}
	var str = "<p>";
	str += "地区行政区划代码：" + user.divisionsName;
	str += "<br/>社会保障号码：" + user.securityNumber;
	str += "<br/>卡号：" + user.cardCode;
	str += "<br/>卡识别码：" + user.cardHeadCode;
	str += "<br/>姓名：" + user.name;
	str += "<br/>卡复位信息：" + user.cardResetInfo;
	str += "<br/>规范版本：" + user.normVersion;
	str += "<br/>发卡日期：" + user.beginDay;
	str += "<br/>卡有效期：" + user.expirDay;
	str += "<br/>终端机编号：" + user.terminalNumber;
	str += "<br/>终端设备号：" + user.terminalCode;
	str += "</p>";
	mini.get("cardWindow").show();
	$("#cardArea").html(str);*/
	// mini.alert(user.isStart);
	// mini.alert("姓名："+user.name+"；<br/>身份证："+user.number);
	// ChangeTextInJS
}

function test() {
	app.ChangeTextInJS("lala");
	//alert("12");
}

function ChangeText(test) {
	alert(test);
}