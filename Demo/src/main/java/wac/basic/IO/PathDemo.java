package wac.basic.IO;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.hibernate.validator.internal.util.privilegedactions.GetClassLoader;
import wac.utils.db.dbcp.DBCPUtils;

public class PathDemo {

	private static Properties prop = new Properties();
	private static String properties = "conf/client.conf";

    public static void main(String[] args) throws IOException {


		System.out.println(PathDemo.class.getClassLoader().getResource(properties).getPath());
        URL url = PathDemo.class.getClass().getResource("/conf/client.conf");
        System.out.println("URL : " + url);

		prop.load(DBCPUtils.class.getResourceAsStream(properties));

		System.out.println(prop.getProperty("url"));


        
        List<String> myList =
        	    Arrays.asList("a1", "a2", "b1", "c2", "c1");

        	myList
        	    .stream()
        	    .filter(s -> s.startsWith("c"))
        	    .map(String::toUpperCase)
        	    .sorted()
        	    .forEach(System.out::println);

    }
}
