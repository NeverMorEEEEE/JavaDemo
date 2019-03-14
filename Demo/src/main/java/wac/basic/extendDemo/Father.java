package wac.basic.extendDemo;

import java.util.HashMap;
import java.util.Map;

public class Father {
    protected Map<String, Object> params = new HashMap<String, Object>();


    public Father() {
        System.out.println("Father构造函数");
        this.params.put("car", "Poscher");
        this.params.put("name", "Wac");
        this.params.put("context", "Wac is handsome!");
    }

    public Father(String key,Object obj){
        params.put(key,obj);

    }


    static{
        System.out.println("Father静态代码块");
    }

    {
        System.out.println("Father非静态代码块");
    }


    protected Object getName() {
        return params.get("name");
    }

    protected Object getCar() {
        return params.get("car");
    }

    protected Object getContext() {
        return params.get("context");
    }


}
