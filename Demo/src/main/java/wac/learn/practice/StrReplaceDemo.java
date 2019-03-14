package wac.learn.practice;


import wac.learn.practice.ListNode;
import wac.utils.Printer;

import java.util.ArrayList;
import java.util.Collections;

public class StrReplaceDemo {

    public static int halfFind(int target,int[] arr){
        int b =arr.length-1;
        if(target<arr[0]||target>arr[b]||b==0){
            return -1;
        }
        int a = 0;
        while(b>=a){
            int mid = (a + b)/2;
            if(target==arr[mid]) {
                return mid;
            }else if(target<arr[mid]){
                b = mid;
            }else if(target>arr[mid]){
                a = mid ;
            }

        }
        return -1;

    }

    public static int FindInArr(int target,int[] arr){
        int i = 0;
        while(i<arr.length){
            if(target==arr[i]){
                return i;
            }
            i++;
        }
        return -1;

    }



    /**
     *  将空格替换为'%20'
     * @param str
     * @return
     */
    public String replaceSpace(StringBuffer str) {
        int index;
        while (str.indexOf(" ") >= 0) {
            index = str.indexOf(" ");
            str.replace(index, index + 1, "%20");
        }
        return str.toString();
    }

    /**
     * 将输入链表重尾到头输出
     * @param listNode
     * @return
     */
    public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {
        ArrayList<Integer> ar = new ArrayList();

        while (listNode != null) {
            ar.add(listNode.val);
            listNode = listNode.next;
        }

        java.util.Collections.reverse(ar);
        return ar;
    }

    /**
     *  输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
     *  假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
     *  例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，
     *  则重建二叉树并返回。
     * @param pre
     * @param in
     * @return
     */
    public static TreeNode reConstructBinaryTree(int[] pre, int[] in) {
        Printer.print("前序：");
        Printer.printArr(pre);
        Printer.print("中序：");
        Printer.printArr(in);

        if(pre.length <1&&in.length<1){
            return null;
        }

        int pres = pre[0];      //前序第一个就是根节点
        TreeNode tn = new TreeNode(pres);

        if(pre.length ==1&&in.length==1&&pre[0]==in[0]){
            return tn;
        }

        int llen = FindInArr(pres,in);  //根节点在中序的位置，左边就是左子树，右边右子数
        int rlen = in.length - llen -1;
        int[] lpre = new int[llen];
        int[] lin = new int[llen];
        int[] rpre = new int[rlen];
        int[] rin = new int[rlen];
        System.arraycopy(pre,1,lpre,0,llen);
        Printer.print("前序左子树：");
        Printer.printArr(lpre);
        System.arraycopy(in,0,lin,0,llen);
        Printer.print("中序左子树：");
        Printer.printArr(lin);
        System.arraycopy(pre,llen+1,rpre,0,rlen);
        Printer.print("前序右子树：");
        Printer.printArr(rpre);
        System.arraycopy(in,llen+1,rin,0,rlen);
        Printer.print("中序右子树：");
        Printer.printArr(rin);
        tn.left = reConstructBinaryTree(lpre,lin);
        tn.right = reConstructBinaryTree(rpre,rin);
        return tn;
    }

    public static void main(String[] args) {
        //   Printer.println(new StrReplaceDemo().replaceSpace(new StringBuffer("We Are Happy")));
//        Printer.print(halfFind(1,new int[]{4,7,2,1,5,3,8,6}));

        TreeNode tn = reConstructBinaryTree(new int[]{1,2,4,7,3,5,6,8},new int[]{4,7,2,1,5,3,8,6});
        Printer.println(tn.left);
        Printer.println(tn.right);
    }
}
