/*
package wac.utils;

import java.io.File;
import java.net.ConnectException;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;
import com.artofsolving.jodconverter.openoffice.converter.StreamOpenOfficeDocumentConverter;

public class PdfUtil {

    private static String host = "127.0.0.1";
    private static int port = 8100;


    public static void init(String host, int port) {

        setHost(host);
        setPort(port);
    }

    public static String getHost() {
        return host;
    }

    public static void setHost(String host) {
        PdfUtil.host = host;
    }

    public static int getPort() {
        return port;
    }

    public static void setPort(int port) {
        PdfUtil.port = port;
    }

    */
/**
     * 将Office文档转换为PDF. 运行该函数需要用到OpenOffice, OpenOffice下载地址为
     * http://www.openoffice.org/
     * <p>
     * <pre>
     * 方法示例:
     * String sourcePath = "F:\\office\\source.doc";
     * String destFile = "F:\\pdf\\dest.pdf";
     * Converter.office2PDF(sourcePath, destFile);
     * </pre>
     *
     * @param sourceFile 源文件, 绝对路径. 可以是Office2003-2007全部格式的文档, Office2010的没测试. 包括.doc,
     *                   .docx, .xls, .xlsx, .ppt, .pptx等. 示例: F:\\office\\source.doc
     * @param destFile   目标文件. 绝对路径. 示例: F:\\pdf\\dest.pdf
     * @return 操作成功与否的提示信息. 如果返回 -1, 表示找不到源文件, 或url.properties配置错误; 如果返回 0,
     * 则表示操作成功; 返回1, 则表示转换失败
     * @throws ConnectException
     *//*

    public static int office2PDF(String sourceFile, String destFile) throws ConnectException {

        System.out.println(sourceFile + " ===>>> " + destFile);
        File inputFile = new File(sourceFile);
        if (!inputFile.exists()) {
            return -1;// 找不到源文件, 则返回-1
        }

        // 如果目标路径不存在, 则新建该路径
        File outputFile = new File(destFile);
        if (!outputFile.getParentFile().exists()) {
            outputFile.getParentFile().mkdirs();
        }

        // connect to an OpenOffice.org instance running on port 8100
        OpenOfficeConnection connection = new SocketOpenOfficeConnection(
                host, port);
        connection.connect();

        // convert
//		DocumentConverter converter = new OpenOfficeDocumentConverter(connection);  
        DocumentConverter converter = new StreamOpenOfficeDocumentConverter(connection);

        converter.convert(inputFile, outputFile);

        // close the connection
        connection.disconnect();


        return 0;
    }

    public static void office2PDF(File file, File dest) throws ConnectException {
        office2PDF(file.getAbsolutePath(), dest.getAbsolutePath());

    }
}
*/
