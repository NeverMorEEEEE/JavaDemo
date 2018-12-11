<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ include file="/head.jsp"%>
<%
	request.setAttribute("fuid", request.getParameter("fuid"));
	request.setAttribute("aga001", request.getParameter("aga001"));
	request.setAttribute("sbcl_id", request.getParameter("sbcl_id"));
%>
<body class="pageBg">
	<input type="hidden" class="mini-hidden" name="fuid" id="fuid" value="${fuid }" >
	<input type="hidden" class="mini-hidden" name="aga001" id="aga001" value="${aga001 }" >
	<input type="hidden" class="mini-hidden" name="sbcl_id" id="sbcl_id" value="${sbcl_id }" >
	<div style="padding: 20px;"  id="submitForm">
		<table style="width : 100%;">
<!-- 			<tr style="line-height: 55px;" > -->
<!-- 				<th>材料说明</th> -->
<!-- 				<td> -->
<!-- 					<input id="faa008" name="faa008" class="mini-textbox" width="100%" onvalidation="Validation"/> -->
<!-- 				</td> -->
<!-- 			</tr> -->
			<tr>
				<th>选择文件</th>
				<td>
					<input id="fileup" name="Fdata" class="mini-fileupload" width="100%" limitType="*.jpg;*.xls;*.xlsx;*.doc;*.docx;*.txt;" 
					flashUrl="${base}/plugins/miniui/swfupload/swfupload.swf" 
<%-- 					uploadUrl="${WEB_APP}/business/transact/fileSystem/fileService/UploadFile"  --%>
					onuploaderror="OnUploadError" onuploadsuccess="onUploadSuccess"/>
				</td>
			</tr>
		</table>
	</div>
	<div property="toolbar" align="center" >
			<a class="mini-button"  plain="true" onclick="startUpload">确定</a> 
			<a class="mini-button"  plain="true" onclick="tz.closeWindow('cancel')">取消</a>
		</div>
	<script type="text/javascript" src="${base}/plugins/miniui/swfupload/swfupload.js" charset="utf-8"></script>
	<script type="text/javascript">
		var fileup,rdata,submitForm;
		var fuid,aga001,sbcl_id;
		$(function(){
			rdata = rdata||{};
			fileup = mini.get("fileup");
			submitForm=new mini.Form("submitForm");
			fuid = mini.get("fuid").getValue();
			aga001 = mini.get("aga001").getValue();
			sbcl_id = mini.get("sbcl_id").getValue();
		});
		
		function startUpload() {
			var form = new mini.Form("#submitForm");
            if (form.isValid() == false){
            	return mini.alert("输入的符号格式错误");
            }
			if(!fileup.getText()){
				return mini.alert("请选择文件！");
			}
			
			if(!fileup.getValue()){
				return mini.alert("请重新选择文件！");
			}
			//fuid,aga001,sbcl_id数据提交
			fileup.setPostParam({fuid:fuid,aga001:aga001,sbcl_id:sbcl_id});
			fileup.setUploadUrl(tz.furl("${base}/business/transact/fileSystem/fileService/UploadFile"));
			fileup.startUpload();
		}
		
		function onUploadSuccess(e){
			var data = e.serverData;
			rdata = mini.decode(data);
			mini.alert(rdata.message,"",function(){
				if(rdata.success){
					tz.closeWindow("ok");
				}
			});
		}
		
		function OnUploadError(e){
 			var data = e.serverData;
 			rdata = mini.decode(data);
 			mini.alert(rdata.message,"",function(){
				
 			});
		}
		
	</script>
</body>
</html>