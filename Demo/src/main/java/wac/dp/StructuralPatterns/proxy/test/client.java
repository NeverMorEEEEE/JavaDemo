package wac.dp.StructuralPatterns.proxy.test;

import wac.dp.StructuralPatterns.proxy.InvocationHandler;
import wac.dp.StructuralPatterns.proxy.Proxy;
import wac.dp.StructuralPatterns.proxy.TimeHandler;

public class client {

    public static void main(String[] args) {
        UserMgr umi = new UserMgrImpl();
        InvocationHandler h = new TransactionHandler(umi);
        String str = "UserMgr";

        InvocationHandler th = new TimeHandler(h);

        UserMgr u = (UserMgr) new Proxy().newProxyInstance("UserMgrProxy", UserMgr.class, th);

        u.addUser();

    }


}
