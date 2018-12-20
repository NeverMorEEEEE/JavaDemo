package wac.utils.db.dbcp;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;

import com.app.common.util.DBUtil;

public class DBCPUtils {

	private static Properties prop = new Properties();
	private static String properties = "/db.properties";
	private static BasicDataSource bds = new BasicDataSource();
	
	static{
		init();
	}
	
	private static void init(){
		try {
			System.out.println("DBCPUtils init!");
			prop.load(DBCPUtils.class.getResourceAsStream(properties));

			System.out.println(prop.getProperty("url"));
			bds.setUrl( prop.getProperty("url"));
			bds.setUsername(prop.getProperty("username"));
			bds.setPassword( prop.getProperty("password"));
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
	}
	
	public static Connection getConnection(){
		try {
			return bds.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public void TestDBS(){
		System.out.println(" NumActive : " + bds.getNumActive());
	}
	
	public static void main(String[] args) {
		Connection conn = DBCPUtils.getConnection();
		
		try {
			System.out.println("isColsed : " + conn.isClosed());
			System.out.println("isReadOnly : " + conn.isReadOnly());
			System.out.println("isValid : " + conn.isValid(10000));
			
			System.out.println("Schema : " + conn.getSchema().toString());
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
}
