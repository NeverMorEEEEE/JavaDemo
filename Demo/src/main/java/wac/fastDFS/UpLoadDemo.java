package wac.fastDFS;

import org.csource.fastdfs.ClientGlobal;
import org.csource.fastdfs.StorageClient;
import org.csource.fastdfs.StorageServer;
import org.csource.fastdfs.TrackerClient;
import org.csource.fastdfs.TrackerServer;
import org.junit.jupiter.api.Test;

public class UpLoadDemo {

    @Test
    public static void testUpload() throws Exception {
        //创建一个配置文件。文件名任意。内容就是tracker服务器的地址。
        //使用全局对象加载配置文件。
        ClientGlobal.init("E:/eclipse_wjc/eclipse-jee-luna-SR1-win32-x86_64/eclipse/worksapce/Demo/src/main/resources/conf/client.conf");
        //创建一个TrackerClient对象
        TrackerClient trackerClient = new TrackerClient();
        //通过TrackClient获得一个TrackerServer对象
        TrackerServer trackerServer = trackerClient.getConnection();
        //创建一个StrorageServer的引用，可以是null
        StorageServer storageServer = null;
        //创建一个StorageClient，参数需要TrackerServer和StrorageServer
        StorageClient storageClient = new StorageClient(trackerServer, storageServer);
        //使用StorageClient上传文件。
        String[] strings = storageClient.upload_file("F:/PIC/Tulips.jpg", "jpg", null);
        for (String string : strings) {
            System.out.println(string);
        }


    }

    @Test
    public void testFastDfsClient() throws Exception {
        FastDFSClient fastDFSClient = new FastDFSClient("classpath:/conf/client.conf");
        String string = fastDFSClient.uploadFile("D:/Documents/Pictures/images/200811281555127886.jpg");
        System.out.println(string);
    }

    public static void main(String[] args) throws Exception {
        testUpload();
    }

}
