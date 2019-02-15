/*package com.zjtzsw.modules.common.feign;

@FeignClient(
        //服务名name = "demo-service",
        //服务地址
        url = "http://localhost:8083/demo-service"
)
public interface FeingnTest {

    //对应的服务里的接口地址，及请求方式
    @RequestMapping(value = "/hello/feignTest", method = RequestMethod.POST)
    @ResponseBody
    String feignString(@RequestParam(value="a") String a);

    *//**
     * 容错处理类，当调用失败时，简单返回空字符串
     *//*
    @Component
    public class DefaultFallback implements FeingnTest {
        @Override
        public String feignString(@RequestParam(value="ah") String a){
            return "";
        }
    }

}*/