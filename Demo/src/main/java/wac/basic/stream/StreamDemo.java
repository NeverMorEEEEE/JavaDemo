package wac.basic.stream;

import java.util.Arrays;
import java.util.List;

/**
 * @author 作者 Your-Name:
 * @version 创建时间：2019年2月20日 上午11:05:57 类说明
 */
public class StreamDemo {

	public static void main(String[] args) {
		List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");

		// JDK8的流可以很方便的做出条件选择，字符串操作，排序，等等，链式调用也被称为操作管道流
		myList.stream().filter(s -> s.startsWith("c"))
			.map(String::toUpperCase)
			.sorted()
			.forEach(System.out::println);
	}
}
