
function load(){
	
	StartWebSocket();
	
}

function unload(){
	
	if(m_closed){
		return;
	}
	clearInterval();
	
	var jsonObj = {FuncName:'camUnInitCameraLib'};
	sendWsMessage(jsonObj);
}

function sendInitMsg(){
	
	var jsonObj = {FuncName:'camInitCameraLib'};
	sendWsMessage(jsonObj);
}

function sendPreZoneSize(){
	
	var w = document.getElementById("myCanvas").width;
	var h = document.getElementById("myCanvas").height;
	
	var jsonObj = {FuncName:'PreZoneSize',argument:{width:w,height:h}};
	sendWsMessage(jsonObj);
	
}
//打开设备
function openDev(){
	
	if(m_closed){
		
		StartWebSocket();
	}
	setTimeout(function(){
		
		sendPreZoneSize();
		//打开摄像头
		var jsonObj = {FuncName:'camOpenDev',argument:{devIndex:0, subtype:0,width:0,height:0}};
		sendWsMessage(jsonObj);
		//开始预览
		jsonObj = {FuncName:'camStartPreview'};
		sendWsMessage(jsonObj);
		
		//获取设备名
	    jsonObj = {FuncName:'camGetDevName'};
		sendWsMessage(jsonObj);
		
	},500);
	
}

//关闭设备
function closeDev(){
	
	var jsonObj = {FuncName:'camCloseDev',argument:{devIndex:1}};
	sendWsMessage(jsonObj);
}

//显示设备名
function configureDevInfo(names){	

	//设备名字
	var objSelect = document.getElementById("device");
	objSelect.options.length = 0;
	
	for (var i = 0; i < names.length;i++ ) {
	
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}

	//设置设备
	objSelect.onchange = function(){
		
		//打开摄像头
		var jsonObj = {FuncName:'camOpenDev',argument:{devIndex:objSelect.selectedIndex, subtype:0,width:0,height:0}};
		sendWsMessage(jsonObj);
		
	}
	
}
//设置 分辨率
function configureRestionInfo(names){
	
	var objSelect = document.getElementById("resoultion");
	objSelect.options.length = 0;
	
	for (var i = 1; i < names.length;i++ ) {
		if(names[i].length <=0){
			continue;
		}
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}

	//设置分辨率
	objSelect.onchange = function(){
		
		var jsonObj = {FuncName:'camSetResolution',argument:{index:objSelect.selectedIndex}};
		sendWsMessage(jsonObj);
	
	}
}

function configureVideoStyle(names){
	
	var objSelect = document.getElementById("videoStyle");
	objSelect.options.length = 0;
	
	for (var i = 1; i < names.length;i++ ) {
	
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}

	//设置视频格式
	objSelect.onchange = function(){
		
		//sendWsMessage("SetMediaType"+m_splitTag+String(objSelect.selectedIndex));
	
	}
	
}

//显示每一帧
function setImageWithBase64(str){

	var myimg = document.getElementById("myCanvas"); 
	myimg.src = "data:image/png;base64,"+str;
	
}


//旋转
function SetRotationStyle(){
	var objSelect = document.getElementById("rotationStyle");
	var jsonObj = {FuncName:'camSetImageRotateMode',argument:{rotateMode:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
}
//自动裁切
function SetCutStyle(){
	
	var objSelect = document.getElementById("cutStyle");
	
	var jsonObj = {FuncName:'camSetImageAutoCrop',argument:{CropType:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
	if(objSelect.selectedIndex > 4)
	{
		SavePara();
		
	}

}

//保存参数
function SavePara(){
	
	var x = document.getElementById("dpix").value;
	var y = document.getElementById("dpiy").value;
	var jpg = document.getElementById("jpg").value;
	var left = document.getElementById("left").value;
	var right = document.getElementById("right").value;
	var top = document.getElementById("top").value;
	var bottom = document.getElementById("bottom").value;
	
	//sendWsMessage("SetImageDPI"+m_splitTag+x+m_splitTag+y); //DPI
	//sendWsMessage("SetJPGQuanlity"+m_splitTag+jpg);   //JPG
//	sendWsMessage("SetCusCropSize"+m_splitTag+left+m_splitTag+top+m_splitTag+right+m_splitTag+bottom); //Crop
	var jsonObj = {FuncName:'camSetImageCusCropRect',argument:{left:parseInt(left),right:parseInt(right),top:parseInt(top),bottom:parseInt(bottom)}};
	sendWsMessage(jsonObj);
}


//拍照
function Capture(){
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camCaptureImageFile',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}

//文件上传
function HttpUpload(){
	
	var filepath = document.getElementById("saveText").value;
	var urlpath = document.getElementById("urlText").value;
	var jsonObj = {FuncName:'camUpdataFileHttp',argument:{filePath:filepath, url:urlpath,param:"",response:""}};
	sendWsMessage(jsonObj);
	
}
//读取二代证
function ReadIDCard()
{
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'idcardrfidReadIDCard',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}
//读取社保卡
function ReadSBKCard()
{
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'ReadSBKCaard',argument:{}};
	sendWsMessage(jsonObj);	
}
//拍照base64
function CaptureBase64()
{
	$("#cutStyle").get(0).selectedIndex = 1;
	SetCutStyle();
	Capture();
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'FileEncodeBase64',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}
//遍历文件夹
function FindJPGFile()
{
	var filepath = document.getElementById("saveText").value;
	var allfiepath;
	var jsonObj = {FuncName:'getFolderDayFileA',argument:{Dictpry:filepath}};
	sendWsMessage(jsonObj);
}
//删除文件夹
function RemoveDictory()
{
	var filepath = document.getElementById("Distory").value;
	var jsonObj = {FuncName:'DeleteFolderDayFileA',argument:{Dictpry:filepath}};
	sendWsMessage(jsonObj);
}
//设置DPI
function DPISet(){
	
	var xdpi = document.getElementById("dpix").value;
	var ydpi = document.getElementById("dpiy").value;
	var jsonObj = {FuncName:'camSetImageDPI',argument:{xDPI:parseInt(xdpi),yDPI:parseInt(ydpi)}};
	sendWsMessage(jsonObj);
}
//设置JPG压缩率
function JPGQSet()
{
	var JPGQ = document.getElementById("jpg").value;
	var jsonObj = {FuncName:'camSetImageJPGQuanlity',argument:{quanlity:parseInt(JPGQ)}};
	sendWsMessage(jsonObj);
}
function showBase64info(str)
{
	
	alert("Base64数据为："+ str);
	
}

function getDialog(){
	if (frameElement)
		return frameElement.api;
};

function getWindow(){ 
	if(frameElement&&typeof(frameElement.api) == "object") {
		return frameElement.api.opener;//如果是窗口 则获得 主窗口window
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

var $dl = getDialog();

var $win = getWindow();

var $pWin = getParentWindow();



