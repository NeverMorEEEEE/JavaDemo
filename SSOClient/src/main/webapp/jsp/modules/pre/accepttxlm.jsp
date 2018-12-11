<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<!-- 劳模退休时一次性补贴资格确认信息      aga001 = 2761   -->
<html>
劳模退休时一次性补贴资格确认信息
<head>
<title>${aga003}</title>
<%@ include file="/head.jsp"%>
<script type="text/javascript" src="${base}/js/YthClient.js?v=${version}"></script>
<link rel="stylesheet" href="${base}/css/apply.css?v=${version}" />
</head>
<body>
	<div class="title-fixed">
		<h2 class="content-title">${aga003}--${aga004}</h2>
		<div class="btn-box">
			<input type="button" value="提交" class="btn-green" onclick="submit()" />
			<input type="button" value="重置" class="btn-yellow" onclick="reset()" />
		</div>
	</div>
	<div class="info-content" id="apasinfo">
			<input type="hidden" class="mini-hidden" name="ticket" value="${ticket }">
			 <input type="hidden" class="mini-hidden" name="bizId" value="${bizId }">
			 <input type="hidden" class="mini-hidden" name="fuid" value="${fuid }"> 
			<input type="hidden" class="mini-hidden" id="dzdaId" name="dzdaId" value="12312">
		<h3>申报人基本信息</h3>
		<div class="mini-clearfix info-box">
			<div class="mini-col-4">
				<m:combobox labelField="true" label="证件类型" name="applyCardtype"
					codeField="cardtype" include="身份证,军官证,护照" value="身份证"
					required="true" />
			</div>
			<div class="mini-col-4">
				<input class="mini-buttonedit" labelField="true" label="证件号码"  onvalueChanged="checkIcv"
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
				<input class="mini-buttonedit" labelField="true" label="证件号码" onvalueChanged="checkIcv"
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
		<!-- <div class="info-content" id="forminfo"> -->
	
		<h3>申报信息</h3>
		<div class="mini-clearfix info-box" id="forminfo">
			<div class="mini-col-4">
				<div class="mini-col-4">
				<inpuut class="mini-datepicker" labelField="true" label="参加工作时间"
					id="workstarttime" name="workstarttime" required>
			</div>
			</div>
			<div class="mini-col-4">
				<input class="mini-datepicker" labelField="true" dateFormat="yyyy-MM-dd" label="退休时间" onvalidation="onRetireDateCheck"
					id="workendtime" name="workendtime" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="退休单位"
					id="retireOrg" name="retireOrg" maxLength="128" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-datepicker" labelField="true" label="获得时间"  onvalidation="onGetDateCheck"
					id="time" name="time" required="true">
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="荣誉称号"  
					id='gloryname' name="gloryname" >
			</div>
			<div class="mini-col-4">
				<input class="mini-combobox"  labelField="true" data="[{id:'01',text:'是'},{id:'00',text:'否'}]"label="退休时是否保持该荣誉称号"
					id='iskeep' name="iskeep">
			</div>
			<div class="mini-col-12">
				<input class="mini-textarea" labelField="true" label="人力社保部门意见" id="option"
					name="option" width="800" value ="经审核，申请人符合退休劳动模范享受一次性补贴享受条件，同意按浙劳社老〔2006〕142号文件规定增发一次性补贴。即按退休时全省上年度在岗职工月平均工资×20%×      %×180的标准增发一次性补贴            元。"
					
					>
			</div>
		</div>
		
			 <div title="电子影像">
				<%@ include file="fileSystem/fileServiceUpload.jsp"%>
			</div> 
	</div>

	<script type="text/javascript">
		
		var apasinfo;
		var fuid = "${fuid}";
		var bizId = "${bizId}";
		var ticket ="${ticket}";
		var aga001="${aga001}";
		var belongxiaquCode="${belongxiaquCode}";
		var dzdaId="";
		var aga003="${aga003}";
		var xzqh="${belongxiaquCode}";
		var datevalidator = false;
		var sex = 0;
		var forminfo;
		$(function(){
			mini.parse();
			apasinfo = new mini.Form("apasinfo");
			forminfo = new mini.Form("forminfo");
			testLogin();
			OriginalInit();
		})
		
		// 获取一体化对象信息
		function getYth() {
			subject.aga001 = '${aga001}';
			subject.fuid = fuid;
			return subject;
		}
		
		function checkIcv(){
	/* 
			initICV({fuId:fuid}); */
		}
		
	
		function onRetireDateCheck(e){
			if (e.isValid) {
				
                if (e.sender.text < '2006-01-01') {
                    e.errorText = "必须是在2006年1月1日后退休仍保持荣誉的人员";
                    if(!datevalidator){
                    	mini.alert( e.errorText);
                    	
                    }
                    datevalidator = true;
                    e.isValid = false;
                }
            }

		}
		
		
		function onGetDateCheck(e){
			if (e.isValid) {
				
                if (e.sender.text >'1997-12-31') {
                    e.errorText = "必须是在1997年12月31日以前获得省（部）级劳动模范等称号";
                    if(!datevalidator){
                    	mini.alert( e.errorText);
                    	
                    }
                    datevalidator = true;
                    e.isValid = false;
                }
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
		
		
	</script>
</body>
</html>

