/**
 * 一体化客户端 javascript SDK v1 20170424 （初始化版本） TZYTH.YTH_MODEL 设置是联机模式（online），
 * 单机测试模式（local）开发测试用。 
 * TZYTH.initializeFlow 客户端一般在主体定位后调用初始化操作界面，参数为主体信息subject={subjectKey:"主体类型",subjectKey:"主体证件号",subjectName:"主体名称"}。
 * TZYTH.getYth 客户端获取一体化信息，返回json格式。里面内容会根据操作变更，请在使用前调用。 
 * TZYTH.getYths 客户端获取一体化信息，返回json格式字符串。里面内容会根据操作变更，请在使用前调用。 
 * TZYTH.validate 客户端调用改函数进行保存前验证。
 * TZYTH.saveSuccess 关闭一体化弹出窗口，客户端保存成功后选择执行。
 * 
 */
var TZYTH = TZYTH || {
	YTHWindowName : "_TZYTH_WINDOW",
	YTH_MODEL : "online"
};
(function() {
	var YTHIFrame;
	if (TZYTH.YTH_MODEL == 'online') {
		YTHIFrame = _GetYTHIFrame();
	} else if (YTH_MODEL == 'local') {
		YTHIFrame = _LocalYTHIFrame();
	}

	TZYTH.initializeFlowObj = function(subject) {
		try {
			return YTHIFrame.initializeFlow(subject);
		} catch (e) {
			alert("调用接口异常 initializeFlowObj");
		}
	}
	
	TZYTH.initializeFlow = function(subject_, subjectKey, subjectName, subjectNeType, subjectNeKey, subjectNeName) {
		if(typeof(subject_) == "object" 
			&& Object.prototype.toString.call(subject_).toLowerCase() == "[object object]"
			&& !subject_.length){
			return TZYTH.initializeFlowObj(subject_);
		}
		
		try {
			var subject = {};
			subject.subjectType = subject_;
			subject.subjectKey = subjectKey;
			subject.subjectName = subjectName;
			subject.subjectNeType = subjectNeType||"";
			subject.subjectNeKey = subjectNeKey||"";
			subject.subjectNeName = subjectNeName||"";
			return YTHIFrame.initializeFlow(subject);
		} catch (e) {
			alert("调用接口异常 initializeFlow");
		}
	}
	
	TZYTH.initICV = function(param){
		try {
			return YTHIFrame.initICV(param);
		} catch (e) {
			alert("调用接口异常 initICV");
		}
	}

	TZYTH.getYth = function() {
		try {
			return YTHIFrame.getYth();
		} catch (e) {
			alert("调用接口异常 getYth ");
		}
	}

	TZYTH.getYths = function() {
		try {
			return YTHIFrame.getYths();
		} catch (e) {
			alert("调用接口异常 getYths");
		}
	}

	TZYTH.validate = function() {
		try {
			return YTHIFrame.validate();
		} catch (e) {
			alert("调用接口异常 validate");
		}
	}

	TZYTH.saveSuccess = function(code) {
		try {
			YTHIFrame.saveSuccess(code);
		} catch (e) {
			alert("调用接口异常 saveSuccess");
		}
	}
})();

// 获取一体化容器框架
function _GetYTHIFrame() {
	var safeLeve = 50, p = parent, i = 0;
	while (true) {
		if (!p)
			return;
		try {
			if (p.window.name == TZYTH.YTHWindowName)
				return p;
		} catch (e) {
		}
		if (p == p.parent)
			return;
		p = p.parent;
		i++;
		if (i > safeLeve)
			return;
	}
}

function _LocalYTHIFrame() {
	return {
		yth : {
			tkey : " 办件编码 ",
			aga001 : " 事项编码 ",
			fuid : " 档案编码 ",
			tkey_azb065 : " 业务办理环节编码 ",
			userid : " 当前用户编码 ",
			bizId : " 业务ID ",
			subjectType : " 主体类型 ",
			subjectKey : " 主体证件号码 ",
			subjectName : " 主体名称 ",
			subjectPhone : " 主体联系电话 "
		},

		initializeFlow : function(subject) {
			this.yth.subjectType = subject.subjectType || this.yth.subjectType;
			this.yth.subjectKey = subject.subjectKey || this.yth.subjectKey;
			this.yth.subjectName = subject.subjectName || this.yth.subjectName;
			alert(" 本地模式初始化 ");
		},

		getYth : function() {
			return this.yth;
		},

		getYths : function() {
			return this.getYth();
		},

		validate : function() {
			return {
				isValid : true,
				msg : "ok"
			};
		},

		saveSuccess : function(code) {
			alert(" 本地模式： " + code);
		}
	}
}