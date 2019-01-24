package wac.dp.proxy;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

import javax.tools.JavaCompiler;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;
import javax.tools.JavaCompiler.CompilationTask;

import org.aspectj.util.FileUtil;

import com.itextpdf.text.pdf.parser.clipper.Path;

public class Proxy {

	
/*	public Proxy(Tank t) {
		super();
		this.t = t;
	}
	
	Movable t;
	
	@Override
	public void move() {
		Long start = System.currentTimeMillis();
		System.out.println("Move 开始:");
		t.move();
		System.out.println("Move 结束,用时 " + (System.currentTimeMillis() - start));
	}
*/
	
	public Object newProxyInstance(String className,Class infc,InvocationHandler h){
		String rt = "\r\n";
		String methodStr = "";
		
		String path = infc.getName();
		String packagepath = path.substring(0, path.lastIndexOf("."));
		path = packagepath.replaceAll("[.]", "/");
		
		System.out.println(packagepath);
		
		Method[] methods = infc.getMethods();
		
		for(Method m : methods){
			System.out.println(m);
			System.out.println(m.getName());
//			methodStr+= "@Override "+ rt 
//					+ "public void " + m.getName()+ "() {"  + rt 
//					+ "		Long start = System.currentTimeMillis();" + rt 
//					+"		System.out.println(\"Move 开始:\");"+ rt 
//					+ "		t."+ m.getName()+"();"+ rt 
//					+ "		System.out.println(\"Move 结束,用时\" + (System.currentTimeMillis() - start));"
//					+ "}" ;
			methodStr+= "	@Override "+ rt 
					+ "		public void " + m.getName()+ "() {"  + rt 
					+ "		Long start = System.currentTimeMillis();" + rt 
					+"		System.out.println(\"Move 开始:\");"+ rt
					+ "		Method md  = null;"+ rt 
					+ "		try {"+ rt 
					+ "			md = " + infc.getName() + ".class.getMethod(\"" + m.getName()+ "\");" + rt
					+ "		} catch (NoSuchMethodException e) { "+ rt 
					+ "			// TODO Auto-generated catch block 	"+ rt 
					+ "			e.printStackTrace(); 		"+ rt 
					+ "		} catch (SecurityException e) { 	"+ rt 
					+ "		// TODO Auto-generated catch block 			"+ rt 
					+ "			e.printStackTrace(); 		}" + rt 
					+ "		t.invoke(this,md);"+ rt 
					+ "		System.out.println(\"Move 结束,用时\" + (System.currentTimeMillis() - start));"
					+ "}" ;
		}

	
		
		String src = "package " + packagepath + ";" + rt
				+ "import java.lang.reflect.Method; " + rt
				+ " import wac.dp.proxy.InvocationHandler;" + rt
				+ "public class " + className + " implements " + infc.getName() + "{ 	 	" + rt 
				+ "		public " + className + "(InvocationHandler t) { 		"+ rt 
				+ "			super(); 		"+ rt 
				+ "			this.t = t; 	"+ rt 
				+ "		} 	"+ rt 
				+ "		InvocationHandler t; 	 	"+ rt 
				+ methodStr + rt
				+ "}";
		
		

		String fileName = System.getProperty("user.dir")+ "/src/main/java/"+ path +"/" +  className +".java" ;
		System.out.println(fileName);
		//写入到文件中
		File file = new File(fileName);
		FileUtil.writeAsString(file, src);
	
		
		//调用JDK的编译器来编译类文件
		JavaCompiler jcompiler = ToolProvider.getSystemJavaCompiler();
		System.out.println(jcompiler.getClass().getName());
		StandardJavaFileManager sjf = jcompiler.getStandardFileManager(null, null, null);
		Iterable i = sjf.getJavaFileObjects(fileName);
		CompilationTask  task = jcompiler.getTask(null, sjf, null, null, null, i);
		task.call();
		try {
			sjf.close();
			
			//把编译后的文件写如到内存，并创建实例
			URL[] urls = new URL[]{new URL("file:/" + System.getProperty("user.dir")+ "/src")};
			URLClassLoader ucl = new URLClassLoader(urls);
			System.out.println(packagepath +"." +  className);
			Class c = ucl.loadClass(packagepath +"." +  className);
			System.out.println(c);
			Constructor m = c.getConstructor(InvocationHandler.class);
			System.out.println(m);
			return m.newInstance(h);
		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
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
		}
		
		return null;
		
	}


	

}
