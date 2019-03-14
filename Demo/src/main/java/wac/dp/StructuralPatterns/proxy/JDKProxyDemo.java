package wac.dp.StructuralPatterns.proxy;


import wac.utils.Printer;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JDKProxyDemo {

    public static void main(){


        Movable mm = (Movable)Proxy.newProxyInstance(ClassLoader.getSystemClassLoader(),new Class[]{Movable.class}, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                Printer.print(proxy);
                Printer.print(method);


                if("str".equals(method.getName())){
                        method.invoke(proxy,args);
                        Printer.print("Method " + method.getName()  + " is calling!");

                }else{
                    method.invoke(proxy,args);
                    Printer.print("Method " + method.getName()  + " is calling!");

                }
                return null;
            }
        });

        mm.str();
    }

}
