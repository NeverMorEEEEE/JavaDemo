package wac.dp.CreationalPatterns.singleTon;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CountDownLatch;

public class SingleTonTest {

    public static void Test(final Set set) {
        int count = 5;
        boolean isOver = false;
        final CountDownLatch latch = new CountDownLatch(count);

        for (int i = 0; i < count; i++) {
            new Thread() {

                public void run() {

//					set.add(LazySingleTon.getInstances());//懒汉模式是线程不安全的
//					set.add(HungrySingleTon.getInstances());//饿汗是安全的，但是浪费内存
                    try {
                        Class c = SingleTonTest.class.getClassLoader().loadClass("wac.dp.CreationalPatterns.singleTon.LazySingleTon");
                        Field field = c.getDeclaredField("instance");
                        field.setAccessible(true); // 参数值为true，禁止访问控制检查
                        System.out.println(field.get(c));
                        set.add(c.getMethod("getInstances").invoke(c));
                    } catch (ClassNotFoundException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();

                    } catch (NoSuchMethodException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (SecurityException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (IllegalAccessException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (IllegalArgumentException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (InvocationTargetException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (NoSuchFieldException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
//					set.add(InnerSingleTon.getInstances());
//					set.add(EnumSingleTon.instance.getInstances());
                    latch.countDown();
//					System.out.println(latch.getCount());
                }
            }.start();
        }
        try {
            latch.await();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws InterruptedException, ClassNotFoundException {
//		InnerSingleTon instance = InnerSingleTon.getInstances();
//		
//		System.out.println(instance);

//		String classPath = "InnerSingleTon";
//		Class<InnerSingleTon> clazz = null;
//		try {
//			/*
//			 * 
//			 */
//			clazz = (Class<InnerSingleTon>) Class.forName(classPath);
//		} catch (ClassNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		((InnerSingleTon)obj).new Inner();
//		InnerSingleTon.getInstances();
//		
        final Set<Object> set = Collections.synchronizedSet(new HashSet<>());

        for (int j = 0; j < 2; j++) {
            Test(set);
            System.out.println(set.size());
            if (set.size() > 1) {
//				set.stream().forEach(i -> {
//					System.out.println(i);
//				});
                break;
            }
            set.clear();
        }

    }

}
