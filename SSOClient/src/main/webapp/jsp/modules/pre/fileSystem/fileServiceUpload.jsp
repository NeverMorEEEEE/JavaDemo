
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>

<div id="dzdaframe" style="height:300px"></div>
<%@ include file="/head.jsp"%>
<script type="text/javascript" src="${base}/filext-embed/icv.js?v2.3"></script>
<script type="text/javascript">
	var tzicv; 
	$(function(){
		mini.parse();
		tzicv = tzicv || icv.setupConfig({
			appcontext : '${base}',// 业务系统上下文地址
			bname : 'LSYTH',
			privilege : {
				disablePrint : false,
				disableDownload : false,
				disableOperate : false
			}
		});
		tzicv.render('dzdaframe', '${ga01.YWCODE}', "",'${fuid}', "", {
			subjectType: '01',//主体类型
			subjectKey: '972270194', //主体编码
			subjectName: 'wac'//主体名称
		});
	})
	
	 function initICV(params){
		params = params||{};
		params.aga001 = "${ga01.aga001}";
		params.bizCode = "${ga01.aga002}";
		
		tzicv = tzicv || icv.setupConfig({
			appcontext : '${base}',// 业务系统上下文地址
			bname : 'YTHPT',
			privilege : {
				disablePrint : false,
				disableDownload : false,
				disableOperate : false
			}
		});
		
		tz.ajaxSubmit({
			url : tz.furl("/business/icv/tzicv/getFuid"),
			data : params,
			success : function(r){
				if(r.data){
				    if(r.msg){
						mini.showTips({
							content:r.msg
						});
					} 
					tzicv.render('dzdaframe', "${ga01.aga002}", "", r.data, "", {
						subjectType: params.subjectType,//主体类型
						subjectKey: params.subjectKey, //主体编码
						subjectName: params.subjectName//主体名称
					});
					mini.get("fuid").setValue(r.data);
				}else{
					mini.showTips({
						content:r.msg
					});
					icv.complete = function(){
						mini.get("fuid").setValue(icv.fuId);
					}
					tzicv.renderMode('dzdaframe', params.mode, params);
				}
			}
		})
	} 
</script>