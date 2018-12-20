//屏蔽退格键
document.onkeydown   =   function(){  
        if(event.keyCode == 8){
	        //alert(event.srcElement.readOnly);
	        if(event.srcElement.tagName.toLowerCase() != "input" 
	              &&   event.srcElement.tagName.toLowerCase() != "textarea"){
	                event.returnValue = false; 
	        }
	        if(event.srcElement.tagName.toLowerCase() == "input" || event.srcElement.tagName.toLowerCase() == "textarea"){
	        	if(event.srcElement.readOnly){
	        		event.returnValue = false; 
	        	}
	        }
                
        }  else if(event.keyCode == 13 && event.srcElement.tagName.toLowerCase() != "textarea"){//enter
        	event.keyCode = 9;
        }
}