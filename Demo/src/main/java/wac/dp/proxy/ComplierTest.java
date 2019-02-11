package wac.dp.proxy;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

import org.aspectj.apache.bcel.classfile.JavaClass;
import org.aspectj.util.FileUtil;

import javax.tools.*;
import javax.tools.JavaCompiler.CompilationTask;

public class ComplierTest {

    public static void main(String[] args) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException {
        String src = "package wac.dp.proxy; "
                + "public class TankTimeProxy implements Movable{ 	 	"
                + "public TankTimeProxy(Movable t) { 		"
                + "super(); 		"
                + "this.t = t; 	"
                + "} 	"
                + "Movable t; 	 	"
                + "@Override 	"
                + "public void move() { 		"
                + "Long start = System.currentTimeMillis(); 		"
                + "System.out.println(\"Move 开始:\"); 		"
                + "t.move(); 		"
                + "System.out.println(\"Move 结束,用时 \" + (System.currentTimeMillis() - start)); 	"
                + "} 	"
                + " }";

        String fileName = System.getProperty("user.dir") + "/src/main/java/wac/dp/proxy/TankTimeProxy.java";
        System.out.println(fileName);
        //写入到文件中
        File file = new File(fileName);
        FileUtil.writeAsString(file, src);
        System.getProperties();

        //调用JDK的编译器来编译类文件
        JavaCompiler jcompiler = ToolProvider.getSystemJavaCompiler();
        System.out.println(jcompiler.getClass().getName());
        StandardJavaFileManager sjf = jcompiler.getStandardFileManager(null, null, null);
        Iterable i = sjf.getJavaFileObjects(fileName);
        CompilationTask task = jcompiler.getTask(null, sjf, null, null, null, i);
        task.call();
        sjf.close();

        //把编译后的文件写如到内存，并创建实例
        URL[] urls = new URL[]{new URL("file:/" + System.getProperty("user.dir") + "/src")};
        URLClassLoader ucl = new URLClassLoader(urls);
        Class c = ucl.loadClass("wac.dp.proxy.TankTimeProxy");
        System.out.println(c);
        Constructor m = c.getConstructor(Movable.class);
        System.out.println(m);
        TankTimeProxy ttp = (TankTimeProxy) m.newInstance(new Tank());
        ttp.move();
        System.out.println(ttp);


    }

}
