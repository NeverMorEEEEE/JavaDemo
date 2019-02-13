var tz = tz||{};

tz.IssuedDocument = function(aga160, bod001, bod065){
	tz.ajaxSubmit({
		url: tz.furl("/business/transact/document/issuedDocument", {aga160:aga160, bod001:bod001, bod065:bod065}),
		success: function(r){
			if(r.success){
				tz.pageOffice(tz.furl("/business/transact/document/openPoDoc",{aga167: r.data.aga167}));
			}else{
				mini.alert(r.msg);
			}
		}
	});
}

tz.openPoDoc = function(aga167){
	tz.pageOffice(tz.furl("/business/transact/document/openPoDoc",{aga167: aga167}));
}

tz.viewPoDoc = function(aga167){
	tz.pageOffice(tz.furl("/business/transact/document/viewPoDoc",{aga167: aga167}));
}