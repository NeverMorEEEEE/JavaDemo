<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<html>
<%@include file="/include/head.jsp"%>
<title>登录页面</title>
<body>
<%
	String casBid = (String)request.getSession().getAttribute("cas_bid");
	request.setAttribute("module", request.getSession().getAttribute("cas_module"));
	
	String casUrl = (String)request.getSession().getServletContext().getAttribute("filter");
	request.setAttribute("casUrl", casUrl);
	System.out.println(casUrl);
	
%>
<%	if(casBid==null || "".equals(casBid)){ %>
	<script type="text/javascript">
		mini.alert("未获取登录信息，请重新登录！","",function(){
			top.location="http://10.85.8.10:8888/cas/login";
		});
	</script>
<%	}else{ %>
	<script type="text/javascript">
		tz.ajaxSubmit({
			url:tz.furl("/sysbusiness/logon/casKnock",{module:"${module}"}),
			success:function(data){
				if(data.success){
					window.location="${WEB_APP}/sysbusiness/logon/main?module=${module}";
				}else{
					mini.alert(data.msg);
				}
			}
		})
	</script>
<% } %>
</body>
</html>