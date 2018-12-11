<%@ page language="java" contentType="text/html;charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML>    
<html>
<head>
<%@ include file="/head.jsp" %>
<style type="text/css">
	body{
		background: #dfdfdf;
	}
	.toolbar{
		background: #ffffff;
	}
	.w-1000{
		padding: 5px;
		width: 1000px;
		margin: 0 auto;
		border: 1px;
		border-corlor: #dfdfdf;
		background: #ffffff;
	}
</style>
</head>
<body>
	<div id="test-item" class="mini-clearfix toolbar">
		<div class="mini-col-12">
	         <a class="mini-button" onclick="submit">提交</a>
	         <a class="mini-button" onclick="query">查询</a>
	    </div>
    </div>
	<div id="test-item" class="mini-clearfix w-1000">
		<div class="mini-col-4">
			<input class="mini-textbox" labelField="true" label="姓名">
	    </div>
	    <div class="mini-col-4">
	        <input class="mini-textbox" labelField="true" label="身份证号">
	    </div>
	    <div class="mini-col-4">
	       <input class="mini-textbox" labelField="true" label="手机号码">
	    </div>
	    <div class="mini-col-4">
	       <input class="mini-textbox" labelField="true" label="手机号码">
	    </div>
	    <div class="mini-col-4">
	        <input class="mini-textbox" labelField="true" label="身份证号">
	    </div>
	    
	</div> 
	
	<div>
		<a class="mini-button"  onclick="" >Click</a>
	
	</div>
	<h1>hello page</h1>
		SessionID:<%= session.getId()%><br /><br />
	
	<script type="text/javascript">
		var form;
		$(function(){
			form = new mini.Form("test-item");
		})
		
		function submit (){
			tz.submit("/demo/save", form.getData());
		}
		
		function query(){
			tz.load(form, "/demo/list");
		}
	</script>  
</body>
</html>