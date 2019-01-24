package wac.learn.servilizeDemo;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class SerilizeDemo {


	public static void main(String[] args) {
		User user = new User();
		user.setUserName("HH");
		user.setPasswd("123456");
		user.setUserMsg("test");
		
		System.out.println(user.toString());
		
		try {
			ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream("test.txt"));
			os.writeObject(user);
			os.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	
	 try {
         // �ڷ����л�֮ǰ�ı�username��ֵ
         User.userName = "jmwang";
         
         ObjectInputStream is = new ObjectInputStream(new FileInputStream(
                 "test.txt"));
         user = (User) is.readObject(); // �����ж�ȡUser������
         is.close();
         
         System.out.println("\nread after Serializable: ");
         System.out.println(user.toString());
         System.out.println("username: " + user.getUserName());
         System.err.println("password: " + user.getPasswd());
         
     } catch (FileNotFoundException e) {
         e.printStackTrace();
     } catch (IOException e) {
         e.printStackTrace();
     } catch (ClassNotFoundException e) {
         e.printStackTrace();
     }
 }

}
