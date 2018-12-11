<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<!-- 劳模退休时一次性补贴资格确认信息-->
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
				<input class="mini-buttonedit" labelField="true" label="证件号码"
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
				<input class="mini-buttonedit" labelField="true" label="证件号码"
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
		<h3>劳模退休时一次性补贴资格确认信息</h3>
		<div class="mini-clearfix info-box">
			<div class="mini-col-4">
				<div class="mini-col-4">
				<inpuut class="mini-datepicker" labelField="true" label="参加工作时间"
					name="workstarttime" required>
			</div>
			</div>
			<div class="mini-col-4">
				<input class="mini-datepicker" labelField="true" dateFormat="yyyy-MM-dd" label="退休时间" onvalidation="onDateCheck"
					name="workendtime" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="退休单位"
					name="retireOrg" maxLength="128" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-textbox" labelField="true" label="国有及国有控股企业工作年限" 
					name="stoorgWorkYears" required>
			</div>
			<div class="mini-col-4">
				<input class="mini-datepicker" labelField="true" label="归侨证发证时间"
					name="issuetime">
			</div>
			<div class="mini-col-12">
				<input class="mini-textarea" labelField="true" label="人力社保部门意见"
					name="option" width="800" value ="经审核，申请人符合退休归侨生活补贴享受条件，同意按浙人社发〔2013〕66号文件规定，享受每月   xxx 元生活补贴。"
					
					>
			</div>
		</div>
		<h4>
			<span>申报信息</span>
		</h4>
		<div class="mini-clearfix info-box">
			<div class="mini-col-12">
				<input class="mini-textarea" labelField="true" label="备注"
					name="memo" width="800">
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
		
		$(function(){
			apasinfo = new mini.Form("apasinfo");
		})
		
		function onDateCheck(e){
			if (e.isValid) {
				
                if (e.sender.text < '2006-01-01') {
                    e.errorText = "必须是在2006年1月1日后退休仍保持荣誉的人员";
                    if(!datevalidator){
                    	mini.alert( e.errorText);
                    	
                    }
                    datevalidator != datevalidator;
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
			
			tz.submit(apasinfo, "/pre/simple/save", apasinfo.getData(), function(){
				//apasinfo.reset();
			});
		}
		
		function reset(){
			apasinfo.reset();
		}
	</script>
</body>
</html>

