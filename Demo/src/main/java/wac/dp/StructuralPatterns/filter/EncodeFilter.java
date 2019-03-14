package wac.dp.StructuralPatterns.filter;

import java.io.UnsupportedEncodingException;

public class EncodeFilter implements Filter {

    @Override
    public void doFilter(Request req, Response res) {
        String str = req.getStr();

        try {
            System.out.println("EncodeFilter!!");
            str = new String(str.getBytes(), "UTF-8");
            req.setStr(str);
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        System.out.println(str);
    }


}
