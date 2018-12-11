<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" isELIgnored="false"%>
<!-- url(登录页面  by zhongty) -->
<html>
<title>人社一体化平台</title>
<%@include file="/head.jsp"%>

<!-- css start -->
<style type="text/css">

.xMiddle{	
	display:flex;
    justify-content:center;
    align-items:center;
    }
    
.textXMiddle{
	clear:both;
	text-align:center;
	margin:auto;
}

#logonForm{

	

}

.inptstyle{
	margin: 5px ;

}




</style>
<!-- css end -->
<body>
	<!-- 页面内容 start -->
	<div class="login-main">
		<div class="title" style="display: inline-block;">
			<div style="margin-bottom: 20px; margin-top: 50px;">
				<img src="${base}/entrance/images/logo.png">
			</div>
		</div>
		<div id="mask" class="mask" style="text-align: center; padding: 15%;display: none">
			<img alt="" src="${base}/entrance/images/timg.gif">
		</div>
		<!--登录框-->
		<div class="login-box xMiddle" style="">
			<div id="slideBox" class="slideBox">
				<!-- 下面是前/后按钮代码，如果不需要删除即可 -->
				<a class="prev" href="javascript:void(0)"></a> 
				<a class="next" href="javascript:void(0)"></a>
			</div>
		
			<div class="login-txtboxbg xMiddle">
				<div class="login-txtbox">
					<form id="logonForm" method="post" action="${base}/home/login?callbackurl=<%= request.getParameter("callbackurl") %>">
						<div class="login-padd">
							<h2 class="textXMiddle">用户登录</h2>
							<!-- <input placeholder="请输入用户名"  class="inptstyle iconame"/> -->
							<div class="inptstyle posit" style="border:0px;">
								<input class="inptstyle" name="account" style="padding-left:40px;" id="account" placeholder="请输入用户名" maxlength="64" type="text"/> 
								<i class="iconame"></i>
							</div>
							<div class="inptstyle posit" style="border:0px;">
								<input id = "password" name="password" type="hidden" value = "" />
								<input id="password_" class="inptstyle" name="" style="padding-left:40px;" placeholder="请输入密码" type="password" size="21"/> 
								<i class="icopass"></i>
							</div>
							<div class="btnbox xMiddle">
								<span class="login-btn log" id="loginbtn" onclick="doLogin()">登 录</span>
								&nbsp;&nbsp;
								<span class="login-btn res" id="resetbtn" onclick="reset()">重 置</span>
								&nbsp;&nbsp;
								<span class="login-btn res" id="resetbtn" onclick="test()">测试</span>
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
				
				</div>
			</div>
		</div>
	</div>
	<!-- 页面内容 end -->

	<!-- js start -->
	<script type="text/javascript" src="${base}/js/jsTools/jquery.SuperSlide.2.1.1.js"></script>
	<script type="text/javascript" src="${base}/libs/jquery.cookie.js"></script>
	<script type="text/javascript">
		$(function() {
			document.onkeydown = checkKey;
			
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
		
		function jsonpcallback(e){
			console.log(e);
			location.href = e.returnurl;
			
		}
		
		function callback(e){
			console.log("callback");
			console.log(e);
		}
		
		function test(){
			var form = $("#logonForm");
			$.ajax({
				type:"get",
				dataType:"jsonp",/*-----------------------*/
				crossDomain:true,
	            url:"${base}/demo/testJsonP?callbackurl=<%= request.getParameter("callbackurl") %>",
	            timeout:0,
	            jsonp:'hello',
	            jsonpCallback: 'hello',
	            data:form.serialize(),
	            contentType: "application/x-www-form-urlencoded",
	            beforeSend:function(){
	            	doMask();
	            },
	            //成功返回之后调用的函数            
	            success:function(data){
	            	
	            	console.log(data);
	            	if(data.success){
	            	
	            		//window.location="${base}/sysbusiness/logon/main?module=&title=";
	            	}else{
	            		$("#password_").val("");
	            		tz.alert(data.message);
	            	}
	            },
	            complete: function(XMLHttpRequest, textStatus){
	            	console.log(XMLHttpRequest);
	            },
	            //调用出错执行的函数
	            error: function(e){
	            	console.log(e);
	            }        
	         });
		}
		
		function doLogin(){
			var form = $("#logonForm");
			var password = $("#password_").val();
			tempstr = hex_md5(password);
			console.log(tempstr);
			$("#password").val(tempstr);
			console.log(form.serialize());
	//		form.submit();
			$.ajax({
				type:"get",
				dataType:"jsonp",/*-----------------------*/
				crossDomain:true,
	            url:"${base}/home/login?callbackurl=<%= request.getParameter("callbackurl") %>",
	            timeout:0,
	            jsonp:'callback',
	            jsonpCallback: 'jsonpcallback',
	            data:form.serialize(),
	            contentType: "application/x-www-form-urlencoded",
	            beforeSend:function(){
	            	doMask();
	            },
	            //成功返回之后调用的函数            
	            success:function(data){
	            	unMask();
	            	console.log("success");
	            	console.log(data);
	            	
	            	if(data.success){
	            		
	            		//window.location="${base}/sysbusiness/logon/main?module=&title=";
	            	}else{
	            		$("#password_").val("");
	            		tz.alert(data.message);
	            	}
	            },
	            complete: function(XMLHttpRequest, textStatus){
	            	console.log("complete");
	
	            	alert(XMLHttpRequest.responseText);
	            },
	            //调用出错执行的函数
	            error: function(e){
	            	console.log("error");
	            	console.log(e);
	            }        
	         }); 
		}
	</script>
	<!-- js end -->
</body>
</html>