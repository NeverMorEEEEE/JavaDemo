package com.opslab.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

import sun.misc.BASE64Decoder;

import com.itextpdf.text.BadElementException;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

@SuppressWarnings("restriction")
public class PdfUtils {
	public static void addImg(String filePath,String imgStr) {
		InputStream input = null;
		PdfReader reader = null;
		PdfStamper stamper = null;
		try {
			input = new FileInputStream(new File(filePath));
			reader = new PdfReader(input);
			stamper = new PdfStamper(reader, new FileOutputStream(filePath));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        // 提取pdf中的表单
        AcroFields form = stamper.getAcroFields();
        try {
			form.addSubstitutionFont(BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED));
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
        
        // 通过域名获取所在页和坐标
        Rectangle signRect = new Rectangle(70,699);
        float x = signRect.getLeft(80);
        float y = signRect.getTop();
        //left:1 buttom:2 right:3 top:4 
        System.out.println(x+"======坐标已定======"+y);
        
        // 读图片
        Image image = null;
		try {
			image = Image.getInstance(new BASE64Decoder().decodeBuffer(imgStr));
		} catch (BadElementException e1) {
			e1.printStackTrace();
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
        // 获取操作的页面
        PdfContentByte under = stamper.getOverContent(1);
        // 根据域的大小缩放图片
        image.scaleToFit(image.getWidth(), image.getHeight());
        // 添加图片
        image.setAbsolutePosition(x, y);
        try {
			under.addImage(image);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
        
        try {
			stamper.close();
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
        reader.close();
	}
	
	
	/*public static void main(String[] args) {
		String pdfPath = "F:\\temp\\zcap.pdf";
		String base64Image = "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";
		addImg(pdfPath, base64Image);
	}*/
}
