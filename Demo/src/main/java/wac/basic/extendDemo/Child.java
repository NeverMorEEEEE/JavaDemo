package wac.basic.extendDemo;

import wac.basic.basicData.ByteDemo;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Child extends Father {
//	Map<String,Object> params = new HashMap<String,Object>();

    private ByteDemo bd = new ByteDemo();

    private Child(int i) {

    }
    public Child() {
//		this.params.put("car", "benz");
        System.out.println("Child构造函数");
        this.params.put("name", "Wac'son");
        this.params.put("context", "Wac'son is handsome!");
    }

    public Child(String key,Object obj){
//        super(key,obj);

        System.out.println("Child对象成员构造函数");
    }


    @Override
    protected Object getCar() {
        return super.getCar();
    }

 /*

/*   111
    222
    33
    4



    */

    protected Object getName() {
        return params.get("name");
    }

//	protected Object getCar() {
//		return params.get("car");
//	}

    protected Object getContext() {
        return params.get("context");
    }

    static{
        System.out.println("Child静态代码块");
    }

    {
        System.out.println("Child非静态代码块");
    }

    /**
     *   多态即 父类引用指向子类对象
     *  成员变量，静态方法看左边；非静态方法：编译看左边，运行看右边。
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        Father c = new Child("ss","aa");
        System.out.println(c.params);


        System.out.println(c.getCar());
        System.out.println(c.getName());
        System.out.println(c.getContext());



    }

    class A {}
    class B extends A {}
    class C extends A {}
    class D extends B {}
}
