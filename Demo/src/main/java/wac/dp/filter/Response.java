package wac.dp.filter;

public class Response {
    private String context = "";

    public Response() {
        super();
    }

    public Response(String context) {
        super();
        this.context = context;
    }

    public String getStr() {
        return context;
    }


    public void setStr(String str) {
        context = str;
    }
}
