/**
 * CPII SDK js jQuery
 */
var Cpi = Cpi||{};
Cpi.SDK = Cpi.SDK||{};

Cpi.SDK.cpiiCall = function(option) {
	var rData;
	$.ajax({
		url : tz.furl("/api4cpi",{clazz:option.clazz, method:option.method}),
		data : option.data,
		async:false,
		success : function(r) {
			rData = r;
		},
		error : function(jqHXR, error) {
			alert("请求失败"+Cpi.SDK.WEB_APP+'/api4cpi?clazz=' + option.clazz + '&method='
					+ option.method);
		}
	});
	return rData;
};


Cpi.SDK.ythCall = function(option) {
	var rData;
	$.ajax({
		url : tz.furl("/business/ws/proc/"+option.method),
		data : option.data,
		async:false,
		success : function(r) {
			rData = mini.encode(r);
		},
		error : function(jqHXR, error) {
			alert("请求失败"+tz.furl("/business/ws/proc/"+option.method));
		}
	});
	return rData;
};

Cpi.SDK.putEntityMapper = function(hostId,mapperId,domainName,group){
	return this.cpiiCall({ clazz:"proc", method:"putEntityMapper", data:{hostId:hostId,mapperId:mapperId,domainName:domainName,group:group} });
};

Cpi.SDK.getEntityMapper = function(id,domainName,group,fromDomain){
	return this.cpiiCall({ clazz:"proc", method:"getEntityMapper", data:{id:id,domainName:domainName,group:group,fromDomain:fromDomain}});
};

Cpi.SDK.queryNode = function(activityDn){
	return this.cpiiCall({ clazz:"proc", method:"queryNode", data:{activityDn:activityDn} });
};

Cpi.SDK.queryActivity = function(flowId,flowNodeId){
	return this.cpiiCall({ clazz:"proc", method:"queryActivity", data:{flow:flowId,flowNode:flowNodeId}});
};

Cpi.SDK.startFlow = function(data){
	$.ajax({
		url : tz.furl("/business/ws/proc/save"),
		data : data,
		async : false,
		success : function(r) {
			data.bod001 = r.data;
		},
		error : function(jqHXR, error) {
			alert("请求失败"+tz.furl("/business/ws/proc/save"));
		}
	});
	return this.ythCall({ clazz:"proc", method:"startFlow", data:data });
};

Cpi.SDK.procFlow = function(data){
	return this.ythCall({ clazz:"proc", method:"procFlow",data:data });
};

Cpi.SDK.endFlow = function(data){
	return this.ythCall({ clazz:"proc", method:"endFlow", data:data });
};