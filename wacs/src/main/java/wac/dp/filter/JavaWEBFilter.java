package wac.dp.filter;

import java.io.UnsupportedEncodingException;

public class JavaWEBFilter implements Filter{

	@Override
	public void doFilter(Request req, Response res) {
		String str = req.getStr();
		
		System.out.println("JavaWEBFilter!!");
		str = str.replaceAll("[<]", "");
		str = str.replaceAll("[/]", "");
		str = str.replaceAll("[>]", "");
		req.setStr(str);
		System.out.println(str);
	}

}
