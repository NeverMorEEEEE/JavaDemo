package wac.dp.StructuralPatterns.proxy.test;

import java.lang.reflect.Method;

import wac.dp.StructuralPatterns.proxy.InvocationHandler;

public class UserMgrProxy implements UserMgr {
    public UserMgrProxy(InvocationHandler t) {
        super();
        this.t = t;
    }

    InvocationHandler t;

    @Override
    public void addUser() {
        Long start = System.currentTimeMillis();
        System.out.println("Move 开始:");
        Method md = null;
        try {
            md = UserMgr.class.getMethod("addUser");
        } catch (NoSuchMethodException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        t.invoke(this, md);
        System.out.println("Move 结束,用时" + (System.currentTimeMillis() - start));
    }
}