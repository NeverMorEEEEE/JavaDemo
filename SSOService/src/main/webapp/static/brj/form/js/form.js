// JavaScript Document
		$(function(){
			
				//$(".FormautoHeight tr:odd").css({"background":"#f5f5f5"});
			//	$("table.tableForm").attr("cellspacing","1");
				
				//readOnly
				$(".inputTd").each(function(){
					var readonly = $(this).find(".inputOff").attr("readonly");
					if(readonly==true){
						$(this).find(".inputOff").css("background","#EDEDED");
						$(this).find(".inputDateoff").css("background","#EDEDED");
					}
				});
				
				//输入框焦点标记
				$(".inputOff").focus(function(){
					$(this).addClass("inputOn");
				}).blur(function(){
					$(this).removeClass("inputOn");
				});
				
				$(".inputDateoff").focus(function(){
					$(this).addClass("inputDate");
				}).blur(function(){
					$(this).removeClass("inputDate");
				});
				
				//清缓存
				$(".inputOff").attr("autocomplete","off");
				
				//按钮鼠标经过
				$(".formBtn").mouseover(function(){
					$(this).addClass("formBtn_hover");
				}).mouseout(function(){
					$(this).removeClass("formBtn_hover");
				});
				
				//按钮右对齐
				$("#tpl_formButtons .formBtn").addClass("float_right");
				
		});


	//下拉菜单
	$(function(){
		$.fn.selectMenu = function(classSelect){
			classSelect.click(function(){
				var selectWidth = classSelect.width()+20;
				classSelect.next(".select_2").css("width",selectWidth);
				classSelect.next(".select_2").slideToggle("fast");
				classSelect.css("border-color","#207fcf");
			}).mouseover(function(){
				classSelect.css("border-color","#207fcf");
			}).mouseout(function(){
				classSelect.css("border-color","#9db0bf");
			});
			
			classSelect.next(".select_2").find("div a").click(function(){
				classSelect.text($(this).text());
				classSelect.next(".select_2").slideUp("fast");
				classSelect.css("border-color","#9db0bf");
			});/*mouseover(function(){
				$(this).css("background","#C6E2FF");
			}).mouseout(function(){
				$(this).css("background","#ffffff");
			}).*/
			
			classSelect.next(".select_2").hover(function(){
			},function(){
				classSelect.next(".select_2").slideUp();
			});
			/*$("body").focus(function(){
				alert("获取");
				$(".select_2").slideUp();
			});
			classSelect.next(".select_2").focus(function(){
				alert("获取");
			}).blur(function(){
				alert("失去");
				$(".select_2").slideUp();
			});*/
		};
		
	});
	
	/**
	 * checkbox相关 
	 * huangj
	 * @param parem
	 * @param methed
	 */
	function changeValue(parem,methed){
		if($(parem).attr("checked")){
			$($(parem).next()[0]).attr("value","1");
		}else{
			$($(parem).next()[0]).attr("value","0");
		}
		if(typeof methed!="undefined"){
			eval(methed);
		}
	}


