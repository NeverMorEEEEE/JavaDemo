package wac.dp.CreationalPatterns.singleTon;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

public class demo {

    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException {
        Class c = SingleTonTest.class.getClassLoader().loadClass("wac.dp.CreationalPatterns.singleTon.DBCSingleTon");
        System.out.println(c);
        Field[] fs = c.getDeclaredFields();
        System.out.println(fs.length);
        for (int i = 0; i < fs.length; i++) {
            System.out.println(fs[i]);
            if ("instance".equals(fs[i].getName())) {

            }
        }
    }

}
