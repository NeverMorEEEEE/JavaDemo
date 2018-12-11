<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<!-- 退休归侨职工生活补贴资格确认 信息     -->
<html>
<head>
<title>${aga003}</title>
<%@ include file="/head.jsp"%>
<link rel="stylesheet" href="${base}/css/apply.css?v=${version}" />
</head>
<body>
	<div class="title-fixed">
		<h2 class="content-title">${aga003}--${aga004}</h2>
		<div class="btn-box">
			<input type="button" value="提交" class="btn-green" onclick="submit()" />
			<input type="button" value="重置" class="btn-yellow" onclick="reset()" />
			<input type="button" value="open" class="btn-yellow" onclick="open()" />
		</div>
	</div>
	<div class="info-content" id="apasinfo">
			<input type="hidden" class="mini-hidden" name="ticket" value="${ticket }">
			 <input type="hidden" class="mini-hidden" name="bizId" value="${bizId }">
			 <input type="hidden" class="mini-hidden" name="flh" value="${flh }"> 
			<input type="hidden" class="mini-hidden" id="dzdaId" name="dzdaId" value="12312">
		<h3>申报人基本信息</h3>
		<div class="mini-clearfix info-box">
			<div class="mini-col-4">
				<m:combobox labelField="true" label="证件类型" name="applyCardtype"
					codeField="cardtype" include="身份证,军官证,护照" value="身份证"
					required="true" />
			</div>
			<div class="mini-col-4">
				<input class="mini-buttonedit" labelField="true" label="证件号码" onvalueChanged=""
					name="applyCardNumber" maxLength="18" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="姓名"
					name="applyName" maxLength="64" required>
			</div>
		</div>
		<h3>联系人/待办人基本信息</h3>
		<div class="mini-clearfix info-box">
			<div class="mini-col-4">
				<m:combobox labelField="true" label="证件类型" name="contactmanCardtype"
					codeField="cardtype" include="身份证,军官证,护照" value="身份证"
					required="true" />
			</div>
			<div class="mini-col-4">
				<input class="mini-buttonedit" labelField="true" label="证件号码" onvalueChanged=""
					name="contactmanCardnumber" maxLength="18" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="姓名"
					name="contactman" maxLength="64" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="手机号码"
					name="telphone" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="邮编号码"
					name="postCode">
			</div>
			<div class="mini-col-12">
				<input class="mini-textbox" labelField="true" label="通讯地址"
					name="address" width="800">
			</div>
		</div>
		
		<h3>申报信息</h3>
		<div class="mini-clearfix info-box" id="forminfo">
			<div class="mini-col-4">
				<div class="mini-col-4">
				<inpuut class="mini-datepicker" labelField="true" label="参加工作时间" dateFormat="yyyy-MM-dd" 
					id='workstarttime' name="workstarttime" required>
			</div>
			</div>
			<div class="mini-col-4">
				<input class="mini-datepicker" labelField="true" dateFormat="yyyy-MM-dd" label="退休时间" onvalueChanged="onWorkEndTimeIn" 
					name="workendtime" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="退休单位"
					name="retireOrg" maxLength="128" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="国有及国有控股企业工作年限" vtype="range:0,100"onvalidation="onWorkYearsCheck" 
					id='stoorgWorkYears' name="stoorgWorkYears" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-datepicker" labelField="true" label="归侨证发证时间"
					id="issuetime" name="issuetime" >
			</div>
			<div class="mini-col-4">
				<input class="mini-combobox" labelField="true" label="性别" data="[{id:'1',text:'男'},{id:'0',text:'女'}]" onvalueChanged="sexCheck"
					name="issuetime" required>
			</div>
			<div class="mini-col-12">
				<input class="mini-textarea" labelField="true" label="人力社保部门意见"
					name="option" width="800" value ="经审核，申请人符合退休归侨生活补贴享受条件，同意按浙人社发〔2013〕66号文件规定，享受每月   xxx 元生活补贴。"
					
					>
			</div>
		</div>
	
		<%-- <h3>影像材料</h3>
		<div class="info-box" style="margin-bottom: 10px;">
			<iframe id="dzdapage" name="dzdapage" src="${base}/brj/index.html" width="100%" style="overflow-x: hide;" frameborder="0"
				height="500px;"	scrolling="auto" marginwidth="0" marginheight="0"></iframe>
		</div> --%>
	</div>

	<script type="text/javascript">
		var apasinfo;
		var flh = "${flh}";
		var bizId = "${bizId}";
		var ticket ="${ticket}";
		var aga001="${aga001}";
		var belongxiaquCode="${belongxiaquCode}";
		var dzdaId="";
		var aga003="${aga003}";
		var xzqh="${belongxiaquCode}";
		var datevalidator = false;
		var sex = "";
		var workYears = 0;
		datevalidator = true;
		$(function(){
			apasinfo = new mini.Form("apasinfo");
			forminfo = new mini.Form("forminfo");
		})
		
		
		function open(){
			console.log("${base}/fileSystem/fileUpload.jsp");
			mini.open({
				title:"选择文书",
				width:320,
				height:350,
				allowResize:false,
				url:"${base}/fileSystem/fileUpload.jsp"
			});
		}
		function checkSfz(e){
		
			checkIdno(e.value);
		}
		
		function sexCheck(e){
			sex = e.value;
		}
		function onWorkEndTimeIn(e){
			
			var endtime = e.sender.getText().substr(0,4);
			var starttime = mini.get('workstarttime').getText(true).substr(0,4);
			workYears = endtime-starttime;
			if(workYears>0){
				mini.get('stoorgWorkYears').setValue((endtime-starttime));
			}
		}
		
		function onWorkYearsCheck(e){
			if(!sex){
			/* 	mini.alert('请先输入正确格式的身份证号码，这里会根据身份证获取性别，进而判断年限！'); */
				mini.alert('请先输入性别！');
				return;
			}
			t = e.sender.value;
		
			if (e.isValid) {
				if(sex==1){
					if (t<30) {
	                    e.errorText = "男性必须满30年";
	                    datevalidator = false;
	                }
				}else if(sex==0){
					if (t<25) {
						e.errorText = "女性必须满25年";
						datevalidator = false;
					}
				}
				if(!datevalidator){
					e.isValid = false;
                	mini.alert( e.errorText);
                }
				datevalidator = true;
               
            }

		}
		
		function submit (){
			//$("[name='dzdapage']")[0].contentWindow.oncheck().sfzh=mini.get("applyCardNumber").getValue();
			//$("[name='dzdapage']")[0].contentWindow.oncheck().xm=mini.get("applyName").getValue();
			/* if(!$("[name='dzdapage']")[0].contentWindow.oncheck(true)){
				return;
			} */
			//mini.get("dzdaId").setValue($("[name='dzdapage']")[0].contentWindow.dzdaId);
			data = apasinfo.getData(true);
			if(!forminfo.validate()){
				mini.alert("请填写完必须的信息");
				return;
			}
			
			form = forminfo.getData(true);
			formdata = [];
			j = 0;
			//获取表单信息，拼成指定形式再往后台传
			for(var i in form){
				t = mini.getbyName(i);
				/* formdata[j] = {name:t.name,name_cn:t.label,value:form[t.name]}; */
				formdata[j] = {name:i,name_cn:t.label,value:form[i]};
				j = j + 1;
			}
			data.forminfo = mini.encode(formdata);
			tz.submit(apasinfo, "/pre/simple/save",data, function(){
				//apasinfo.reset();
			});
		}
		
		function reset(){
			apasinfo.reset();
		}
		
		//身份证号码验证
		function checkIdno(idno){
		
			 if(idno.length == 18){
				    if(idno!="")   {     
				        //身份证的地区代码对照   
				        var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };           
				        //合法性验证   
				        var sum = 0;  
				        //性别 1为男，2为女
				        sex = 0;
				        var sexName = '';
				        //出生日期   
				        var birthday;  
				        //验证长度与格式规范性的正则   
				        var pattern=new RegExp(/(^\d{15}$)|(^\d{17}(\d|x|X)$)/i);   
				        if (pattern.exec(idno)) {  
				            //验证身份证的合法性的正则   
				            pattern=new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/);  
				            if(pattern.exec(idno)) {     
				                //获取15位证件号中的出生日期并转位正常日期        
				                birthday = "19"+idno.substring(6,8)+"-"+idno.substring(8,10)+"-"+idno.substring(10,12);  
				                if (parseInt(idno.substr(14, 1)) % 2 == 1) { 
				               		sex = 1;
				               	} else { 
				               		sex = 2;
				               	} 
								/* mini.get("psex").setValue(sex); */
				            }                 
				            else   
				            {     
				            	idno = idno.replace(/x|X$/i,"a");                       
				                //获取18位证件号中的出生日期   
				                birthday =idno.substring(6,10)+"-"+idno.substring(10,12)+"-"+idno.substring(12,14);  
				                  
				                //校验18位身份证号码的合法性   
				                for (var i = 17; i >= 0; i--)   
				                {  
				                    sum += (Math.pow(2, i) % 11) * parseInt(idno.charAt(17 - i), 11);  
				                }  
				                if (sum % 11 != 1) {                      
				                    tz.alert("身份证号码不符合国定标准，请核对！");                                             
				                    return;  
				                }  
				                if (parseInt(idno.substr(16, 1)) % 2 == 1) { 
				               		sex = 1;
				               	} else { 
				               		sex = 2;   	
				               	} 
				                idno = idno.replace(/a|x$/i,"X")  
				             /*    mini.get("idno").setValue(idno);
				                mini.get("psex").setValue(sex);   */     
				            }  
				            //检测证件地区的合法性                                   
				            if (aCity[parseInt(idno.substring(0, 2))] == null)   
				            {  
				                tz.alert("证件地区未知，请核对！");                                       
				                return;  
				            }  
				            var dateStr = new Date(birthday.replace(/-/g, "/"));  
				      
				        
				             if (birthday != (dateStr.getFullYear()+"-"+ Append_zore(dateStr.getMonth()+1)+"-"+ Append_zore(dateStr.getDate()))) {  
				                tz.alert("证件出生日期非法！");                                          
				                return;  
				            } 
				        }else {        
				            tz.alert("证件号码格式非法！");     
				            return; 
				        }  
				    }  
				    else  
				    {  
				        tz.alert("请输入证件号！");
				        return; 
				    }  
			 
			    }else{
			    	tz.alert( '身份证号必须为18位!');
			    	return; 
			    }
		}
		
		function Append_zore(i){
			if(i>0&&i<10){
				return '0'+i;
			}else{
				return i;
			}
		}
	</script>
</body>
</html>

