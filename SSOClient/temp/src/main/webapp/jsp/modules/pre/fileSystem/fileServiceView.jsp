
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<div id="dzdaframe" style="height:100%"></div>
<%@ include file="/head.jsp"%>
<script type="text/javascript" src="${base}/filext-embed/icv.js?v2.3"></script>
<script type="text/javascript">
	icv.setupConfig({
		appcontext : '${base}',// 业务系统上下文地址
		bname : 'YTHPT',
		privilege : {
			disablePrint : false,
			disableDownload : false,
			disableOperate : true
		}
	}).render('dzdaframe', "${ga01.aga002}", "${od01.bod001}", "${od01.fuid}", "", {
		subjectType: "01",//主体类型
		subjectKey: "${od01.bod008}", //主体编码
		subjectName: "${od01.bod007}",//主体名称
		stage:"04"
	});
</script>
