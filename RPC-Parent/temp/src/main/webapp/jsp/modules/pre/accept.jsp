<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<!-- accept.jsp -->
<!DOCTYPE HTML>
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
			<input type="button" value="提交1" class="btn-green" onclick="submit()" />
			<input type="button" value="重置" class="btn-yellow" onclick="reset()" />
		</div>
	</div>
	<div class="info-content" id="apasinfo">
	<input type="hidden" class="mini-hidden" name="aga001" value="${aga001 }">
	<input type="hidden" class="mini-hidden" name="areaCode" value="${areaCode }">
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
		<h4>
			<span>申报信息</span>
		</h4>
		<div class="mini-clearfix info-box">
			<div class="mini-col-12">
				<input class="mini-textarea" labelField="true" label="备注"
					name="memo" width="800">
			</div>
		</div>
		<%--  <div title="电子影像">
				<%@ include file="fileSystem/fileServiceUpload.jsp"%>
			</div>  --%>
	</div>

	<script type="text/javascript">
		var apasinfo;
		var flh = "${flh}";
		var fuid = "${fuid}";
		var bizId = "${bizId}";
		var ticket ="${ticket}";
		var aga001="${aga001}";
		var belongxiaquCode="${belongxiaquCode}";
		var dzdaId="";
		var aga003="${aga003}";
		var xzqh="${belongxiaquCode}";
		
		
		$(function(){
			apasinfo = new mini.Form("apasinfo");
			demoSet();
			testLogin();
			OriginalInit();
		})
		
		function submit (){
			//$("[name='dzdapage']")[0].contentWindow.oncheck().sfzh=mini.get("applyCardNumber").getValue();
			//$("[name='dzdapage']")[0].contentWindow.onchyeck().xm=mini.get("applyName").getValue();
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

