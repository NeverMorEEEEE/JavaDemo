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
<div align="center"><a class="mini-button tz-button2" onclick="print()">打印</a></div>	
<div id="container">
	<h3 style="font-size:18px;" align="center">企业退休办理网上预约单</h3>	
	<p><b>您好：</b></p>
	<div class="mainPage">
		<p><span style="padding-left:2em;"><span id="empname"></span></span>，贵单位的预约已经成功，请携带该份预约单，于每月26日至30日到临平市民之家（南大街265号）1楼D区养老待遇管理科退休预约办理窗口办理退休手续。该份预约单仅限当月使用。</p>
		<p><span style="padding-left:2em;"><span>业务办理所需材料为：个人原始档案，本人身份证复印件一份、户口本本人页复印件一份、以本人名义开户的银行存折或银行卡复印件一份，企业退休人员增减表两份（由本单位盖章填写完毕），个人养老保险手册。经办人还需提供经办人身份证。</p>
		<p><span style="padding-left:2em;"></span>本单据预约退休人员<span id="count"></span>人:</p>
		<div id="mx" style="padding-left:2em;">
			
 		</div>
 		
		<p></p>  
        <p></p>
       
        <p>单位盖章处： <span id="zhu" style="margin-left:310px">余杭区社会保险办公室</span></p>
        
        
        <p style="margin-left:410px"><%=yyyy %>年<%=mm %>月<%=dd %>日</p>
        
		 <p>预约单必须由预约单位盖章方为有效 <span style="margin-left:150px"">本单据打印时间：<%=date %></span></p>
	</div>
	
	<input id='url' name='url' class="mini-textbox">
	<a class="mini-button" iconCls="icon-save" plain="true" onclick="go">保存</a> 
	
	
</div>
<script type="text/javascript">
 		mini.parse();
 		function SetData(data){
 		var o = mini.decode(data);
 		$("#count").html(o.count);
 		//$("#idnos").html(o.idnos+o.pnames+o.btgyys);
 		tz.ajax("${WEB_APP}/wssb/dw06/querycompany",{},function(text){
 			var o = mini.decode(text.data);
			$("#empname").html(o.empname);
		});
 		var count = o.count;
 		var data1=data.rows;
 		for(var i=0;i<count;i++){
 			var trs="";
 			if(data1[i].zt=="1"){
 				data1[i].pname==null?data1[i].pname="":data1[i].pname=data1[i].pname;
 				data1[i].idno==null?data1[i].idno="":data1[i].idno=data1[i].idno;
 				data1[i].btgyy==null?data1[i].btgyy="":data1[i].btgyy=data1[i].btgyy;
 				
 				trs=trs+"<div>";
 				trs=trs+"姓名:"+data1[i].pname+"&nbsp;&nbsp;身份证:"+data1[i].idno+"&nbsp;&nbsp;(备注:"+data1[i].btgyy+")";
 				trs=trs+"</div>";
 				$("#mx").append(trs);
 			}
 			
		}
 			
 		}
 		
 		function go(){
 			url = mini.get('url').getValue();
 			
 			$.ajax({
 				url:"/hrss"+url,
				success : function(e) {
					console.log(e);
				}
			});
 		}
 		
 		function print(){
 			LODOP=getLodop();
 			LODOP.SET_PRINT_STYLE("FontSize", 30);
 			LODOP.SET_PRINT_STYLE("FontName", "黑体");
 			var strFormHtml = document.getElementById("container").innerHTML;
 	     	LODOP.ADD_PRINT_HTM("30","50","700","900",strFormHtml);
 	        LODOP.PREVIEW();

 		}
 	</script>
</body>
</html>