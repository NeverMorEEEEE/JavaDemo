//jquery      载入完毕后事件 ,先于body.
//作为全局的事件写在这里
$(document).on("mouseover",".layout-button-right",function(){
  if($(this).parent().children().length==2){
    $(this).attr("title","收起面板");
  }
});

$.fn.tmp = function(obj) {
    return this.each(function() {
        $(this).html($(this).html($(this).html().replace(/%{/g,"${")).tmpl(obj));
    });
};

var Timeout_tips;
$.extend({
    tips : function(状态,文字,时间,头部位置){
    	if(时间==0){时间=0.01;}
        if(dialog.get("d_tips")){ 
        	dialog.get("d_tips").content('<table class="d_tips"><tr><td>'+
        			'<img src="'+$ctx+"/common/cssjs/artDialog/icon/"+(状态||"loading")+'.gif"/>'+
        			'</td><td>'+(文字||"打个文字会si么")+'</td></tr></table>');
        	clearTimeout(Timeout_tips);
        	Timeout_tips=setTimeout(function () {
            	if(dialog.get("d_tips")){
            		dialog.get("d_tips").close().remove();
            	}
            },(时间||2)*1000);
        }else{
            var d = dialog({
                id:"d_tips",
                padding:10,
                onshow: function () {
                    setTimeout(function(){
                    	if(dialog.get("d_tips")){dialog.get("d_tips").reset();}
                    	if(头部位置!=undefined){$(".ui-popup.ui-popup-modal.ui-popup-show.ui-popup-focus").css("top",头部位置);};
                    },100);
                    setTimeout(function(){
                    	if(dialog.get("d_tips")){dialog.get("d_tips").reset();}
                    	if(头部位置!=undefined){$(".ui-popup.ui-popup-modal.ui-popup-show.ui-popup-focus").css("top",头部位置);};
                    },300);
                },
                content: '<table class="d_tips"><tr><td><img src="'+$ctx+"/common/cssjs/artDialog/icon/"+(状态||"loading")+'.gif"/></td><td>'+(文字||"打个文字会si么")+'</td></tr></table>'
            }).showModal();


            $(".ui-popup").each(function(){
                if($(this).attr("aria-describedby")=="content:d_tips"){
                    $(this).next().css("background","");
                }
            });
            clearTimeout(Timeout_tips);
            Timeout_tips=setTimeout(function () {
            	if(dialog.get("d_tips")){
            		dialog.get("d_tips").close().remove();
            	}
            }, (时间||2)*1000);
        } 
    }
});



function v_form(){
    setTimeout(function(){
        $(".msg-box").each(function(){
            var aa=$(this).clone(true);
            if($(this).parent().attr("i")=="content"){
                return;
            }

            var id=$(this).attr("for");

            $(".msg-box").each(function(){
                if($(this).attr("for")==id){
                    if($(this).parent().attr("i")=="content"){
                        $(this).parent().parent().parent().parent().parent().parent().parent().remove();
                    }
                }
            });

            var d = dialog({
                align: 'right',
                padding:8,
                content: aa[0],
                quickClose: false
            });
            if($("#"+id).length>0){
                d.show($("#"+id)[0]);
                $("#"+id).focus();

            }else {
                d.show($(id)[0]);
                $(id).focus();

            }
            $(this).remove();
        });
    },100);

}

/*

$("form",document).on('validation', function(e, current){
    v_form();
});

*/



$.fn.amsclick = function(fn,before_click,after_click) {
    if(before_click==undefined){
        before_click=function(_this){
            _this.css("background","blue");
        }
    }
    if(after_click==undefined){
        after_click=function(_this){
            _this.css("background","red");
        }
    }
    return this.each(function() {
        $(this).bind("click",function(){
            var _this=$(this);
            before_click(_this);
            setTimeout(function(){
                fn();
                after_click(_this);
            },0);
        });
    });
};


$.fn.easy_datagrid = function(data) {
    //支持2种格式 data  {rows:[{aaa:111,bbb:222}]}    or    [{aaa:111,bbb:222}]
    //datagrid的简化方法

    return this.each(function(){
        var d=[];
        data.rows? d=data.rows:d=data;

        var columns=[];
        for(var i in d[0]){
            columns.push({field:i,title:i,width:100});
        }
        $(this).datagrid({
            columns : [columns]
        }).datagrid("loadData",data);

    });
};

$.fn.datagrid2handsontable = function() {
    //将datagrid 表格 转换为 handsontable
    return this.each(function(){
        var data=$(this).datagrid("getData");//获取datagrid 数据
        var head_fields=$(this).datagrid("getColumnFields"); //获取datagrid 表头行
        var colums=[]; //用于生成 handsontable 的表头
        $.each(head_fields,function(){//根据grid的表头行生成 handsontable的  显示列
            colums.push({data:this});
        });
        if(data.rows){//json 形式的 数据
            data=data.rows;
        }
        //parent 的样式 overflow auto 用于显示滚动条
        $("<table></table>").appendTo($(this).parent().parent().css("overflow","auto").empty())
            .handsontable({
            data: data, //载入数据
            colHeaders: head_fields, //显示列标头
            rowHeaders: true ,  //显示行号
            columns:colums  //可显示的列
        });

    });
};

$.fn.listen_width= function(fn) { //监听对象内容是否改变
    return this.each(function() {
        var self = this;
        var old_W = $(this).width();
        $(this).data('watch_timer', setInterval(function() {
            if ($(self).width() !== old_W) {
                old_W = $(self).width();
                fn();//fn ()不能用 this 会有bug
            }
        },500));
    });
};

$.fn.listen_height= function(fn) { //监听对象内容是否改变
    return this.each(function() {
        var self = this;
        var old_h = $(this).height();
        $(this).data('watch_height', setInterval(function() {
            if ($(self).height() !== old_h) {
                old_h = $(self).height();
                fn();//fn ()不能用 this 会有bug
            }
        },500));
    });
};



var _=function (a){
    if(window.console){
        console.info(a);
    }
}
var __=function (a){
    if(window.console){
        console.error(a);
    }
}

if($kf=="false"){
    _=function(){};
}

String.prototype.format = function(pars) {
    var s = this;
    if(pars) {
        for(var key in pars) {
            var value = pars[key];
            var reg = new RegExp("{"+key+"}","g");
            s = s.replace(reg, value);
        }
    }
    return s;
};

function build_tree(oldObject){//将简单树转换为复杂树.  还需要优化 id pid . 以及 中文主键的支持

    if($.isArray(oldObject)==false){
        __("数据异常,build_tree终止.");
        return;
    }
    if(oldObject.rows){
        oldObject=oldObject.rows;
    }

    var obj = $.extend(true,{},{rows:oldObject});//克隆对象
    var arr=[];

    obj=obj.rows;

    for(var i =0; i<obj.length;i++){//制作children空间
        obj[i]["children"]=[];
    }

    function return_index(arr,s){//取pid 的id的对象
        for(var i =0; i<arr.length;i++){
            if(arr[i]["id"]==s)
            {
                return i;
            }
        }
        return "false";
    }

    for(var i =0; i<obj.length;i++){//关键函数
        var pid=obj[i]["pid"];
        //console.info(i+":"+pid+"-->"+return_index(obj,pid))
        if(return_index(obj,pid)=="false"){
            arr.push(obj[i]);
        }else {
            obj[return_index(obj,pid)]["children"].push(obj[i]);
        }
    }

    return arr;
}
