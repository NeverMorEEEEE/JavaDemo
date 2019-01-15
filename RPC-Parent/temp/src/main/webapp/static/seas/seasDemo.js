
	/* var seas = new SeasUtil("http://192.168.1.1:8080/seas"); */ 
 	var seas;
 	var seasUserName;
 	var seasPassword;
 	//window.onload=demoSet;
	//seas.serverId = "default";
	var jsonIn = {
		"UUID" : "8D4571235446459D9F25D673CFF5AB83",
		"NewWindow" : "true",
		"SystemCode" : "01",
		"OperatorCode" : "操作员",
		"UnitCode" : "001"
	}
	var jsonIn1 = {
		"NewWindow" : "true",
		"MainBodyCode" : "21050100001",
		"MainBodyType" : "1",
		"MainBodyName": "张三",
		"IdCardNoOrCompanyCode": "200000199901010001",
		"SystemCode" : "01",
		"OperatorCode" : "操作员",
		"UnitCode" : "001"
	}
	var jsonIn2 = {
		"NewWindow" : "true",
		"BlobId" : "563"
	}
	
	var jsonIn3 = {
		"UUID" : "8D4571235446459D9F25D673CFF5AB83",
		"NewWindow" : "true"		
	}
	var jsonIn4 = {
		"BlobId" : "563"		
	}
	var jsonIn5 = {
		"UUID" : "8D4571235446459D9F25D673CFF5AB83",
		"NewWindow" : "true"		
	}
	var jsonIn6 = {
		"UUID" : "A331471C9398450DBF7AFD4D3FDB21C5"
	}
	
	var jsonIn7 = {
		"UUID" : "8D4571235446459D9F25D673CFF5AB83",
		"NewWindow" : "true"
	}

	function testLogin() {
		seas.login(seasUserName, seasPassword);
		if (seas.loginOk)
			alert("登录成功。");
		else
			alert("登录失败。")
	}
	function logout()
	{
		seas.logout();
		if (!seas.loginOk)
			alert("注销成功。");
		else
			alert("注销失败。")
	}
	function openSeas() {
		window.open(document.getElementById("seasu").value);
	}

	function testQuery() {
		seas.query(32910, "%业务主体编码% like '%21050100001%'", true);
		//seas.query(23976,"s1 like '%9401%'",true);
	}
	function testQuery1() {
		//seas.query("社保业务归档库/文件","%件号% like '%0001%'",true);
		seas.query(287103, "s38 = '测试' and s37 = '210101200010101010'",true);
		//seas.query(23976,"s1 like '%9401%'",true);
	}
	function testQueryByParent() {
		//seas.query("社保业务归档库/文件","%件号% like '%0001%'",true);
		//seas.query(23976,"s1 like '%9401%'",true);
		var xmlDom = seas.query(33054, "iparent = 33101");
		alert(xmlDom.xml);
	}

	function testQueryXml() {
		var ret = seas.query(32904, "%件号% like '%0001%'");
		alert(ret.xml);
		//alert(seas.query(23976,"s1 like '%9401%'"));
	}

	function testQueryIndex() {
		// the first parameter is library id       
		seas.queryIndex(20039, "guojw", true);
	}

	function testQueryIndexXml() {
		// the first parameter is library id       
		var ret = seas.queryIndex(20039, "guojw");
		alert(ret.xml);
	}

	function testOpenPage() {
		seas.openpage("/seas/method/explore.do?root=6000&objectid=6000");
	}

	function testOpenPage2() {
		seas.openpage("/seas/method/explore.do?root=6000&objectid=6000",
				"manager", "manager");
	}

	function testOpenPage3() {
		//var ss=seas.encodeValue("科技档案库/案卷:?%档号%='1024-8203-02'");
		//seas.openpage("/method/explore.do?root=6000&objectid="+ss);
		//var params=["root","6000",
		//    "objectid","科技档案库/案卷:?%档号%='1024-8203-02'"];
		var params = [ "root", "6000", "objectid",
				"科技档案库/案卷:?%档号%='3271-9401-01'" ];
		seas.postpage("/seas/method/explore.do", params);
	}

	function testView() {
		//seas.view(24024);
		seas.view(33111);
	}

	function testSave() {
		seas.save(24024);
	}

	function testPrint() {
		seas.print(24024);
	}

	function testUpload() {
		var dialogFeatures = "center:yes;dialogWidth=800px;dialogHeight=560px";
		var c = window
				.showModuleDialog(
						'http://127.0.0.1/seas7.0/seas/method/newrecord.do?ns_mod=22392&operation=nsi_22291&objectid=22433&ns_ref=',
						window, dialogFeatures);
	}

	function testBatchUpload() {
		seas
				.openpage("/seas/method/newrecord.do?ns_mod=56491&operation=nsi_56279&objectid=56251&ns_ref="
						+ window.location);
	}
	
	function OriginalBrowser()
	{
		jsonIn7.UUID=document.getElementById("uuid").value;
		seas.OriginalBrowser(jsonIn7);
	}
	
	function OriginalEditor()
	{
		jsonIn.UUID=document.getElementById("uuid").value;
		var rtn = seas.OriginalEditor(jsonIn);
		alert(rtn);
	}
	
	function OriginalInit()
	{
		var rtn = seas.OriginalInit(jsonIn1);
		alert(rtn);
	}
	
	function OriginalSingleView()
	{
		seas.OriginalSingleView(jsonIn2);
	}
	function OriginalCount()
	{
		jsonIn6.UUID=document.getElementById("uuid").value;
		var rtn = seas.OriginalCount(jsonIn6);
		if(rtn){
			alert(rtn);
		}
	}
	function QueryFile()
	{
		jsonIn5.UUID=document.getElementById("uuid").value;
		seas.QueryFile(jsonIn5);
	}
	function OriginalGet()
	{
		var rtn = seas.OriginalGet(jsonIn4);
		if(rtn){
			alert(rtn);
		}
	}
	function demoSet(){
		seas = new SeasUtil('http://10.84.94.57:7001/seas');
		seasUserName = 'manager';
		seasPassword = 'manager'
		seas.serverId = "default";
		alert("设置成功");
	}
