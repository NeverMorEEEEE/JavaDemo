//条目新增所需字段，标*为必填

/*
(function($) { //这里写插件代码  
	$.fn.MaterialUploadJingtoo=function(options){
		var MaterialUploadJingtoo = this; //定义动态表；
		 var other;//数据状态*
		 var state="办理中";//业务经办状态*
		 var operated="2017-07-08 12:57:57";//初始业务操作时间*
		 var ywmc="生育保险";//业务名称*
		 var flh="gl03.05";//该笔业务归档所对应的档案分类编号*
		 var sfzh="222";//身份证号码
		 var xm="二十三";//姓名
		 var dwbh="";//单位编号
		 var dwmc="";//单位名称
		 var rybh="";//人员编号
		 var pzbh="";//凭证编号
		 var gsny="";//归属年月
		 var gsd="";//归属地
		 var rq="";//日期
		 var fl="";//分类
		 var bz="";//备注
		 var privates;//私有字段信息
		 var ywxw;//业务行为（如拟稿、修改、核稿、会办、签发）
		 var clry;//处理人员
		 var clsj;//处理时间
		 var cljg;//处理机构
		 var bizId="153545451237";
		 var dzdaId;
		 var idcard="222";*/
		 //原文新增所需字段，标*为必填
		 var classnumber;//分类编号*
		//各个ajax提交地址
		 var recordId="";//条目id
		 var fileInputstreamUrl= "";//获取文件流地址
		 var saveRecordUrl= "";//获取业务基本信息地址
		 var saveFileUrl= "";//获取保存文件地址
		 var materialUrl="";//获取获取材料地址
		 var changeDataStateUrl="";//数据状态传输接口
		 var deleteUrl="";
		 var options;
		 var bussData;
		 var isUpflag=false;//是否点击保存
		 var MyArray = new Array();//存放删除的材料id
		 var ids = "";
		 var bizzId="";//业务流水号
		 var datatransmission = function(options){
			bussData.sfzh = $("[name='applyCardNumber']",parent.document).val();
			bussData.xm = $("[name='applyName']",parent.document).val();
			$.ajax({
					    url:saveRecordUrl,
					    type:'POST', //GET
					  //  async:true,    //或false,是否异步
					    data:{
					    	"other":bussData.other,"state":bussData.state,"operated":bussData.operated,"ywmc":bussData.ywmc,"flh":bussData.flh,"bizId":bussData.bizId,
					    	"sfzh":bussData.sfzh,"xm":bussData.xm,"dwbh":bussData.dwbh,"dwmc":bussData.dwmc,"rybh":bussData.rybh,"pzbh":bussData.pzbh,"gsny":bussData.gsny,
					    	"gsd":bussData.gsd,"rq":bussData.rq,"fl":bussData.fl,"bz":bussData.bz,"private":bussData.privates,"ywxw":bussData.ywxw,"clry":bussData.clry,"clsj":bussData.clsj,"cljg":bussData.cljg
					    ,"ids":ids,"xzqh":xzqh,"ticket":bussData.ticket,"aga001":bussData.aga001},
					    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
					    success:function(data,textStatus,jqXHR){
					    	var data=eval(data);
							var obj=data[0]; 
							if (obj.list == null || obj.list ==''){
								alert("保存失败，请联系系统管理员！");
								return false;
							}
							var list = obj.list;
							ids=list[0];
							
							var biz = list[1];
					    	ImgUpStart(saveFileUrl,deleteUrl,biz,ids,bussData.ticket,bussData.aga001);
					    },
					    error:function(xhr,textStatus){
					    	alert("保存失败，请联系系统管理员！");
					    }
					});
			};

		var sowhid = function (lx){
			 marObj=$(".fos")[0];//材料对象
			$(".lookimg").hide();
			$("."+lx).show();
		};
		var loadimg = function (path,lx,id,attchmentId,entityId,type,fileName){
			
		    var _CRE_FILE = document.createElement("input");
		    if ($(".imgfile").length <= $(".lookimg").length) {//个数不足则新创建对象
		        _CRE_FILE.setAttribute("type", "file");
		        _CRE_FILE.setAttribute("class", "imgfile");
		        _CRE_FILE.setAttribute("accept", ".png,.jpg,.jpeg");
		        _CRE_FILE.setAttribute("num", UP_IMGCOUNT);//记录此对象对应的编号
		        _CRE_FILE.setAttribute("value",path);
		        $("#div_imgfile").after(_CRE_FILE);
		    } else { //否则获取最后未使用对象
		        _CRE_FILE = $(".imgfile").eq(0).get(0);
		    }
		    
		    
		    var _prevdiv = document.createElement("div");
		    _prevdiv.setAttribute("uziid",id);
		    _prevdiv.setAttribute("class", "lookimg");
		    $(_prevdiv).addClass(lx+"tp");
		    //创建内层img对象
		    var preview = document.createElement("img");
		   
		    preview.setAttribute("title",fileName); 
		    preview.setAttribute("alt",fileName); 
		    preview.setAttribute("onclick","lookimgAnimate("+UP_IMGCOUNT+")"); 
		    preview.setAttribute("id","lookimgAnimate"+UP_IMGCOUNT);
		    preview.setAttribute("attchmentId",attchmentId);
		    preview.setAttribute("entityId",entityId);
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
		    _prevdiv.setAttribute("num", $(_CRE_FILE).attr("num"));
		    //记录此对象对应编号
		    _prevdiv.setAttribute("ISUP", "1");
		    //对象注入界面
		    //$("#div_imglook").children("div:last").before(_prevdiv);
		    $("#div_imglook").children("div:last").after(_prevdiv);
		    UP_IMGCOUNT++;//编号增长防重复
		    
		    if(geshiImg.lastIndexOf(type.toLowerCase())>-1){
		    	 preview.src = path;//返回路径
		    }else{
		    	preview.setAttribute("title", "非图片文件，无法查看");
		       	 preview.src = "./img/img6.jpg";//返回路径
		    }
		};
		var loadviewimg = function (path,lx,id,attchmentId,entityId,type,fileName){
		    var _CRE_FILE = document.createElement("input");
		    if ($(".imgfile").length <= $(".lookimg").length) {//个数不足则新创建对象
		        _CRE_FILE.setAttribute("type", "file");
		        _CRE_FILE.setAttribute("class", "imgfile");
		        _CRE_FILE.setAttribute("accept", ".png,.jpg,.jpeg");
		        _CRE_FILE.setAttribute("num", UP_IMGCOUNT);//记录此对象对应的编号
		        _CRE_FILE.setAttribute("value",path);
		        $("#div_imgfile").after(_CRE_FILE);
		    } else { //否则获取最后未使用对象
		        _CRE_FILE = $(".imgfile").eq(0).get(0);
		    }
		    
		    
		    var _prevdiv = document.createElement("div");
		    _prevdiv.setAttribute("uziid",id);
		    _prevdiv.setAttribute("class", "lookimg");
		    $(_prevdiv).addClass(lx+"tp");
		    //创建内层img对象
		    var preview = document.createElement("img");
		   
		    preview.setAttribute("title",fileName); 
		    preview.setAttribute("alt",fileName); 
		    preview.setAttribute("onclick","lookimgAnimate("+UP_IMGCOUNT+")"); 
		    preview.setAttribute("id","lookimgAnimate"+UP_IMGCOUNT);
		    preview.setAttribute("attchmentId",attchmentId);
		    preview.setAttribute("entityId",entityId);
		    $(_prevdiv).append(preview);
		    //记录此对象对应编号
		    _prevdiv.setAttribute("num", $(_CRE_FILE).attr("num"));
		    //记录此对象对应编号
		    _prevdiv.setAttribute("ISUP", "1");
		    //对象注入界面
		    //$("#div_imglook").children("div:last").before(_prevdiv);
		    $("#div_imglook").children("div:last").after(_prevdiv);
		    UP_IMGCOUNT++;//编号增长防重复
		    if(geshiImg.lastIndexOf(type.toLowerCase())>-1){
		    	 preview.src = path;//返回路径
		    }else{
		    	preview.setAttribute("title", "非图片文件，无法查看");
		       	 preview.src = "./img/img6.jpg";//返回路径
		    }
		   
		    
		};
		var MaterialViewJingtoo = function(options){
			bussData =options.BussinessData;
			materialUrl=options.MaterialUrl;//获取材料后台请求地址；
			if(!materialUrl){
				alert("请传入获取业务材料请求地址！");
				return false;
			}
			flh=businessCode= options.BusinessCode;//业务类别代码
			if(!businessCode){
				alert("请传入业务类别代码！");
				return false;
			}
			businessNum= options.BusinessNum;//业务流水号
			deleteUrl = options.DeleteUrl;//原文删除的地址
			fileInputstreamUrl= options.FileInputstreamUrl;//获取文件流地址
			if(!fileInputstreamUrl){
				alert("请传入获取文件流请求地址！");
				return false;
			}
			
			$.ajax({
				type: "POST",
				url: materialUrl,//"/bipW/EntityServlet",
				data: {"businessCode":businessCode,"bizId":businessNum,"idcard":bussData.sfzh,"ticket":bussData.ticket,"aga001":bussData.aga001},
				success: function(msg) {
					var data=eval(msg);
					var obj=data[0]; 
					var ul = $("#material");
					ul.empty();
					if (obj.list == null || obj.list ==''){
						alert("请求失败，请联系系统管理员！");
						return false;
					}
					var list = obj.list;
					for(var i=0;i<list.length;i++){
						for ( var s = 0; s < list[i].content.length; s++) {
							var type = "";
							
							if(list[i].content[s].path == null || list[i].content[s].path=="" ){
								type = "";
							}else{
								type=list[i].content[s].path.substring(list[i].content[s].path.indexOf("."));
							}
							loadviewimg(fileInputstreamUrl+"?path="+list[i].content[s].path+"&math"+Math.random(),"num"+i,list[i].content[s].id,list[i].content[s].id,list[i].content[s].entityClassId,type,list[i].content[s].fileName);
						}
						if(list[i].isScan==1){
							var $li = $('<li id="b" class="li" lx="num'+i+'" mname="'+list[i].name+'"   id="a" refer="'+list[i].refer+'" isScan="'+list[i].isScan+'"  entityId="'+list[i].classnumber+'" classnumber="'+list[i].classnumber+'"><span style="color: red;font-size:18px;">* </span><span>'+list[i].name
									+'</span><i class="number nub-r" >'+list[i].count+'</i></li>').click(function(){
										$(this).siblings().removeClass("fos");   
										$(this).addClass("fos");
										sowhid($(this).attr("lx")+"tp");
										});
							
							ul.append($li);
						}else{
							var $li = $('<li id="b" class="li" lx="num'+i+'" mname="'+list[i].name+'"   id="a" refer="'+list[i].refer+'" isScan="'+list[i].isScan+'"  entityId="'+list[i].classnumber+'" classnumber="'+list[i].classnumber+'"><span>'+list[i].name
									+'</span><i class="number nub-r" >'+list[i].count+'</i></li>').click(function(){
										$(this).siblings().removeClass("fos");   
										$(this).addClass("fos");
										sowhid($(this).attr("lx")+"tp");
										});
							
							ul.append($li);
						}
						
					}
					$(".cardList li:eq(0)").click();
				}
			});

			$(".lookall").click(function(){
				$(".lookimg").show();
			});
		};
		var MaterialUploadJingtoo = function(options){
			bussData =options.BussinessData;
			materialUrl=options.MaterialUrl;//获取材料后台请求地址；
			if(!materialUrl){
				alert("请传入获取业务材料请求地址！");
				return false;
			}
			flh=businessCode= options.BusinessCode;//业务类别代码
			if(!businessCode){
				alert("请传入业务类别代码！");
				return false;
			}
			businessNum= options.BusinessNum;//业务流水号
			deleteUrl = options.DeleteUrl;//原文删除的地址
			fileInputstreamUrl= options.FileInputstreamUrl;//获取文件流地址
			if(!fileInputstreamUrl){
				alert("请传入获取文件流请求地址！");
				return false;
			}
			saveRecordUrl= options.SaveRecordUrl;//获取业务基本信息地址
			if(!saveRecordUrl){
				alert("请传入保存业务信息的请求地址！");
				return false;
			}
			saveFileUrl= options.SaveFileUrl;//获取保存文件地址
			if(!saveFileUrl){
				alert("请传入保存文件的请求地址！");
				return false;
			}
			xzqh= bussData.xzqh;//获取行政区划
			if(!xzqh){
				alert("请传入行政区划代码！");
				return false;
			}
			changeDataStateUrl=options.ChangeDataStateUrl;
			if(!xzqh){
				alert("请传入数据状态变更地址！");
				return false;
			}
			//var jsonStr={"businessCode":businessCode,"bizId":bizId};
			 bizzId=options.BussinessData.bizId;
			 
			$.ajax({
				type: "POST",
				url: materialUrl,//"/bipW/EntityServlet",
				data: {"businessCode":businessCode,"bizId":businessNum,"idcard":bussData.sfzh,"ticket":bussData.ticket,"aga001":bussData.aga001,"xzqh":xzqh},
				success: function(msg) {
					var data=eval(msg);
					var obj=data[0]; 
					var ul = $("#material");
					ul.empty();
					if (obj.list == null || obj.list ==''){
						alert("请求失败，请联系系统管理员！");
						return false;
					}
					var list = obj.list;
					for(var i=0;i<list.length;i++){
						for ( var s = 0; s < list[i].content.length; s++) {
							var type = "";
							if(list[i].content[s].path == null || list[i].content[s].path=="" ){
								type = "";
							}else{
								type=list[i].content[s].path.substring(list[i].content[s].path.indexOf("."));
							}
							loadimg(fileInputstreamUrl+"?path="+list[i].content[s].path+"&math"+Math.random(),"num"+i,list[i].content[s].id,list[i].content[s].id,list[i].content[s].entityClassId,type,list[i].content[s].fileName);
						}
						
						if(list[i].isScan==1){
							var $li = $('<li id="b" class="li" lx="num'+i+'" mname="'+list[i].name+'"   id="a" refer="'+list[i].refer+'" isScan="'+list[i].isScan+'"  entityId="'+list[i].classnumber+'" classnumber="'+list[i].classnumber+'"><span style="color: red;font-size:18px;">* </span><span>'+list[i].name
									+'</span><i class="number nub-r" >'+list[i].count+'</i></li>').click(function(){
										$(this).siblings().removeClass("fos");   
										$(this).addClass("fos");
										sowhid($(this).attr("lx")+"tp");
										});
							
							ul.append($li);
						}else{
							var $li = $('<li id="b" class="li" lx="num'+i+'" mname="'+list[i].name+'"   id="a" refer="'+list[i].refer+'" isScan="'+list[i].isScan+'"  entityId="'+list[i].classnumber+'" classnumber="'+list[i].classnumber+'"><span>'+list[i].name
									+'</span><i class="number nub-r" >'+list[i].count+'</i></li>').click(function(){
										$(this).siblings().removeClass("fos");   
										$(this).addClass("fos");
										sowhid($(this).attr("lx")+"tp");
										});
							
							ul.append($li);
						}
						
					}
					$(".cardList li:eq(0)").click();
				}
			});

			$(".lookall").click(function(){
				$(".lookimg").show();
			});
			//提交按钮
			$(".sumbt").click(function(options){
				isUpflag=true;
				var flag=window.parent.apasinfo.validate();
				if (!window.parent.apasinfo.validate()) {
					var errorItem = window.parent.apasinfo.getErrors();
					var errorMsg = [];
					for (var i = 0, l = errorItem.length; i < l; i++) {
						errorMsg.push(errorItem[i].label + errorItem[i].errorText);
					}

					return window.parent.tz.alert(errorMsg.join("；"), "错误");
				}
				
				flag = uploadCheck();
				if(flag){
					datatransmission(options);
					MyArray=[];
					ids="";
				}
			});
			//删除按钮
			$(".shanc").click(function(){
				
				$.message({
					content:"是否删除当前材料下所有文件？",
					icon:'icAsk',
					width:"200px",
					okEvent:function(){
						
						var objs  = $(".lookimg[style='display: block;']");
						for(var i=0;i<objs.length;i++){
							var value = objs[i].getAttribute("uziid");
							MyArray.push(value);
							ids = MyArray.join(",");
						}
						var str = $(".fos").attr("lx");
					    str = str.replace(" ","");
					    str = str.replace("lookimg","");
					    str = str.replace("tp","");
					    $("[lx='"+str+"'] .number").text(0);
						$(".lookimg[style='display: block;']").css("display","none");
					}
				})
				
			})
		};
		var viladata = function(){
			var v = true;
			$(".number.nub-r").each(function(){
				if(parseInt($(this).text()) <= 0){
					v = false;
				}
			});
			return v;
		};
		//校验是否已经上传
		var uploadCheck=function(flag){
			var v = true;
			$(".number.nub-r").each(function(){
				if(parseInt($(this).text()) <= 0 && $(this).parent("li").attr("isscan")==1 ){
					v = false;
					alert("请上传"+$(this).parent("li").attr("mname"));
					return false;
				}
			});
			if(flag){
				$(".lookimg").each(function(){
					if($(this).attr("ISUP")!=1){
						v = false;
						alert($(this).children("img").attr("cllx")+"分类下有图片没上传");
						return false;
					}
				});
			}
			if(v && !isUpflag){
				v = false;
				alert("您还没提交材料信息！");
			}
			return v;
		};
		
		
		var changeDataState = function(state) {// 数据状态：0：处理中；1：已办结；2:已删除3：已收件（申报时传3）
			var flag = false;
			$.ajax({
				type : "POST",
				url : changeDataStateUrl,
				data : {
					"xzqh" : xzqh,
					"bizzId" : bizzId,
					"state" : state
				},
				dataType : "json",
				async : false,
				success : function(data) {
					if (data.isok == 1) {
						flag = true;
					}
		
				},
				error : function(err) {
					// 服务器连接失败报错处理
					flag = false;
		
				}
			});
			
			return flag;
			
			
		};
		
		
		
		var JingTooUploadUtil=new Object();
		JingTooUploadUtil.init=MaterialUploadJingtoo;
		JingTooUploadUtil.initView=MaterialViewJingtoo;
		JingTooUploadUtil.onCheck=uploadCheck;
		
		JingTooUploadUtil.changeDataState=changeDataState;
		
		/*	
		 this.each(function(){
			
	            init();//初始化
	     });
	 return MaterialUploadJingtoo;

	};
})(jQuery);*/
