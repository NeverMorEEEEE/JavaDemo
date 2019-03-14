package wac.learn.practice;

/**
 * Definition for
 * binary tree
 */
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }
    TreeNode(int x) {
        val = x;
    }


    @Override
    public String toString() {
        return "TreeNode{" +
                "val=" + val +
                ", left=" + left.val +
                ", right=" + right.val +
                '}';
    }
}

