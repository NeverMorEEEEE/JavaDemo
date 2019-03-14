package wac.dp.StructuralPatterns.filter;

public class Client {
    public static void main(String[] args) {
        String str = "阿飞接撒发卡<script>alert('Hello World!');</script>";
        Request req = new Request(str);
        Response res = new Response();

        FilterChain fc = new FilterChain();
        fc.addFilter(new JavaWEBFilter());
        fc.addFilter(new EncodeFilter());

        fc.doFilter(req, res);

        System.out.println(res.getStr());

    }

}
