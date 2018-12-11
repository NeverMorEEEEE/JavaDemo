<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<%@page import="com.jfinal.plugin.activerecord.Record"%>
<!-- url(登录页面  by zhongty) -->
<html>
<title>人社一体化平台</title>
<%@include file="/include/head.jsp"%>
<%
	Record dto = (Record)request.getSession().getAttribute("Account");
	if (dto != null) {
		out.println("<script language=javascript>top.location.href ='"+GlobalNames.WEB_APP+"/sysbusiness/logon/welcome';</script>");
		return;
	}
%>
<link href="${WEB_APP}/jtzsw.ico" rel="icon" type="image/x-icon">
<!-- css start -->
<link href="${WEB_APP}/plugins/bootstrap/css/bootstrap.css" rel="stylesheet"></link>
<link href="${WEB_APP}/entrance/css/logon.css?version=12" rel="stylesheet"></link>
<style type="text/css">
</style>
<!-- css end -->
<body>
	<!-- 页面内容 start -->
	<div class="login-main">
		<div class="title" style="display: inline-block;">
			<div style="margin-bottom: 20px; margin-top: 50px;">
				<img src="${WEB_APP}/entrance/images/logo.png">
			</div>
		</div>
		<div id="mask" class="mask" style="text-align: center; padding: 15%;display: none">
			<img alt="" src="${WEB_APP}/entrance/images/timg.gif">
		</div>
		<!--登录框-->
		<div class="login-box">
			<div id="slideBox" class="slideBox">
				<!-- 下面是前/后按钮代码，如果不需要删除即可 -->
				<a class="prev" href="javascript:void(0)"></a> 
				<a class="next" href="javascript:void(0)"></a>
			</div>
		
			<div class="login-txtboxbg">
				<div class="login-txtbox">
					<form id="logonForm" method="post" >
						<div class="login-padd">
							<h2>用户登录</h2>
							<!-- <input placeholder="请输入用户名"  class="inptstyle iconame"/> -->
							<div class="inptstyle posit" style="border:0px;">
								<input class="inptstyle" name="bsc011" style="padding-left:40px;" id="bsc011" placeholder="请输入用户名" maxlength="64" type="text"/> 
								<i class="iconame"></i>
							</div>
							<div class="inptstyle posit" style="border:0px;">
								<input id = "bsc013" name="bsc013" type="hidden" value = "" />
								<input id="bsc013_" class="inptstyle" name="" style="padding-left:40px;" placeholder="请输入密码" type="password" size="21"/> 
								<i class="icopass"></i>
							</div>
							<div class="btnbox">
								<a class="login-btn log" id="loginbtn" onclick="doLogin()">登 录</a>
								<a class="login-btn res" id="resetbtn" onclick="reset()">重 置</a>
							</div>
							<div class="clear"></div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!--登录框end-->
		<div class="footer">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 text-center">Copyright &copy;2017天正思维信息技术有限公司版权所有</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 页面内容 end -->

	<!-- js start -->
	<script src="${WEB_APP}/plugins/bootstrap/js/jquery.min.js"></script>
	<script src="${WEB_APP}/plugins/bootstrap/js/bootstrap.min.js"></script>
	<script src="${WEB_APP}/js/jsTools/md5.js " type="text/javascript"></script>
	<script type="text/javascript" src="${WEB_APP}/entrance/js/jquery.SuperSlide.2.1.1.js"></script>
	<script type="text/javascript">
		$(function() {
			document.onkeydown = checkKey;
			for(var i=1;i<6;i++){
				$(".hd ul").append("<li></li>");
			    $(".bd ul").append("<li><a href='#'><img src='${WEB_APP}/entrance/images/carousel"+ i + ".jpg' /></a></li>");
			}
			$(".slideBox").slide({
				effect : "fold",
				mainCell : ".bd ul",
				easing : "swing",
				delayTime : 1000,
				autoPlay : true
			});
		});
		
		function checkKey() {
			if(13 == window.event.keyCode){
				doLogin();
		  	}
		}
		function reset(){
			$("#logonForm")[0].reset();
		}
		
		function doMask(){
	        $("#mask").fadeTo(350,0.5);  
		}
		
		function unMask(){
			$("#mask").hide();
		}
		
		
		function doLogin(){
			var form = $("#logonForm");
			var bsc013 = $("#bsc013_").val();
			$("#bsc013").val(hex_md5(bsc013));
			$.ajax({
	            type:"POST",
	            url:"${WEB_APP}/sysbusiness/logon/knock",
	            timeout:0,
	            data:form.serialize(),
	            datatype: "json",
	            contentType: "application/x-www-form-urlencoded",
	            beforeSend:function(){
	            	doMask();
	            },
	            //成功返回之后调用的函数            
	            success:function(data){
	            	unMask();
	            	if(data.success){
	            		window.location="${WEB_APP}/sysbusiness/logon/main?module=&title=";
	            	}else{
	            		$("#bsc013_").val("");
	            		tz.alert(data.message);
	            	}
	            },
	            complete: function(XMLHttpRequest, textStatus){
	            
	            },
	            //调用出错执行的函数
	            error: function(){
	            }        
	         });
		}
	</script>
	<!-- js end -->
</body>
</html>