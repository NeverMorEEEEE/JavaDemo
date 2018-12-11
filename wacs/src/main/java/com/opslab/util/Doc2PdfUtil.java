package com.opslab.util;

import java.io.File;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeException;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;


/**
 * 签章文件doc格式转pdf(通过openOffice转)
 * @author huanghuajian
 *
 */
public class Doc2PdfUtil {
	
	private static final String localhost="127.0.0.1";
	private static final int officePort=8100;
	
	/**
	 * 转换成pdf文件
	 * @param sourceFile
	 * @param targetFile
	 * @throws Exception 
	 */
	public static void documentToPDF(File sourceFile, File targetFile,String host, int port) throws Exception{
		if(sourceFile.exists()) {
			if(!targetFile.exists()) {
				OpenOfficeConnection connection = null;
				try {
					connection = new SocketOpenOfficeConnection(host,port);
					System.out.println("==========准备连接端口==========");
					connection.connect();
					System.out.println("==========连接端口==========");
					DocumentConverter converter = new OpenOfficeDocumentConverter(connection);  
					converter.convert(sourceFile, targetFile);
					targetFile.createNewFile();
					System.out.println("转换为PDF格式成功！！	路径" + targetFile.getPath());
				} catch (java.net.ConnectException e) {
					e.printStackTrace();
					System.out.println("OpenOffice服务未启动");
					throw e;
				} catch (OpenOfficeException e) {
					e.printStackTrace();
					System.out.println("读取文件失败");
					throw e;
				} catch (Exception e){
					System.out.println("================123");
					e.printStackTrace();
					throw e;
				}finally{
					if(connection!=null){
						//关闭officeopen连接
						connection.disconnect();
					}
				}
			} else {
				System.out.println("已转换为PDF，无需再次转换");
			}
		} else {
			System.out.println("要转换的文件不存在");
		} 
	}
	
	public static void documentToPDF(String sourceFileName, String targetFileName){
		File sourceFile = new File(sourceFileName);
		File targetFile = new File(targetFileName);
		try {
			documentToPDF(sourceFile, targetFile, localhost, officePort);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/*public static void main(String[] args) {
		
		documentToPDF("D:/doc/zcapaa.doc","D:/doc/zc8.pdf");
	}*/
	
}
