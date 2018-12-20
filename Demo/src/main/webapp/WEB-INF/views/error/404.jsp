 <%@page contentType="text/html;charset=UTF-8" isELIgnored="false"%>
 <%@page import="com.tzsw.core.util.DateUtil"%>
<!-- /demo/print_ywd.jsp -->
<html>

<title></title>
<%@include file="/include/head.jsp" %>

<script src="${WEB_APP}/plugins/bootstrap/jquery.min.js" type="text/javascript"></script>
<%
	String date = DateUtil.converToString(DateUtil.getSystemCurrentTime(), "yyyy/MM/dd HH24:mi:ss");
	String yyyy = DateUtil.converToString(DateUtil.getSystemCurrentTime(), "yyyy");
	String mm = DateUtil.converToString(DateUtil.getSystemCurrentTime(), "MM");
	String dd = DateUtil.converToString(DateUtil.getSystemCurrentTime(), "dd");
%>
<style type="text/css">
</style>
<head>
	<title></title>
</head>	
<style>
	#container{
		font-size:14px;
		width: 560px;
		margin: 0 auto;
		font-family:SimSun
	}
	.mainPage{
		margin:0 auto;
		margin-bottom: 80px;
	}
	.zhu{
		float:left;text-align: right;width: 50px;height: 50px;clear: both;
	}
	.bp{
		margin:14px 0;
	}
	.mx{
		margin:14px 0;
	}

</style>
<body>
<img alt="" src="../../../image/error/404.jpg">
	
</div>
<script type="text/javascript">
 		
 	</script>
</body>
</html>