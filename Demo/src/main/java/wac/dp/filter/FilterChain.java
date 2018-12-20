package wac.dp.filter;

import java.util.LinkedList;
import java.util.List;

public class FilterChain {
	List<Filter> filterChain = new LinkedList<Filter>();
	
	public FilterChain addFilter(Filter  filter){
		filterChain.add(filter);
		return this;
	}
	
	public void doFilter(Request req ,Response res){
		for(Filter filter :  filterChain){
			filter.doFilter(req, res);
		}
	}

}
