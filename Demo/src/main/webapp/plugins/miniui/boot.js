var path="http://"+window.location.host;
var pathName=window.document.location.pathname;
var WEB_APP=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
var messagePopTime = 5000;

__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = __CreateJSPath("boot.js");
//jQuery
document.write('<script src="' + bootPATH + 'jquery-1.6.2.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'jquery.messager.js" type="text/javascript"></script>');
//MiniUI
document.write('<script src="' + bootPATH + 'miniui.js" type="text/javascript"></script>');
document.write('<link href="'  + bootPATH + 'themes/default/miniui.css" rel="stylesheet" type="text/css"/>');
document.write('<link href="'  + bootPATH + 'themes/bootstrap/skin.css" rel="stylesheet" type="text/css"/>');
document.write('<link href="'  + bootPATH + 'themes/icons.css" rel="stylesheet" type="text/css"/>');
document.write('<link href="'  + bootPATH + 'extminiui/css/extminiui.css?v=1.0" rel="stylesheet" type="text/css"/>')
/*document.write('<link href="'  + bootPATH + 'themes/default/medium-mode.css" rel="stylesheet" type="text/css"/>');*/

//ExtMiniUI
/*document.write('<link href="'  + bootPATH + 'extminiui/css/extminiui.css?v=1.0" rel="stylesheet" type="text/css"/>');
document.write('<link href="'  + bootPATH + 'extminiui/css/exticons.css" rel="stylesheet" type="text/css"/>');
document.write('<script src="' + bootPATH + 'extminiui/js/ExtMiniui.js?v=1.0" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'extminiui/js/export.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'extminiui/js/global.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'extminiui/js/calculate.js" type="text/javascript"></script>');*/


//-----------------------------------------------------------------------------------------------------------//

//skin
var skin = getCookie("miniuiSkin");
if (skin) {
    document.write('<link href="' + bootPATH + 'themes/' + skin + '/skin.css" rel="stylesheet" type="text/css" />');
}

function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            lastMatch = aCrumb;
        }
    }
    if (lastMatch) {
        var v = lastMatch[1];
        if (v === undefined) return v;
        return unescape(v);
    }
    return null;
}

//-----------------------------------------------------------------------------------------------------------//
