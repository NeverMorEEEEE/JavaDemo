package wac.basic.jmm;



import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import static java.util.UUID.*;

/**
 *  可以看到在JDK1.8中 subStr在生成新的子串时，value是用的新的char数组，而不是1.6里面，直接指向旧的char数组。
 *
 *  JDK1.6  private constructor which shares value array for speed.
 *
 *   String(int offset, int count, char value[]) {
 *
 *     this.value = value;
 *
 *     this.offset = offset;
 *
 *      this.count = count;
 *
 *      }
 *
 *  JDK1.8： this.value = Arrays.copyOfRange(value, offset, offset+count);
 *
 */
public class OOMDemo {

    public static void main(String[] args) {
        String str = UUID.randomUUID().toString() + UUID.randomUUID().toString() + UUID.randomUUID().toString() + UUID.randomUUID().toString();

        String[] strs = str.split("-");
        List<String> list = new LinkedList<String >();
        for(int i=0;i<strs.length;i++){
//            list.add(new String(strs[i]));
            list.add(strs[i]);
        }

        System.out.println("Strs's first str ： " + strs[0] + ", hash:" + strs[0].hashCode());
        System.out.println("List's first str ： " + list.get(0) + ", hash:" + list.get(0).hashCode());

        System.out.println("Compare : " + list.get(0)==strs[0]);

        System.out.println("List's size :" + list.size());

    }
}
