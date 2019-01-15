


//开启webSocket
function StartWebSocket(){
	 var url = "ws://localhost:9000/";

	if('WebSocket' in window){
            ws = new WebSocket(url);
    }
    else if('MozWebSocket' in window){
        ws = new MozWebSocket(url);
    }else{
		alert("浏览器版本过低，请升级您的浏览器。\r\n浏览器要求：IE10+/Chrome14+/FireFox7+/Opera11+");
	}
   
	ws.onopen = function()
   {
      m_isConnectWS = true;
	  sendInitMsg();//初始化
	  m_closed = false;
   };
	
	
   ws.onmessage = function (evt) 
   { 
   	
   	
   	if(typeof(evt.data)=="string"){
   		
   		var str = evt.data;
   		
   		if(str.length <= 0){
   			
   			return;
   		}
		
		if(str.indexOf("FileEncodeBase64") >=0){
			//base64
			var strs= new Array(); 
		
			strs=str.split(m_splitTag);
			var score = strs[2];
//			alert(score);
			createimg(score);
			return;
		}
		
		if(str.indexOf("$$$")>=0){
			
			var strs= new Array();
			strs=str.split("$$$"); 
			alert(strs[1]);
		}
		
		if(str.indexOf(m_splitTag)>=0){
			//视频的每一帧
			var strs= new Array();
			strs=str.split(m_splitTag); 
			setImageWithBase64(strs[1]);
		}else{
			//处理其他请求
			handleJsonStrMessage(str);
		}
		
		
   		
   	}
 	};
	
   ws.onclose = function()
   { 
      m_isConnectWS = false;
      clearInterval(timOut);
      alert("连接中断");
   };
   openDev();
}

function sendWsMessage(jsonObj){
	var jsonStr = JSON.stringify(jsonObj);
	ws.send(jsonStr);
}

function handleJsonStrMessage(str){
	
	var jsonOBJ = JSON.parse(str);
	var name = jsonOBJ.FuncName;
	var re = jsonOBJ.result;
	//初始化
	if( name == "camInitCameraLib"){
		
		if (re == "0"){
//			alert("初始化成功");
			
		}else{
			alert("初始化失败" + re);
		}
			
	}
	//打开设备
	else if(name == "camOpenDev"){
		
		if(re == 0){
//			alert("打开成功");
		
			//获取分辨率
			var jsonObj = {FuncName:'camGetResolution'};
			sendWsMessage(jsonObj);
		
		}else{
			alert("打开失败" + re);
		}
		
	}
	//获取设备名
	else if(name == "camGetDevName"){
		
		configureDevInfo(re);
		
	}
	//获取分辨率
	else if(name == "camGetResolution"){
		
		configureRestionInfo(re);
	}
	//设置分辨率
	else if(name == "camSetResolution"){
		
		if(re !=0){
			
			alert("设置分辨率失败");
		}
	}
	//拍照
	else if(name == "camCaptureImageFile"){
		
		if(re != 0){
			
			alert("拍照失败");
		}
		
		
	}
	//自动裁切
	else if(name == "camSetImageAutoCrop"){
		if(re != 0){
			
			alert("自动裁切失败");
		}
	}
	//旋转
	else if(name == "camSetImageRotateMode"){
		
		if(re != 0){
			
			alert("旋转失败");
		}
	}
	//二代证
	else if(name == "idcardrfidReadIDCard"){
		
		alert(re);
	}
	//文件上传
	else if(name == "camUpdataFileHttp"){
		if(re ==0)
		{
			alert("文件上传成功！")
			
		}
		else{
			alert("错误返回值"+String(re) +"|文件上传失败！");
		}
	}
	//社保卡
	else if(name == "ReadSBKCaard"){
		
		alert(re);
	}
	//遍历文件夹
	else if(name == "getFolderDayFileA")
	{
		alert(re);
	}
	//删除文件
	else if(name == "camDeleteFile")
	{
		if(re ==0)
		{
			alert("文件删除成功！");
			
		}
		else
		{
			
			alert("文件删除失败！");
		}
		
	}
	
	//设置DPI
	else if(name == "camSetImageDPI")
	{
		if(re ==0)
		{
			alert("DPI设置成功！");
			
		}
		else
		{
			
			alert("DPI设置失败！");
		}
		
	}
	//设置JPG压缩率
	else if(name == "camSetImageJPGQuanlity")
	{
		if(re ==0)
		{
			alert("JPG压缩设置成功！");
			
		}
		else
		{
			
			alert("JPG压缩设置失败！");
		}
		
		
	}
	//删除文件夹
	else if(name == "DeleteFolderDayFileA")
	{
		if(re ==0)
		{
			alert("删除文件夹成功！");
			
		}
		else
		{
			
			alert("删除文件夹失败！");
		}
		
		
	}
	
}

	
	

