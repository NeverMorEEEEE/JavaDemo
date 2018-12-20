package wac.serialization;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.LinkedList;
import java.util.List;

public class serivalizeDemo {
	
	public static void main(String[] args) {
		try {
			ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream("serivalizeDemo.txt"));
			List l1 = new LinkedList<Object>();
			l1.add("hello");
			List l2 = new LinkedList<Object>();
			l1.add("World");
			os.writeObject(l1);
			os.writeObject(l2);
			os.flush();
			os.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		try {
			ObjectInputStream oi = new ObjectInputStream(new FileInputStream("serivalizeDemo.txt"));
			Object o1 = oi.readObject();
			System.out.println(o1);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}

}
