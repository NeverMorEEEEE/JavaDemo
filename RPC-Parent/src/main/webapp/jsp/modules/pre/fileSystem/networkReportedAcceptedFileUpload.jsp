
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>

<div id="dzdaframe" style="height:100%"></div>
<script type="text/javascript" src="${base}/filext-embed/icv.js?v2.3"></script>
<script type="text/javascript">
function initICV(bizCode, bod001, fuid, params){
	icv.setupConfig({ 
	appcontext : '${base}',// 业务系统上下文地址 --%>
		bname : 'YTHPT',
		privilege : {},
	}).render('dzdaframe', bizCode, bod001, "", "", params);
} 
</script>
