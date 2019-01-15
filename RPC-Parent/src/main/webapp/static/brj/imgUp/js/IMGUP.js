//*******************************************
//2017年2月24日 0:05 由 金小燕 结束编写
//初步功能实现，仅做参考使用
//生产中使用需要继续完善，无js注入防御
//*******************************************


var IMG_LENGTH = 50;//图片最大1MB
var IMG_MAXCOUNT = 50;//最多选中图片张数
//var IMG_AJAXPATH = saveFileUrl;//异步传输服务端位置

//alert(IMG_AJAXPATH);
var UP_IMGCOUNT = 0;//上传图片张数记录
var UP_IMGCOUNTS = 100000;
var attachIds="";//删除的原文id的集合
var newArray = new Array();
var marObj=$(".fos")[0];//材料对象
var geshi=".png,.jpg,.jpeg,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.txt";
var geshiImg=".png,.jpg,.jpeg,.bmp";
//打开文件选择对话框
var inputIdA="";
$("#div_imgfile").click(function () {
    if ($(".lookimg").length >= IMG_MAXCOUNT) {
        alert("一次最多上传" + IMG_MAXCOUNT + "张图片");
        return;
    }
   
    var _CRE_FILE = document.createElement("input");
    var _CRE_Form = document.createElement("form");
    if ($(".imgfile").length <= $(".lookimg").length) {//个数不足则新创建对象
    	_CRE_FILE.setAttribute("type", "file");
    	_CRE_FILE.setAttribute("num", UP_IMGCOUNT);//记录此对象对应的编号
    	_CRE_FILE.setAttribute("class", "imgfile");
    	_CRE_FILE.setAttribute("onchange", "changeImg(this)");
    	_CRE_FILE.setAttribute("accept",geshi);
        _CRE_FILE.setAttribute("multiple", "multiple");//多文件上传 
        _CRE_FILE.setAttribute("id","uploadId"+UP_IMGCOUNT);
        _CRE_FILE.setAttribute("name","filename");
        inputIdA="uploadId"+UP_IMGCOUNT;
        _CRE_FILE.setAttribute("inputIdA",inputIdA);
        
        _CRE_FILE.focus();
        //_CRE_Form.setAttribute("id","formId"+UP_IMGCOUNT);
       // $(_CRE_Form).append(_CRE_FILE);
        $("#div_imgfile").after(_CRE_FILE);
        
    }
    else { //否则获取最后未使用对象
        _CRE_FILE = $(".imgfile").eq(0).get(0);
    }
  
    return $(_CRE_FILE).click();//打开对象选择框
});
//预览
var lookimgAnimate=function(num) {
	
	var motai = document.getElementById('mo');
	var moimgImg = document.getElementById("moimgImg");
	var moimgDiv = document.getElementById("moimgDiv");
	moimgDiv.setAttribute("num",num);
	moimgImg.setAttribute("num",num);
	moimgDiv.style.display = "none";
	motai.style.display = "block";
	moimgImg.style.display = "block";
	moimgImg.src = $("#lookimgAnimate"+num).attr("src");
	var span = document.getElementById("close");
	/* var showdiv=document.createElement('div');

     showdiv.setAttribute('id','topdiv');
     showdiv.setAttribute("style",'position:fixed;left:10%;top:10%;right:10%;background-color:red;z-index:999;width:100%;height:100%;');
     var showImg1=document.createElement('img');
     showImg1.src = $("#lookimgAnimate"+num).attr("src");
     
     
     
     var tt=document.createTextNode('我是iframe弹出层');
     $(window.parent.document.body).css("position","relative");
     window.parent.document.body.appendChild(showdiv).appendChild(motai)
     window.parent.document.body.appendChild(showdiv).appendChild(span);*/
	span.onclick = function() {
		motai.style.display = "none";
	};
	
	/*var allScreen  = document.getElementById("allScreen");
	allScreen.onclick = function() {
		var showdiv=document.createElement('div');

	     showdiv.setAttribute('id','topdiv');
	     showdiv.setAttribute("style",'position:fixed;left:1%;top:1%;right:10%;background-color:red;z-index:999;width:100%;height:100%;');
	     var showImg1=document.createElement('img');
	     showImg1.setAttribute('position','relative');
	     showImg1.src = $("#lookimgAnimate"+num).attr("src");
	     window.parent.document.body.appendChild(showdiv).appendChild(showImg1);
	     
	     showdiv.onclick = function(){
	    	
	    	 showdiv.style.display = "none";
	     };
	     var span = document.createElement('span');
	     span.setAttribute('style','font-size:40px;cursor:pointer;font-weight:bold;top:2%;right:40px;color:white;');
	     span.setAttribute('id','topdiv');
	     window.parent.document.body.appendChild(showdiv).appendChild(span);
	};*/
	
};
//ie8+
var lookimgAnimateIE8=function(num) {
	
	var motai = document.getElementById('mo');
	var moimgDiv = document.getElementById("moimgDiv");
	var moimgImg = document.getElementById("moimgImg");
	moimgDiv.setAttribute("num",num);
	moimgImg.setAttribute("num",num);
	
	moimgImg.style.display = "none";
	motai.style.display = "block";
	moimgDiv.style.display = "block";
	//document.getElementById("imgDivId"+num).innerHTML = "";
	$("#moimgDiv").attr("style",$("#imgDivId"+num).attr("style"));// 使用滤镜效果www.2cto.com
	
	/*var ddd=$("#inputFileUpload").clone();

	ddd.setAttribute('id','topdiv');

	ddd.setAttribute("style",'position:absolute;z-index:999;width:300px;height:300px;');

    var tt=document.createTextNode('我是iframe弹出层');

    window.parent.document.body.appendChild(ddd).appendChild(tt);
*/
	
	var span = document.getElementById("close");
	span.onclick = function() {
		motai.style.display = "none";
	};
};


function isIE() { // ie?
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}

if(!isIE()){
	$("#inputFileUpload").remove();
}

//判断ie版本
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}
//上一页or 下一页；
function changePage(f){
	
	var num=$("#moimgDiv").attr("num");
	var entityId=$(".fos").attr("entityId");
	var count=$("img[entityId="+entityId+"]").length;
	var frist=$("img[entityId="+entityId+"]")[0].id.split("lookimgAnimate")[1];
	var end=$("img[entityId="+entityId+"]")[Number(count)-1].id.split("lookimgAnimate")[1];
	
	if(f==2&&num>=end){
		num=num-1;
		alert("最后一页");
		return false;
	}else if(f==1&&num<=frist){
		num=num+1;
		alert("当前是第一页");
		return false;
	}
	
	if(f==1){//上一页
		num=Number(num)-1;
		$("#moimgImg").attr("num",num);
		$("#moimgDiv").attr("num",num);
		
	}else if(f==2){//下一页
		num=Number(num)+1;
		$("#moimgImg").attr("num",num);
		$("#moimgDiv").attr("num",num);	
	}
	if($("#lookimgAnimate"+num).attr("display")=="none"){
		$("#moimgDiv").attr("display","block");
		$("#moimgImg").attr("display","none");
		$("#moimgDiv").attr("style",$("#imgDivId"+num).attr("style"));
		$("#moimgImg").attr("src",$("#lookimgAnimate"+num).attr("src"));
	}else{
		$("#moimgDiv").attr("display","none");
		$("#moimgImg").attr("display","block");
		$("#moimgImg").attr("src",$("#lookimgAnimate"+num).attr("src"));
		$("#moimgDiv").attr("style",$("#imgDivId"+num).attr("style"));
	}
	
}

$("#mo").live("click",function(){
	return false;
});

//鼠标移入
function onmouseupBtnOver(obj ,f) {
	
	if(f==1){
		$(obj).css("background-position","-46px 0");
	}else{

		$(obj).css("background-position","-46px -87px");
	}
	
};
//鼠标移出
function onmouseupBtnOut(obj,f) {
	if(f==1){
		$(obj).css("background-position","");
	}else{

		$(obj).css("background-position","0 -87px");
	}
};
//解决ie8无法上传
function changeImg1(f){
	
		var _CRE_FILE = $("#inputFileUpload").clone();
		
		$("#inputFileUpload").attr("num", UP_IMGCOUNT);//记录此对象对应的编号
		$("#inputFileUpload").attr("class", "imgfile");
		$("#inputFileUpload").attr("accept",geshi);
		$("#inputFileUpload").attr("multiple", "multiple");//多文件上传 
		//$("#inputFileUpload").attr("name","uploadId"+UP_IMGCOUNT);
		$("#inputFileUpload").attr("name","filename");
       inputIdA="uploadId"+UP_IMGCOUNT;
       $("#inputFileUpload").attr("inputIdA",inputIdA);
		$("#inputFileUpload").attr("id","uploadId"+UP_IMGCOUNT);

       $("#uploadId"+UP_IMGCOUNT).before(_CRE_FILE);
       $("#div_imgfile").after(document.getElementById("uploadId"+UP_IMGCOUNT));
      
       changeImg(document.getElementById("uploadId"+UP_IMGCOUNT));
        
}

function changeImg(f){
	if ($(f).val().length > 0) {//判断是否有选中图片
    	
        //判断图片格式是否正确
        var FORMAT = $(f).val().substr($(f).val().length - 3, 3).toLowerCase();
         if (geshi.lastIndexOf(FORMAT) <0  ) {
            alert("文件格式不正确！！！");
            return;
        }
         
         if (document.all && ( IEVersion()==8 || IEVersion()==9)){//浏览器
        	 
        	 var filename=f.value.substring(f.value.lastIndexOf("\\")+1);
        	 
        	 //创建预览外层
             var _prevdiv = document.createElement("div");
             _prevdiv.setAttribute("class", "lookimg");
             _prevdiv.setAttribute("inputIdA", inputIdA);
             
             $(_prevdiv).addClass($(".fos").attr("lx")+"tp");
             //创建内层img对象
             var preview = document.createElement("img");
             preview.setAttribute("title",filename); 
             preview.setAttribute("alt",""); 
             preview.setAttribute("num",UP_IMGCOUNT); 
             preview.setAttribute("onclick","lookimgAnimateIE8("+UP_IMGCOUNT+")"); 
             preview.setAttribute("id","lookimgAnimate"+UP_IMGCOUNT);
             preview.setAttribute("cllx",$(".fos span:eq(0)").text());
             preview.setAttribute("classnumber",$(".fos").attr("classnumber"));
             preview.setAttribute("entityId",$(".fos").attr("entityId"));
             $(_prevdiv).append(preview);
             //创建删除按钮
             var IMG_DELBTN = document.createElement("div");
             IMG_DELBTN.setAttribute("class", "lookimg_delBtn");
             IMG_DELBTN.innerHTML = "移除";
             $(_prevdiv).append(IMG_DELBTN);
             //创建进度条
             var IMG_PROGRESS = document.createElement("div");
             IMG_PROGRESS.setAttribute("class", "lookimg_progress");
             $(IMG_PROGRESS).append(document.createElement("div"));
             $(_prevdiv).append(IMG_PROGRESS);
             //记录此对象对应编号
             _prevdiv.setAttribute("num", UP_IMGCOUNT);
             _prevdiv.setAttribute("id", "imgDivId"+UP_IMGCOUNT);
             //对象注入界面
             //$("#div_imglook").children("div:last").before(_prevdiv);
             $("#div_imglook").children("div:last").after(_prevdiv);
            
             
        	// f.select();
        	// f.blur();
 			var path = document.selection.createRange().text;
 			
 			path=f.value;
 			//document.getElementById("imgDivId"+UP_IMGCOUNT).innerHTML = "";
 			document.getElementById("imgDivId"+UP_IMGCOUNT).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""
 					+ path + "\")";// 使用滤镜效果www.2cto.com
        	         	 
 			 UP_IMGCOUNT++;//编号增长防重复
 			 
 			 type=filename.substring(filename.lastIndexOf(".")).toLowerCase();
             
             if(geshiImg.indexOf(type)>-1){
 		    	
    		    }else{
    		    	preview.setAttribute("title", "非图片文件，无法查看");
    		       	 preview.src = "./img/img6.jpg";//返回路径
    		    }
             //alert($(".fos .number:eq(0)").text())
             $(".fos .number:eq(0)").text(parseInt($(".fos .number:eq(0)").text())+1);
        	 
         }else{
        //判断图片是否过大，当前设置1MB
             //var files = document.getElementById("uploadId0").files; 
              var files=f.files;//获取file文件对象 uploadId0
            
             $.each(files ,function(i,file){
             	
             	if (file.size > (IMG_LENGTH * 1024 * 1024)) {
                     alert("图片大小不能超过" + IMG_LENGTH + "MB");
                     $(f).val("");
                     return;
                 }
                 //创建预览外层
                 var _prevdiv = document.createElement("div");
                 _prevdiv.setAttribute("class", "lookimg");
                 _prevdiv.setAttribute("inputIdA", inputIdA);
                 
                 $(_prevdiv).addClass($(".fos").attr("lx")+"tp");
                 //创建内层img对象
                 var preview = document.createElement("img");
                 preview.setAttribute("title",file.name); 
                 preview.setAttribute("alt",file.name); 
               
                 preview.setAttribute("onclick","lookimgAnimate("+UP_IMGCOUNT+")"); 
                 preview.setAttribute("id","lookimgAnimate"+UP_IMGCOUNT);
                 preview.setAttribute("cllx",$(".fos span:eq(0)").text());
                 preview.setAttribute("classnumber",$(".fos").attr("classnumber"));
                 preview.setAttribute("entityId",$(".fos").attr("entityId"));
                 $(_prevdiv).append(preview);
                 //创建删除按钮
                 var IMG_DELBTN = document.createElement("div");
                 IMG_DELBTN.setAttribute("class", "lookimg_delBtn");
                 IMG_DELBTN.innerHTML = "移除";
                 $(_prevdiv).append(IMG_DELBTN);
                 //创建进度条
                 var IMG_PROGRESS = document.createElement("div");
                 IMG_PROGRESS.setAttribute("class", "lookimg_progress");
                 $(IMG_PROGRESS).append(document.createElement("div"));
                 $(_prevdiv).append(IMG_PROGRESS);
                 //记录此对象对应编号
                 _prevdiv.setAttribute("num", UP_IMGCOUNT);
                 //对象注入界面
                 //$("#div_imglook").children("div:last").before(_prevdiv);
                 $("#div_imglook").children("div:last").after(_prevdiv);
                 UP_IMGCOUNT++;//编号增长防重复
                
                 type=file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
                
                 if(geshiImg.indexOf(type)>-1){
     		    	
     		    	 	 //预览功能 start
     		            var reader = new FileReader();//创建读取对象
     		            reader.onloadend = function () {
     		                preview.src = reader.result;//读取加载，将图片编码绑定到元素
     		            };
     		            if (file) {//如果对象正确
     		                reader.readAsDataURL(file);//获取图片编码
     		            } else {
     		            	
     		                preview.src = "./img/img6.jpg";//返回空值
     		            }
        		    }else{
        		    	preview.setAttribute("title", "非图片文件，无法查看");
        		       	 preview.src = "./img/img6.jpg";//返回路径
        		    }
                 
                 $(".fos .number:eq(0)").text(parseInt($(".fos .number:eq(0)").text())+1);
             });
             
         }
        
        //预览功能 end
    }
}

function PreviewImage(imgFile) {
	var filextension = imgFile.value.substring(imgFile.value.lastIndexOf("."),
			imgFile.value.length);
	filextension = filextension.toLowerCase();
	if ((filextension != '.jpg') && (filextension != '.gif')
			&& (filextension != '.jpeg') && (filextension != '.png')
			&& (filextension != '.bmp')) {
		alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
		imgFile.focus();
	} else {
		var path;
		if (document.all)// IE
		{
			imgFile.select();
			path = document.selection.createRange().text;
			document.getElementById("imgPreview").innerHTML = "";
			document.getElementById("imgPreview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""
					+ path + "\")";// 使用滤镜效果www.2cto.com
		} else// FF
		{
			path = imgFile.files[0].getAsDataURL();
			document.getElementById("img1").src = path;
		}
	}
}



var createimg = function(base64){
	if (document.all && ( IEVersion()==8 || IEVersion()==9)){//浏览器
		//创建预览外层
        var _prevdiv = document.createElement("div");
        _prevdiv.setAttribute("class", "lookimg");
        _prevdiv.setAttribute("inputIdA", inputIdA);
        
        $(_prevdiv).addClass($(".fos").attr("lx")+"tp");
        //创建内层img对象
        var preview = document.createElement("img");
        preview.setAttribute("title",$($win.marObj).text() + new Date().getTime()); 
        preview.setAttribute("alt",$($win.marObj).text() + new Date().getTime());
        preview.setAttribute("onclick","lookimgAnimate("+$win.UP_IMGCOUNT+")"); 
        preview.setAttribute("id","lookimgAnimate"+$win.UP_IMGCOUNT);
        preview.setAttribute("cllx",$($win.marObj).text());
        preview.setAttribute("classnumber",$($win.marObj).attr("classnumber"));
        preview.setAttribute("entityId",$($win.marObj).attr("entityId"));
        preview.setAttribute("lx","1");
        $(_prevdiv).append(preview);
        //创建删除按钮
        var IMG_DELBTN = document.createElement("div");
        IMG_DELBTN.setAttribute("class", "lookimg_delBtn");
        IMG_DELBTN.innerHTML = "移除";
        $(_prevdiv).append(IMG_DELBTN);
        //创建进度条
        var IMG_PROGRESS = document.createElement("div");
        IMG_PROGRESS.setAttribute("class", "lookimg_progress");
        $(IMG_PROGRESS).append(document.createElement("div"));
        $(_prevdiv).append(IMG_PROGRESS);
        //记录此对象对应编号
        _prevdiv.setAttribute("num", $win.UP_IMGCOUNT);
        _prevdiv.setAttribute("id", "imgDivId"+$win.UP_IMGCOUNT);
        $("#div_imglook").children("div:last").after(_prevdiv);
	    type="jpg";
	    preview.src = "data:image/jpeg;base64,"+base64;//返回路径
	    $(preview).hide();
	    var path = "C:\\temp\\ygzw\\gp\\";
		document.getElementById("imgDivId"+$win.UP_IMGCOUNT).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\""
					+ path + $win.imgcount + ".jpg\")";// 使用滤镜效果www.2cto.com
		$win.UP_IMGCOUNT++;//编号增长防重复
		$win.imgcount++;
		_prevdiv.removeAttribute("class");
		$(_prevdiv).addClass("lookimg");
		IMG_DELBTN.removeAttribute("class");
		$(IMG_DELBTN).addClass("lookimg_delBtn");
		IMG_PROGRESS.removeAttribute("class");
		$(IMG_PROGRESS).addClass("lookimg_progress");
    }else{
    	//创建预览外层
        var _prevdiv = document.createElement("div");
        _prevdiv.setAttribute("class", "lookimg");
        _prevdiv.setAttribute("inputIdA", "uploadId"+$win.UP_IMGCOUNT);
        
        $(_prevdiv).addClass($($win.marObj).attr("lx")+"tp");
        //创建内层img对象
        var preview = document.createElement("img");
        preview.setAttribute("title",$($win.marObj).text() + new Date().getTime()); 
        preview.setAttribute("alt",$($win.marObj).text() + new Date().getTime()); 
      
        preview.setAttribute("onclick","lookimgAnimate("+$win.UP_IMGCOUNT+")"); 
        preview.setAttribute("id","lookimgAnimate"+$win.UP_IMGCOUNT);
        preview.setAttribute("cllx",$($win.marObj).text());
        preview.setAttribute("classnumber",$($win.marObj).attr("classnumber"));
        preview.setAttribute("entityId",$($win.marObj).attr("entityId"));
        preview.setAttribute("lx","1");
        $(_prevdiv).append(preview);
        //创建删除按钮
        var IMG_DELBTN = document.createElement("div");
        IMG_DELBTN.setAttribute("class", "lookimg_delBtn");
        IMG_DELBTN.innerHTML = "移除";
        $(_prevdiv).append(IMG_DELBTN);
        //创建进度条
        var IMG_PROGRESS = document.createElement("div");
        IMG_PROGRESS.setAttribute("class", "lookimg_progress");
        $(IMG_PROGRESS).append(document.createElement("div"));
        $(_prevdiv).append(IMG_PROGRESS);
        //记录此对象对应编号
        _prevdiv.setAttribute("num", $win.UP_IMGCOUNT);
        //对象注入界面
        //$("#div_imglook").children("div:last").before(_prevdiv);
        $("#div_imglook").children("div:last").after(_prevdiv);
        $win.UP_IMGCOUNT++;//编号增长防重复
        type="jpg";
        preview.src = "data:image/jpeg;base64,"+base64;//返回路径
    }
   /* $("#yulanImg").attr("src","");
	$("#gaopaiDiv").attr("style","display:none");
    $("#yulanImg").attr("style","display:block;width:400px;height:300px;");
    $("#yulanImg").attr("src",preview.src);*/
};
//删除选中图片
$(".lookimg_delBtn").live("click", function () {
    $(".imgfile[num=" + $(this).parent().attr("num") + "]").remove();//移除图片file
    var str = $(this).parent().attr("class");
    str = str.replace(" ","");
    str = str.replace("lookimg","");
    str = str.replace("tp","");
    $("[lx='"+str+"'] .number").text(parseInt($("[lx='"+str+"'] .number").text())-1);
    $(this).parent().remove();//移除图片显示
    var attachId = $(this).parent().attr("uziid");
    newArray.push(attachId);
    attachIds = newArray.join(",");
});

//删除按钮移入移出效果
$(".lookimg").live("mouseover", function () {
   // if ($(this).attr("ISUP") != "1")
        $(this).children(".lookimg_delBtn").eq(0).css("display", "block");
    
});
$(".lookimg").live("mouseout", function () {
    $(this).children(".lookimg_delBtn").eq(0).css("display", "none");;
});


function getUpFileCount(){//获取上传数量；
	 //循环所有已存在的图片对象，准备上传
    var firstUp="";
    var upFileCount=0;
	 for (var i = 0; i < $(".lookimg").length; i++) {
    	
	        var NOWLOOK = $(".lookimg").eq(i);//当前操作的图片预览对象
	     
	        NOWLOOK.index = i;
	        //如果当前图片已经上传，则不再重复上传
	        if (NOWLOOK.attr("ISUP") == "1"){
	            continue;
	          }
	       
	        if (NOWLOOK.attr("uziid") != null && NOWLOOK.attr("uziid") != ""){
	        	
	            continue;
	          }
	       
	        if(NOWLOOK.attr("inputIdA")!=firstUp){
	        	firstUp=NOWLOOK.attr("inputIdA");
	        	upFileCount++;
	        }
	   
	    }
	 return upFileCount;
}

//确定上传按钮

var ImgUpStart = function (saveFileUrl,deleteUrl,bizId,ids,ticket,aga001) {
	var upFileCount=getUpFileCount();//上传数量
	
	var allAttachId="";
	if(ids==null||ids==""){
		allAttachId = attachIds;
	}else{
		allAttachId = ids+","+attachIds;
	}
	var tempNum=0;

    //循环所有已存在的图片对象，准备上传
    var firstUp="";
   
    for (var i = 0; i < $(".lookimg").length; i++) {
    	 
        var NOWLOOK = $(".lookimg").eq(i);//当前操作的图片预览对象
        NOWLOOK.index = i;
        //如果当前图片已经上传，则不再重复上传
        if (NOWLOOK.attr("ISUP") == "1"){
            continue;
           }
       
        //上传图片准备
       var IMG_BASE = NOWLOOK.children("img").eq(0).attr("src"); //要上传的图片的base64编码
        var cllx = NOWLOOK.children("img").eq(0).attr("cllx"); //要上传的图片的材料类型名称
        var lx = NOWLOOK.children("img").eq(0).attr("lx"); //0上传，1高拍
        var classnumber = NOWLOOK.children("img").eq(0).attr("classnumber"); //要上传的图片的材料id
        var entityId = NOWLOOK.children("img").eq(0).attr("entityId"); //要上传的图片的材料id
        if(lx=1){
        	var title = NOWLOOK.children("img").eq(0).attr("title")+".jpg"; //要上传的图片的材料id
        }
        var IMG_IND = NOWLOOK.attr("num");
        var IMG_ROUTE = $(".imgfile[num=" + IMG_IND + "]").eq(0).val();//获取上传图片路径，为获取图片类型使用
        //var IMG_ENDFOUR = IMG_ROUTE.substr(IMG_ROUTE.length - 4, 4);//截取路径后四位，判断图片类型
        var IMG_FOMATE = "jpeg"; //图片类型***
      
        if (NOWLOOK.attr("uziid") != null && NOWLOOK.attr("uziid") != ""){
        	var UPTIME = Math.ceil(Math.random() * 400) + 400;//生成一个400-800的随机数，假设进图条加载时间不一致
        	NOWLOOK.children(".lookimg_progress").eq(0).css("display", "block");//进度条显示
        	NOWLOOK.children(".lookimg_delBtn").eq(0).remove();
        	NOWLOOK.eq(i).attr("ISUP", "1");
        	$(".lookimg").eq(i).children(".lookimg_progress").eq(0).children("div").eq(0).animate({ width: "100%" }, UPTIME, function () {
                $(this).css("background-color", "#00FF00").text('证照复用无需上传');
            });
            continue;
          }
        
        NOWLOOK.children(".lookimg_progress").eq(0).css("display", "block");//进度条显示
        if(NOWLOOK.attr("inputIdA")!=firstUp){
        	tempNum++;
            if(tempNum==upFileCount){//全部上传结束
            	classnumber=1;
            }else{
            	classnumber=-1;
            }
        	firstUp=NOWLOOK.attr("inputIdA");
            var uploadId="uploadId"+IMG_IND;
            var dirName  = $("#"+uploadId).val()==null?"":$("#"+uploadId).val();
    		var length   = dirName.split("\\").length;
    		var fileFileName = dirName.split("\\")[length-1];
    		fileFileName     = encodeURIComponent(fileFileName);
            var strJson={ "xzqh":xzqh,"title":title,"imgBase":IMG_BASE,"fileFileName":fileFileName,"uploadId":uploadId, "imgFormat": IMG_FOMATE, "lookIndex": NOWLOOK.index,"cllx":cllx,"lujing":IMG_ROUTE,"classnumber":classnumber,"bizId":bizId ,"entityId":entityId,"allAttachId":allAttachId,"ticket":ticket,"aga001":aga001};
           
            if( $("#"+uploadId).length < 1 ){
            	uploadId = "filename";
            }
            //图片上传之前执行的操作，当前为进度条显示
            $.ajaxFileUpload({
    			url          :saveFileUrl,//fileName='+abc, //fileName='+abc, 
    			secureuri    :false,//是否启用安全提交
    			fileElementId:uploadId,//表示文件域ID
    			data:strJson,
    			dataType 	 :'json',
    			success		 :function(data,status){//提交成功后处理函数	
    				if (data.isok == 1) {
    					dzdaId = data.dzdaId;
                        //图片上传成功回调
                        var UPTIME = Math.ceil(Math.random() * 400) + 400;//生成一个400-800的随机数，假设进图条加载时间不一致
                        $(".lookimg").eq([data.ind]).attr("ISUP", "1");//记录此图片已经上传
                        $(".lookimg").eq([data.ind]).children(".lookimg_progress").eq(0).children("div").eq(0).animate({ width: "100%" }, UPTIME, function () {
                            $(this).css("background-color", "#00FF00").text('上传成功');
                        });
//                        location.reload();
    				}
                    else {//图片未上传成功回调
                    	$(".lookimg").eq([data.ind]).children(".lookimg_progress").eq(0).children("div").eq(0).animate({ width: "100%" }, UPTIME, function () {
                            $(this).css("background-color", "#DC143C").text('上传失败');
                    	});
                    }
    			},
                error: function (data, status, e) {
                    //服务器连接失败报错处理
                	alert("保存失败，请联系系统管理员！");
                    //alert(err.responseText);
                },
                beforeSend: function () {
                	
                    //图片上传之前执行的操作，当前为进度条显示
                    NOWLOOK.children(".lookimg_progress").eq(0).css("display", "block");//进度条显示
                }			
    		});	
        }else{
        	
        	var UPTIME = Math.ceil(Math.random() * 400) + 400;//生成一个400-800的随机数，假设进图条加载时间不一致
            $(".lookimg").eq([NOWLOOK.index]).attr("ISUP", "1");//记录此图片已经上传
            $(".lookimg").eq([NOWLOOK.index]).children(".lookimg_progress").eq(0).children("div").eq(0).animate({ width: "100%" }, UPTIME, function () {
                $(this).css("background-color", "#00FF00").text('上传成功');
            });
        }
   
    }

  if(allAttachId!=null&&allAttachId!=""){
	  $.dialog.tips('正在处理中...',0.1,'loading.gif',undefined,2300);
    $.ajax({
        type: "POST",
        url: deleteUrl,
        data: {"allAttachId":allAttachId},
        dataType: "json",
        async:false,
        success: function (data) {
        	
        	$.dialog.tips('正在处理中...',0.1,'loading.gif',undefined,0.1);
        	$.dialog.tips('删除成功',0.1,'loading.gif',undefined,0.1);
        	alert("删除成功！");
        	//location.reload();
        	
        },
        error: function (err) {
            //服务器连接失败报错处理
        	$.dialog.tips('正在处理中...',0.1,'loading.gif',undefined,0.1);
        	$.dialog.tips('删除失败',0.1,'loading.gif',undefined,0.1);
        	alert("保存失败，请联系系统管理员！");
            //alert(err.responseText);
            //location.reload();
        }
    });
    }
};