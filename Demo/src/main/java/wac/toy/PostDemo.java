package wac.toy;

import java.net.URLEncoder;
import java.util.LinkedList;
import java.util.List;

import com.opslab.util.http.HttpRequest;

public class PostDemo {

    public static void main(String[] args) {
        List<String> paramstrs = new LinkedList<String>();
        paramstrs.add("interfaceCode");
        paramstrs.add("cardId");
        paramstrs.add("additional");
        paramstrs.add("appKey");
        paramstrs.add("requestTime");
        paramstrs.add("sign");

        System.out.println(paramstrs.contains("cardid"));

    }
}
