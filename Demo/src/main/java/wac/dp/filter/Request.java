package wac.dp.filter;

public class Request {

    private String context = "";

    public String getStr() {
        return context;
    }


    public Request(String context) {
        super();
        this.context = context;
    }


    public void setStr(String str) {
        context = str;
    }


}
