package com.zjtzsw.common.exception;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.support.spring.FastJsonJsonView;

@ControllerAdvice
@ResponseBody
public class MyExcetionIntecptor implements HandlerExceptionResolver{
	 private static Logger log = LoggerFactory.getLogger(MyExcetionIntecptor.class);  
	 
//	 @ExceptionHandler(value= Exception.class)
//	 public Result<String> exceptionHandler(HttpServletRequest request,Exception e){
//		 e.printStackTrace();
//		 if(e instanceof WacException){
//			 e = (WacException)e;
//			 Result.error(e.get);
//		 }
//	 }
//	 
	 @ExceptionHandler(value= Exception.class)
	 public ResponseEntity<String> exceptionHandler(HttpServletRequest request,Exception e){
		 System.out.println("MyExcetionIntecptor.exceptionHandler()");
		 System.out.println(e.getLocalizedMessage());
		 System.out.println(">>>>>>>>>>>>>>>");
		 System.out.println(e.getMessage());
		 e.printStackTrace();
		 if(e instanceof WacException){
			 WacException wace = (WacException)e;
			 return ResponseEntity.status(HttpStatus.OK).contentType(new MediaType("text","html",Charset.forName("utf-8")))
					 .body(wace.getJSONStr());
		 }
		 
//		 HttpHeaders headers = new HttpHeaders();
//         MediaType mediaType = new MediaType("text","html",Charset.forName("utf-8"));
//         headers.setContentType(mediaType);
		 return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).contentType(new MediaType("text","html",Charset.forName("utf-8")))
				 .body(e.getMessage());

	 }
     
	    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,  Exception ex) {    
	        log.error("Wac's MyExcetionIntecptor Working!");   
	    	log.error(ex.getMessage());
	    	ModelAndView mv = new ModelAndView();  
	            /*  使用FastJson提供的FastJsonJsonView视图返回，不需要捕获异常   */  
	            FastJsonJsonView view = new FastJsonJsonView();  
	            Map<String, Object> attributes = new HashMap<String, Object>();  
	            attributes.put("code", "1000001");  
	            attributes.put("msg", ex.getMessage());  
	            view.setAttributesMap(attributes);  
	            mv.setView(view);   
	            log.debug("异常:" + ex.getMessage(), ex);  
	            return mv;  
	    }  
}
  