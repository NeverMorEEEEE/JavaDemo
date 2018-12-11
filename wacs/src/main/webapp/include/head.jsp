<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@taglib uri="/WEB-INF/miniuiplat.tld" prefix="miniui"%>
<%@taglib uri="/WEB-INF/tzmini.tld" prefix="m"%>
<%@page language="java" pageEncoding="UTF-8" isELIgnored="false"%>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<%-- <link href="/hrss/jtzsw.ico" rel="icon" type="image/x-icon"> --%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta name="yuanzp" content="254263222@qq.com">
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<title>wac测试平台</title>
<!-- 共用js统一引入 -->
<!-- <script src="http://www.miniui.com/scripts/boot.js" type="text/javascript"></script> -->
<script src="/hrss/plugins/miniui/boot.js?v=1.0" type="text/javascript"></script>
<script src="/hrss/js/extminiui/ExtMiniui.js"></script>
<script src="/hrss/js/extminiui/export.js"></script>
<!-- 共用js统一引入 -->
<script src="/hrss/js/jsTools/tzjs.js" type="text/javascript"></script>
<script type="text/javascript">
var tz = tz||{};tz.base="/hrss";tz.furl=function(url,para){var fullPath=function(url){if(!url)return tz.base;if(tz.startWith(url,tz.base)){return tz.startWith(url,"/")?url:"/"+url;}return tz.startWith(url,"/")?tz.base+url:tz.base+"/"+url;};url=fullPath(url);if(!para){return url;}if(url.indexOf('?')==-1){url=url+"?";}for(var k in para){url += "&"+k+"="+para[k];}return encodeURI(url);};
$(function(){mini_debugger = false;mini.parse();})
</script>
<!-- 业务js统一引入 -->

<!-- 业务js统一引入 -->
<script src="/hrss/business/widget/tzmwidget.js?v=1.0" type="text/javascript"></script>
<!-- 共用css统一引入 -->
<%-- <link rel="stylesheet" type="text/css" href="/hrss/eova/eovaicon/icon.css" /> --%>
<link rel="stylesheet" type="text/css" href="/hrss/plugins/miniui/res/font-awesome/css/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="/hrss/css/extminiui/extminiui.css" />
<link rel="stylesheet" type="text/css" href="/hrss/css/extminiui/exticons.css" />
<!-- 共用css统一引入 -->
</head>