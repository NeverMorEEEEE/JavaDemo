
<%@page contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<%@page import="com.tzsw.core.util.DateUtil"%>
<!-- /demo/print_ywd.jsp -->
<html>
<title></title>
<%@include file="/include/head.jsp"%>
<script src="${WEB_APP}/plugins/bootstrap/jquery.min.js"
	type="text/javascript"></script>
<%
	String date = DateUtil.converToString(
			DateUtil.getSystemCurrentTime(), "yyyy/MM/dd HH24:mi:ss");
	String yyyy = DateUtil.converToString(
			DateUtil.getSystemCurrentTime(), "yyyy");
	String mm = DateUtil.converToString(
			DateUtil.getSystemCurrentTime(), "MM");
	String dd = DateUtil.converToString(
			DateUtil.getSystemCurrentTime(), "dd");
%>
<style type="text/css">
</style>
<head>
<title></title>
</head>
<style>
#container {
	font-size: 14px;
	width: 560px;
	margin: 0 auto;
	font-family: SimSun
}

.mainPage {
	margin: 0 auto;
	margin-bottom: 80px;
}

.zhu {
	float: left;
	text-align: right;
	width: 50px;
	height: 50px;
	clear: both;
}

.bp {
	margin: 14px 0;
}

.mx {
	margin: 14px 0;
}
</style>
<body>
	<h1>用户列表</h1>
	<div>
		<table>
			<colgroup>
				<col width="8%">
				<col width="12%">
				<col width="8%">
				<col width="12%">
				<col width="8%">
				<col width="12%">
				<col width="5%">
				<col width="35%">
			</colgroup>
			<% List user = request.getAttribute("userList")
				for(Sc05 sc05 : user){
					System.out.println(sc05);
				}
			
			%>
			
		
			
			
		</table>

	</div>

	<input id='url' name='url' class="mini-textbox">
	<a class="mini-button" iconCls="icon-save" plain="true" onclick="go">保存</a>


	</div>
	<script type="text/javascript">
		mini.parse();
		function SetData(data) {
			var o = mini.decode(data);
			$("#count").html(o.count);
			//$("#idnos").html(o.idnos+o.pnames+o.btgyys);
			tz.ajax("${WEB_APP}/wssb/dw06/querycompany", {}, function(text) {
				var o = mini.decode(text.data);
				$("#empname").html(o.empname);
			});
			var count = o.count;
			var data1 = data.rows;
			for (var i = 0; i < count; i++) {
				var trs = "";
				if (data1[i].zt == "1") {
					data1[i].pname == null ? data1[i].pname = ""
							: data1[i].pname = data1[i].pname;
					data1[i].idno == null ? data1[i].idno = ""
							: data1[i].idno = data1[i].idno;
					data1[i].btgyy == null ? data1[i].btgyy = ""
							: data1[i].btgyy = data1[i].btgyy;

					trs = trs + "<div>";
					trs = trs + "姓名:" + data1[i].pname + "&nbsp;&nbsp;身份证:"
							+ data1[i].idno + "&nbsp;&nbsp;(备注:"
							+ data1[i].btgyy + ")";
					trs = trs + "</div>";
					$("#mx").append(trs);
				}

			}

		}

		function go() {
			url = mini.get('url').getValue();

			$.ajax({
				url : "/hrss" + url,
				success : function(e) {
					console.log(e);
				}
			});
		}

		function print() {
			LODOP = getLodop();
			LODOP.SET_PRINT_STYLE("FontSize", 30);
			LODOP.SET_PRINT_STYLE("FontName", "黑体");
			var strFormHtml = document.getElementById("container").innerHTML;
			LODOP.ADD_PRINT_HTM("30", "50", "700", "900", strFormHtml);
			LODOP.PREVIEW();

		}
	</script>
</body>
</html>