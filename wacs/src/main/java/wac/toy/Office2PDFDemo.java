package wac.toy;

import java.io.File;
import java.net.ConnectException;

import wac.utils.PdfUtil;

public class Office2PDFDemo {

	public static void main(String[] args) {
		File file = new File("JSONP.doc");
		File dest = new File("test.pdf");
		try {
//			PdfUtil.init("144.101.6.2", 8100);
			PdfUtil.init("127.0.0.1", 8100);
//			PdfUtil.init("178.22.22.239", 8100);
			PdfUtil.office2PDF(file, dest);
		} catch (ConnectException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
