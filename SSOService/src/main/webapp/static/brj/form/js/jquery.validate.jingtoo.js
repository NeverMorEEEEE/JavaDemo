/*************************************************************************************************
 * ************************JQuery's validator for JT  ********************************************
 * Creator:huangj cheny
 * Date:
 * Description:
 * ***********************************************************************************************
 *      Modify       Date        Description
 *      hunagjb      20110624    增加判断大写字母、小写字母的验证
 ************************************************************************************************/

/***************************中文 ，中文（含特殊符号）*********************************************/
// 中文字两个字节
jQuery.validator.addMethod("chinese", function(value, element, param){
    return this.optional(element) || /^[\u4e00-\u9fa5]+$/i.test(value);
}, $.validator.format("请输入汉字！"));

//中文字两个字节
jQuery.validator.addMethod("roleName", function(value, element, param){
    return this.optional(element) || /^[\u4e00-\u9fa5]+$/i.test(value);
}, $.validator.format("请输入汉字！"));

//中文，并能输入（）
jQuery.validator.addMethod("chineseI", function(value, element, param){ 
    return this.optional(element) || /^[\u4e00-\u9fa5()（）]+$/i.test(value);
}, $.validator.format("请输入汉字！"));

/*jQuery.validator.addMethod("checkMeta", function(value, element, param){
	alert($("#checkMeta").val());
	alert(this.optional(element) || /^[\u4e00-\u9fa5()（）]+$/i.test(value));
   // return false;
}, $.validator.format("请输入汉字！")); */ 

/****************************  仅数字 *********************************************************/
// 邮政编码验证   
jQuery.validator.addMethod("isZipCode", function(value, element){
    var tel = /^[1-9][0-9]{5}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的邮政编码");

//验证 浮点型 正数
jQuery.validator.addMethod("isFloat", function(value, element){
    var reg = /^[0-9]+(.[0-9]{1,11})?$/;
    return this.optional(element) || (reg.test(value));
}, "请输入浮点小数型");

//验证 数字
jQuery.validator.addMethod("isNumber", function(value, element){
    var reg = /^((-\d+)|(0+)|(\d+))$/;
    return this.optional(element) || (reg.test(value));
}, "请输入数字");

//验证 浮点型 正数
jQuery.validator.addMethod("isFloatOrNull", function(value, element){
    var reg = /^[0-9]+(.[0-9]{1,11})?$/;
    return this.optional(element) || (reg.test(value));
}, "请输入浮点小数型");

//验证 纯数字 by zhangWei 2012-12-28
jQuery.validator.addMethod("onlyNumber",function(value,element){
	var reg =/^[0-9]{0,8}$/;
	return this.optional(element)||(reg.test(value));
},"请输入长度不超过8位的纯数字，如:200012");

////验证 数字0-9999
//jQuery.validator.addMethod("isInt", function(value, element) {   
//    var reg=/^[1-9]{1}[0-9]{0,3}?$/; 
//    return this.optional(element) || (reg.test(value));
//}, "请输入大于0的整数型,0-9999");

//验证 数字0-9999
jQuery.validator.addMethod("isInt", function(value, element) {   
    var reg=/^[1-9]{1}[0-9]{0,}?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入大于0的整数型");

////验证 数字0-99999999
jQuery.validator.addMethod("isIntOrNull", function(value, element) {   
    var reg=/^[1-9]{1}[0-9]{0,7}?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入大于0的整数型,0-99999999");


//比较，当前验证的数据比 跟比较对象小（需要被比较的id="dataSize"）
jQuery.validator.addMethod("isIntCompare", function(value, element) { 
    return this.optional(element) || (Number(value) <= Number($("#dataSize").val()));
}, "请输入一个小于等于规定范围内的数字");

//手机号码数字
jQuery.validator.addMethod("mobilephone", function(value, element){
    var mp = /^1[358][0-9]{9}$/;
    return this.optional(element) || (mp.test(value));
}, "请输入正确的手机号码");

//密码
jQuery.validator.addMethod("password", function(value, element){
    //var pw = /^(\w){6,40}$/;
	var pw = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,30}$/;
    return this.optional(element) || (pw.test(value));
}, "密码必须是6-30个字节的数字和字母组合 ");

//身份证验证
jQuery.validator.addMethod("icard", function(value, element){
    var ic = /^[1-9]\d{5}((19)|(20))\d{2}((0[1-9])|(1[012]))((0[1-9])|([12][0-9])|(3(0|1)))\d{3}(\d|X)$/;
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var pass= true;
    if(!ic.test(value)){
        pass=false;
    }else if(!city[value.substr(0,2)]){
        pass=false;
    }else{
        //18位身份证需要验证最后一位校验位
        if(value.length == 18){
            value = value.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = value[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != value[17].toUpperCase()){
                pass =false;
            }
        }
    }
    return this.optional(element) || pass;
}, "请输入正确的身份证号码");

//有两位小数 
jQuery.validator.addMethod("isFloatTwo", function(value, element){
    var reg = /^-?[0-9]{0,2}(\.[0-9]{0,2}){0,1}$/;
    return this.optional(element) || (reg.test(value));
}, "请输入-99.99到99.99之间的数");


/**************************  仅字母   ***************************************/
// 判断字母
jQuery.validator.addMethod("english", function(value, element){
    var reg = /^[A-Za-z]+$/;
    return this.optional(element) || (reg.test(value));
}, "只能输入英文字母，注意空格！");
/**************************  字母和下划线  ***************************************/
/*判断字母下划线
 * author:zhangwei
 * */

jQuery.validator.addMethod("nameEn", function(value, element){
 var reg = /^[A-Za-z_\-\.]+$/;
 return this.optional(element) || (reg.test(value));
}, "只能输入英文字母,分隔符使用“-、.、_”！");

/*
 * author:huangjb
 * memo:判断大写字母
 */
jQuery.validator.addMethod("upperEnglish", function(value, element){
    var reg = /^[A-Z]+$/;
    return this.optional(element) || (reg.test(value));
}, "只能输入英文大写字母，注意空格！");


//只能输入数字或字母
jQuery.validator.addMethod("isIntEnglish", function(value, element){
    var fc = /^[a-zA-Z0-9]+$/;///^[a-zA-Z]{1}[0-9]{3}$/;
    return this.optional(element) || (fc.test(value));
}, "只能输入数字或字母");

/*
 * author:huangjb
 * memo:判断小写字母
 */
jQuery.validator.addMethod("lowerEnglish", function(value, element){
    var reg = /^[a-z]+$/;
    return this.optional(element) || (reg.test(value));
}, "只能输入英文小写字母，注意空格！");

/***********************字母，数字，特殊符号*************************************/
/*
 * author:huangjb
 * memo:判断字母、数字和"."或"-"
 * Description:实体分类编号使用
 */
jQuery.validator.addMethod("entityCode",function(value,element){
	var reg=/^[\w\.-]+$/;
	return this.optional(element) || (reg.test(value));
},"类目编号以字母或数字开头，分隔符使用“-、.、_”！");

//全宗号
jQuery.validator.addMethod("fondcond", function(value, element){
    var fc = /^[a-zA-Z0-9]+$/;///^[a-zA-Z]{1}[0-9]{3}$/;
    return this.optional(element) || (fc.test(value));
}, "只能输入数字或字母");

//数字和英文， 长度是1-15
jQuery.validator.addMethod("numberOrEnglish", function(value, element){
    var fc = /^[a-zA-Z0-9]{1,15}$/;///^[a-zA-Z]{1}[0-9]{3}$/;
    return this.optional(element) || (fc.test(value));
}, "请输入在1-10个字节之间的数字或字母");

/***********************    日期    ***************************************************/
//验证 日期时间型 2010/11/2 10:03:05
/*jQuery.validator.addMethod("isLongDate", function(value, element){
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    return this.optional(element) || (reg.test(value));
}, "请输入日期时间型");

//验证 时间型 10:03:05
jQuery.validator.addMethod("isTime", function(value, element){
    var reg = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/;
    return this.optional(element) || (reg.test(value));
}, "请输入时间型");*/

//验证年份 1900-2999 guoqw
jQuery.validator.addMethod("isYear", function(value, element) {   
    var reg=/^1[9][0-9][0-9]|2[0-9][0-9][0-9]?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入合理的年份,1900-2999之间的数字");

//验证年份 1900-2999或者null guoqw
jQuery.validator.addMethod("isYearOrNull", function(value, element) {   
    var reg=/^1[9][0-9][0-9]|2[0-9][0-9][0-9]?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入合理的年份或置空,1900-2999之间的数字");

//验证月份 01-12 guoqw
jQuery.validator.addMethod("isMonth", function(value, element) {   
    var reg=/^0[1-9]|1[0-2]?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入合理的月份,01-12之间的数字");

//验证月份 01-12或者null guoqw
jQuery.validator.addMethod("isMonthOrNull", function(value, element) {   
    var reg=/^0[1-9]|1[0-2]?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入合理的月份或置空,01-12之间的数字");

//验证天数 01-31 guoqw
jQuery.validator.addMethod("isDay", function(value, element) {   
    var reg=/^0[1-9]|1[0-9]|2[0-9]|3[0-1]?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入合理的天数,01-31之间的数字");

//验证天数 01-31或者null guoqw
jQuery.validator.addMethod("isDayOrNull", function(value, element) {   
    var reg=/^0[1-9]|1[0-9]|2[0-9]|3[0-1]?$/; 
    return this.optional(element) || (reg.test(value));
}, "请输入合理的天数或置空,01-31之间的数字");

/***********中文字、英文字母、数字和下划线***********/
// 用户名
jQuery.validator.addMethod("username", function(value, element){
    var un = /^[a-zA-Z0-9]{1}[a-zA-Z0-9|-|_]{2,14}[a-zA-Z0-9]{1}$/;
    return this.optional(element) || (un.test(value));
}, "用户名只包括中文字、英文字母、数字和下划线");

/**************英文字母、数字和下划线*************/
jQuery.validator.addMethod("ftpName", function(value, element){
    var fn = /^ftp:\/{2}[a-zA-Z0-9|-|_]{1,32}:[a-zA-Z0-9]{1,32}@((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    return this.optional(element) || (fn.test(value));
}, "中转FTP站点格式:ftp://用户名:密码@ip地址:端口");

/**************http/https请求地址*************/
jQuery.validator.addMethod("httpUrl", function(value, element){
    var un = /^(http:\/\/|https:\/\/)[^\s]*$/;
    return this.optional(element) || (un.test(value));
}, "http\/https地址格式不对");

/*************************   验证是否重复  **********************************************/
jQuery.validator.addMethod("checkUser",function(value,element){
   var state = false;
   jQuery.ajax({			
	       url:$ctx+"/modules/app/fondsAction!doCheckSomeName.cgi?po.data.tableName="+tableName+"&po.data.i_fonds_id="+fonds+"&fondsName="+$(element).attr("name")+"='"+value+"'", 
	       type:'POST',         
	       dataType:'json',     
	       async:false,
	       success:function(data){
	        	if(data['msg']=="true"){
	        		 state = true;
	        	}else {
	        		 state = false;
	        	}
	
	       }
  });
    return state;   
},"已存在，请重新输入");
jQuery.validator.addMethod("systemCode",function(value,element){
    var state = false;
    jQuery.ajax({
        url:$ctx+"/business/component/infConfigAction!doCheckCode.cgi?infManagement.code="+value,
        type:'POST',
        dataType:'json',
        async:false,
        success:function(data){
            if(data['msg']=="false"){
                state = true;
            }else {
                state = false;
            }

        }
    });
    return state;
},"已存在，请重新输入");

jQuery.validator.addMethod("checkEditUser",function(value,element){	
	   var state = false;
	   if(value == EditName){
		   state = true;
	   }else{
		   jQuery.ajax({			
			       url:$ctx+"/modules/app/fondsAction!doCheckSomeName.cgi?po.data.tableName="+tableName+"&po.data.i_fonds_id="+fonds+"&fondsName="+$(element).attr("name")+"='"+value+"'", 
			       type:'POST',         
			       dataType:'json',     
			       async:false,
			       success:function(data){
			        	if(data['msg']=="true"){
			        		 state = true;
			        	}else {
			        		 state = false;
			        	}
			
			       }
		  });
	   }
	    return state;   
	},"已存在，请重新输入");
jQuery.validator.addMethod("checkdictionary",function(value,element){
	   var state = false;
	   if(typeof EditValue !="undefined"&&typeof EditCode !="undefined"&& $(".checkdictionary").eq(0).val() == EditValue && $(".checkdictionary").eq(1).val()==EditCode){
		   state = true;
	   }else{
		   jQuery.ajax({			
			       url:$ctx+"/modules/app/archiveDictionaryAction!doCheckDictionary.cgi?po.data.tableName=APP_ARCHIVE_DICTIONARY&po.data.i_fonds_id="+fonds, 
			       type:'POST',         
			       dataType:'json',
			       data:{sqlwhere:"c_name='"+$("input[name='po.data.c_name']").val()+"' and (c_value='"+$(".checkdictionary").eq(0).val()+"' or c_code='"+$(".checkdictionary").eq(1).val()+"')"},
			       async:false,
			       success:function(data){
			        	if(data['msg']=="true"){
			        		 state = true;
			        	}else {
			        		 state = false;
			        	}
			
			       }
		  });
	   }
	    return state;   
	},"数据字典名称中已存在该值和该编码，请修改值或编码");
	//验证 数字0-999999999	
	jQuery.validator.addMethod("intjiu", function(value, element) {   
		var reg=/^[0-9]{1}[0-9]{0,8}?$/; 
		return this.optional(element) || (reg.test(value));
	}, "请输入整数");

	jQuery.validator.addMethod("year", function(value, element) {   
		var reg=/^[1-9]{1}[0-9]{0,3}?$/; 
		return this.optional(element) || (reg.test(value));
	}, "请输入正确的年份");
/*************************************************************************************************
 *
 *
 *
 ************************************************************************************************/
jQuery.validator.addClassRules({
	numberorenglish:{ 	required: true,		numberorenglish:true,			minlength: 1,        maxlength: 15	},
	checkUser:{											checkUser:true	},
	checkdictionary:{									checkdictionary:true	},
	checkEditUser:{										checkEditUser:true	},
    username: {      			required: true,      username: true,       				minlength: 1,        maxlength: 16    },
    ftpName: {    			required: true,      ftpName: true    },
    icard: {       				required: true,     	icard: true,        					maxlength: 18    },
    password: {       		required: true,      password: true,        				minlength: 1,        maxlength: 40    },
    mobilephone: {         required: true,      mobilephone: true,   	 	    minlength: 11,        maxlength: 11    },
    chinese: {       			required: false,     chinese: true,       					minlength: 2,        maxlength: 25    },
    chineseI: {      			required: true,      chineseI: true    },    
    isZipCode: {    		    required: true,      isZipCode: true,       				minlength: 5,        maxlength: 6    },
    english: {    				required: false,     english: true,     					minlength: 0    },
    nameEn :{ 				required: false, nameEn:true, minlength:0},
    upperEnglish: {   	 	required: false,     upperEnglish: true    },
    lowerEnglish: {    		required: false,     lowerEnglish: true    },
	entityCode: {											entityCode: true,					minlength:1	},
    isFloat: {       				required: true,         isFloat: true    },
    isNumber:{    			required: true,         isNumber: true    },
    isFloatOrNull: {         required: false,        isFloat: true    },
    isInt: {      					required: false,        isInt: true    },
    onlyNumber:{			required:false, 	onlyNumber:true},
    isIntOrNull: {      		required: false,        isIntOrNull: true    },
    isIntCompare:{    								 	   isIntCompare:true    },
    isIntEnglish:{     		required: false,        isIntEnglish: true    },
    fondcond: {      			required: true,         fondcond: true    },
    roleName: {     			required: true,         roleName: true,     			 minlength: 1,        maxlength: 10    },
    isFloatTwo:{    			required:true,    	   isFloatTwo:true    },
    intjiu:{                    required: true,        intjiu:true},
    year:{   required:true, year:true},
    isYear       :{    required:true,       isYear:true},
    isYearOrNull :{    required:false,      isYearOrNull:true},
    isMonth      :{    required:true,       isMonth:true},
    isMonthOrNull:{    required:false,      isMonthOrNull:true},
    isDay        :{    required:true,       isDay:true},
    isDayOrNull  :{    required:false,      isDayOrNull:true},
    systemCode :{required:true,systemCode:true},
    httpUrl :{required:true,httpUrl:true}

});



/*************************************************************************************************
*WJ_add
************************************************************************************************/
//textarea限制输入字符数  maxchar
/*function textCounter(field) {
	var maxchar=$(field).attr("maxchar"); 
	var charcnt = field.value.length;  
	if (charcnt > maxchar) { 
		field.value = field.value.substring(0, maxchar);}
		else { document.getElementById("show_maxchar").innerHTML="已输入："+charcnt+"/"+maxchar;}
	};
	*/

function textCounter(field) {
	var maxchar =$(field).attr("maxchar");
	var charcnt = field.value.length;
	if (charcnt > maxchar) {
		field.value = field.value.substring(0, maxchar);}
	else {
		$(field).next().html("已输入:"+charcnt+"/"+maxchar);}
};

function checkTextarea (){
/*	if($("textarea").length >0){
		for (var i = 0; i < $("textarea").length;i++){
			if($("textarea:eq("+i+")").attr("maxchar")){
				$("#show_maxchar").remove();
				var tt=$("textarea:eq("+i+")");
				var text="已输入:"+tt.text().length+"/"+tt.attr("maxchar");
				tt.bind("keyup",function(){textCounter(this);});//先keyup ,后 keydown
				tt.bind("keydown",function(){textCounter(this);});
				tt.wrap("<span style='position:relative;'></span>");
				tt.after("<div id=show_maxchar>"+text+"</div>");
			}
		}
	}	*/
	
	$("#show_maxchar").remove();
	$("textarea").each(function(i){
		if($(this).attr("maxchar")){
			var tt=$(this);
			var text="已输入:"+tt.text().length+"/"+tt.attr("maxchar");
			tt.bind("keyup",function(){textCounter(this);});//先keyup ,后 keydown
			tt.bind("keydown",function(){textCounter(this);});
			tt.wrap("<span style='position:relative;'></span>");
			tt.after("<div id=show_maxchar>"+text+"</div>");
		}
	});

	
}

$(document).ready(function(){
	checkTextarea ();
//	$("#Tform input:text:eq(0)").focus();
	
/*	$("label").each(function(index) {
		label = $("label:eq("+index+ ") *").clone();
		$("label:eq("+index+ ")").html($.trim($("label:eq("+index+ ")").text()));
		label.prependTo("label:eq("+index+ ")");
	});*/
	


	//$("#Tform").html( $("#Tform").html().replace(/\f|\n|\r|[" "]{2}/g,"").replace(/> /g,">").replace(/ </g,"<"));
	

});
	


	
//ftp  验证	
	jQuery.validator.addMethod("ftp", function(value, element){
	    var fn = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/;
	    return this.optional(element) || (fn.test(value));
	}, "FTP地址，如:127.0.0.1");
	
//验证 数字0-999
	jQuery.validator.addMethod("int999", function(value, element) {   
	    var reg=/^[1-9]{1}[0-9]{0,2}?$/; 
	    return this.optional(element) || (reg.test(value));
	}, "请输入1-999的整数型");	
//验证 数字0-9999
	jQuery.validator.addMethod("int", function(value, element) {   
	    var reg=/^[1-9]{1}[0-9]{0,1}?$/; 
	    return this.optional(element) || (reg.test(value));
	}, "请输入大于0的整数型");
	
/*************************************************************************************************
*textarea限制输入字符数  maxchar
************************************************************************************************/	