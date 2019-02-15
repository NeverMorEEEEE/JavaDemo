package wac.utils;

import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;

public class FileUtil {
	
	public static String getFileType(String fileName){
		if(StringUtils.isBlank(fileName)){
			return null;
		}
		if(fileName.indexOf(".")==-1){
			return null;
		}
		return fileName.substring(fileName.lastIndexOf(".")+1);
	}
	
    public static void close(Closeable closeable) {
		if (closeable == null) {
			return;
		}
		try {
			closeable.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
    
    public static boolean deleteFile(String filePath){
    	if(filePath==null || "".equals(filePath)){
    		return false;
    	}
    	return deleteFile(new File(filePath));
    }
    
    public static boolean deleteFile(File file){
    	if(file==null){
    		return false;
    	}
    	try {
			return file.delete();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
    }
    
    public static byte[] decodeBase64(String str){
    	return Base64.decodeBase64(str.getBytes());
    }
    
	public static void input2OutputStream(File file, String path) {
		try {
			input2OutputStream(new FileInputStream(file), path);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public static void input2OutputStream(String filePath, OutputStream out) {
		try {
			input2OutputStream(new FileInputStream(filePath), out);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 文件输出到磁盘
	 * 
	 * @param ins
	 * @param path
	 */
	public static void input2OutputStream(InputStream ins, String path) {
		File file = new File(path);
		if (!file.getParentFile().exists()) {
			file.getParentFile().mkdirs();
		}
		try {
			file.createNewFile();
			input2OutputStream(ins, new FileOutputStream(file));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 文件输出到磁盘
	 * 
	 * @param ins
	 * @param out
	 */
	public static void input2OutputStream(InputStream ins, OutputStream out) {
		try {
			byte[] bs = new byte[1024 * 10];
			int len = 0;
			// 读取数据，并进行处理
			while (0 <= (len = ins.read(bs))) {
				out.write(bs, 0, len);
			}
			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			close(out);
			close(ins);
		}
	}
	
	/**
	 * 读取zip指定的文件流
	 * @param name
	 * @param zipPath
	 * @return
	 */
	public static InputStream readZipFile(String name, ZipFile zipFile) {
		try {
			// 实例化一个Zip压缩文件的ZipInputStream对象，可以利用该类的getNextEntry()方法依次拿到每一个ZipEntry对象
			ZipEntry zipEntry = zipFile.getEntry(name);
			if(zipEntry == null){
				return null;
			}
			return zipFile.getInputStream(zipEntry);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
