/*----------------------------------------------------------/
参数:width,height,left,top,title,content,okEvent,cancelEvent,icon
示例:$.message({content:'内容',width:'230px',height:'150px'});
说明:icon的值只能为icInfo,icScuess,icWarning,icError,icAsk
作者:ZhengNL
时间:2012-4-18
/----------------------------------------------------------*/
;(function($){
  $.extend({
     "message":function(options){
       //获取对应参数
       /*宽：尺寸可以带单位或使用百分比%。未定义默认宽度为300px*/
       var _width=options.width==undefined?'150px':options.width;
       /*高：尺寸可以带单位或使用百分比%。未定义默认高度为200px*/
       var _height=options.height==undefined?'100px':options.height;
       /*自定义坐标left：尺寸可以带单位或使用百分比%。未定义默认高度为50%*/
       var _left = options.left==undefined?'50%':options.left;
       /*自定义坐标top：尺寸可以带单位或使用百分比%。未定义默认高度为50%*/
       var _top = options.top==undefined?'50%':options.top;
       /*标题：默认为【信息】*/
       var _title =options.title==undefined?'信息':options.title;
       /*内容：弹出框中的内容*/
       var _content =options.content==undefined?'亲,记得写属性为[content]的内容':options.content;
       /*确定回调函数：确定的回调函数*/
       var _ok = options.okEvent==undefined?function(){return true;}:options.okEvent;
       /*取消的回调函数*/
       
       var _cancel = options.cancelEvent==undefined?function(){return true;}:options.cancelEvent;      
       /*多层锁屏时，一定要加parent参数*/
       function getDialog(){
    		if (frameElement)
    			return frameElement.api;
    	};

    	function getWindow(){ 
    		if(frameElement&&typeof(frameElement.api) == "object") {
    			return frameElement.api.opener;//如果是窗口 则获得 主窗口window
    		}else{
    			return window;
    		}
    	};

    	function getParentWindow(){
    		if(frameElement&&typeof(frameElement.api) == "object") {
    			return frameElement.api.parent;
    		}else{
    			return window;
    		}
    	};

    	var $dl = getDialog();

    	var $win = getWindow();

    	var $pWin = getParentWindow();
       var _parent = options.parent==undefined?$dl:options.parent;
       /*图标*/
       var _icon='32X32/succ.png';
       var sicon=options.icon;
       if(sicon=='icInfo'){//提示信息
           _icon='32X32/i.png';
       }else if(sicon=='icWarning'){//警告
           _icon='32X32/hits.png';
       }else if(sicon=='icError'){//错误
           _icon='32X32/fail.png';
       }else if(sicon=='icAsk'){//询问
    	   _icon='32X32/ask.png';       
       }else{//成功
           _icon='32X32/succ.png';
           sicon=='icScuess';
       }
       if(sicon=="icAsk"){    	   
    	   getWindow().$.dialog({    	 
    	         title:_title,          /*标题*/
    	         max:false,             /*去除最大按钮*/
    	         min:false,             /*去除最小按钮*/
    	         icon: _icon,           /*图标*/
    	         content:_content,      /*内容*/
    	         lock: true,            /*锁屏*/
    	         background: '#DCE2F1', /*背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */
    	         opacity: 0.5,          /*透明度 */
    	         left: _left,           /*左边距*/
    	         top:  _top,            /*顶边距*/
    	         width: _width,         /*宽度*/
    	         height:_height,        /*高度*/
    	         parent:_parent,        /*多层锁屏*/       
    	         button:[               /*定义按钮*/
    	             {
    	               name:'确定',
    	               callback:function(){ 	
    	            	  setTimeout(_ok,100);
    	               },
    	               focus:true
    	             },
    	             {
    	               name:'取消',
    	               callback:_cancel
    	             }
    	         ],
    	       close:function(){
    	    	   _cancel; 
    	       }
    	       });
       }else{//没有取消按钮
    	   getWindow().$.dialog({    	 
    	         title:_title,          /*标题*/
    	         max:false,             /*去除最大按钮*/
    	         min:false,             /*去除最小按钮*/
    	         icon: _icon,           /*图标*/
    	         content:_content,      /*内容*/
    	         lock: true,            /*锁屏*/
    	         background: '#DCE2F1', /*背景色 默认的遮罩背景色为:#DCE2F1浅蓝护眼色 */
    	         opacity: 0.5,          /*透明度 */
    	         left: _left,           /*左边距*/
    	         top:  _top,            /*顶边距*/
    	         width: _width,         /*宽度*/
    	         height:_height,        /*高度*/
    	         parent:_parent,        /*多层锁屏*/       
    	         button:[               /*定义按钮*/
    	             {name:'确定',
    	               callback:function(){ 
    	            	  //setTimeout(_ok,100);
    	               },
    	               focus:true
    	             }
    	         ],
    	         close:function(){
    	        	 setTimeout(_ok,100);
    	         }
    	   		
    	       });
        }//else结束   	   
      
     }
  });
})(jQuery);
