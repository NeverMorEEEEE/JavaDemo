var tz = tz || {};

/**
 * 去字符串空格
 * 
 */
tz.trim = function(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
};
tz.ltrim = function(str) {
	return str.replace(/(^\s*)/g, '');
};
tz.rtrim = function(str) {
	return str.replace(/(\s*$)/g, '');
};

/**
 * 判断开始字符是否是XX
 * 
 */
tz.startWith = function(source, str) {
	var reg = new RegExp("^" + str);
	return reg.test(source);
};
/**
 * 判断结束字符是否是XX
 * 
 */
tz.endWith = function(source, str) {
	var reg = new RegExp(str + "$");
	return reg.test(source);
};

/**
 * iframe自适应高度
 * 
 * 
 * @param iframe
 */
tz.autoIframeHeight = function(iframe) {
	iframe.style.height = iframe.contentWindow.document.body.scrollHeight
			+ "px";
};

/**
 * 设置iframe高度
 * 
 * 
 * @param iframe
 */
tz.setIframeHeight = function(iframe, height) {
	iframe.height = height;
};

/**
 * 全世界最短的IE判定
 */
tz.isIE = function() {
	if (-[ 1, ]) {
		return false;
	} else {
		return true;
	}
}

/**
 * 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
 * 
 * @param e
 * @returns {Boolean}
 */
tz.banBackSpace = function(e) {
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源

	var t = obj.type || obj.getAttribute('type');// 获取事件源类型

	// 获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	var vEnabled = obj.getAttribute('enabled');

	// 处理null值情况
	vReadOnly = (vReadOnly == null) ? false : true;
	vEnabled = (vEnabled == null) ? true : vEnabled;

	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readonly属性为true或enabled属性为false的，则退格键失效
	var flag1 = (ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true
			: false;
	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true
			: false;
	// 判断
	if (flag2) {
		return false;
	}
	if (flag1) {
		return false;
	}
};

tz.base64Encode = function(str) {
	if (!str || typeof (str) != 'string') {
		return str;
	}
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
					| ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
};

tz.base64Decode = function(str) {
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62,
			-1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1,
			-1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
			15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1,
			26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
			43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
};

tz.md5 = {
	hexcase : 0,
	b64pad : "",
	chrsz : 8,
	hex_md5 : function(s) {
		return this.binl2hex(this.core_md5(this.str2binl(s), s.length
				* this.chrsz))
	},
	b64_md5 : function(s) {
		return this.binl2b64(this.core_md5(this.str2binl(s), s.length
				* this.chrsz));
	},
	str_md5 : function(s) {
		return this.binl2str(this.core_md5(this.str2binl(s), s.length
				* this.chrsz));
	},
	hex_hmac_md5 : function(key, data) {
		return this.binl2hex(this.core_hmac_md5(key, data));
	},
	b64_hmac_md5 : function(key, data) {
		return this.binl2b64(this.core_hmac_md5(key, data));
	},
	str_hmac_md5 : function(key, data) {
		return this.binl2str(this.core_hmac_md5(key, data));
	},
	core_md5 : function(x, len) {
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = this.safe_add(a, olda);
			b = this.safe_add(b, oldb);
			c = this.safe_add(c, oldc);
			d = this.safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	},
	md5_cmn : function(q, a, b, x, s, t) {
		return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q),
				this.safe_add(x, t)), s), b);
	},
	md5_ff : function(a, b, c, d, x, s, t) {
		return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	},
	md5_gg : function(a, b, c, d, x, s, t) {
		return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	},
	md5_hh : function(a, b, c, d, x, s, t) {
		return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
	},
	md5_ii : function(a, b, c, d, x, s, t) {
		return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	},
	core_hmac_md5 : function(key, data) {
		var bkey = this.str2binl(key);
		if (bkey.length > 16)
			bkey = this.core_md5(bkey, key.length * this.chrsz);
		var ipad = Array(16), opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = this.core_md5(ipad.concat(this.str2binl(data)), 512
				+ data.length * this.chrsz);
		return this.core_md5(opad.concat(hash), 512 + 128);
	},
	safe_add : function(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	},
	bit_rol : function(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	},
	str2binl : function(str) {
		var bin = Array();
		var mask = (1 << this.chrsz) - 1;
		for (var i = 0; i < str.length * this.chrsz; i += this.chrsz)
			bin[i >> 5] |= (str.charCodeAt(i / this.chrsz) & mask) << (i % 32);
		return bin;
	},
	binl2str : function(bin) {
		var str = "";
		var mask = (1 << this.chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += this.chrsz)
			str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
		return str;
	},
	binl2hex : function(binarray) {
		var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab
					.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF)
					+ hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
		}
		return str;
	},
	binl2b64 : function(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
					| (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
					| ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32)
					str += this.b64pad;
				else
					str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
			}
		}
		return str;
	}
};

/**
 * 
 * 描述：js实现的map方法
 * 
 * @returns {Map}
 */
function Map() {
	var struct = function(key, value) {
		this.key = key;
		this.value = value;
	};
	// 添加map键值对
	var put = function(key, value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		;
		this.arr[this.arr.length] = new struct(key, value);
	};
	// 根据key获取value
	var get = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	};
	// 根据key删除
	var remove = function(key) {
		var v;
		for (var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	};
	// 获取map键值对个数
	var size = function() {
		return this.arr.length;
	};
	// 判断map是否为空
	var isEmpty = function() {
		return this.arr.length <= 0;
	};
	this.arr = new Array();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
}

tz.ajaxSubmit = function(opts){
	opts = opts || {};
	if(!opts.hasOwnProperty("async")){
		opts.async = true;
	}
	try{
		var loading = mini.mask({
				el: document.body,
	            cls: 'mini-mask-loading',
	            html: '加载中...'});
		$.ajax({
			url: opts.url,
			data: opts.data,
			type: "post",
			async: opts.async,
			success: function(r){
				mini.unmask();
				if(typeof opts.success == 'function'){
					if(r.message){
						r.msg = r.message;
					}
					opts.success(r);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				mini.unmask();
				if(typeof opts.error == 'function'){
					opts.error(XMLHttpRequest, textStatus, errorThrown);
				}else{
					if(XMLHttpRequest.status==401){
						tz.malert('您还没有登录或登录已超时，请重新登录！');
						top.location=tz.base||"/";
						return;
					}
					tz.malert(XMLHttpRequest.responseText);
				}
			}
		});
	}catch(e){
		tz.malert(e);
	}
};

tz.malert = function (msg){
	try {
		mini.alert(msg);
	} catch (e) {
		alert(msg);
	}
};
