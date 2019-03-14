package wac.basic.stack;

public class MyStack {

    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16

    /**
     * The maximum capacity, used if a higher value is implicitly specified by
     * either of the constructors with arguments. MUST be a power of two <=
     * 1<<30.
     */
    static final int MAXIMUM_CAPACITY = 1 << 30;

    private int size;

    private int index = 0;

    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    // 当前总容量
    int threshold;
    // 负载因子
    final float loadFactor;

    private volatile Object[] table = {};

    public MyStack() {
        loadFactor = DEFAULT_LOAD_FACTOR;
        threshold = DEFAULT_INITIAL_CAPACITY;
        table = new Object[threshold];
    }

    public void push(Object obj) {
        int dcap = (int) (threshold * loadFactor);

        if (index < threshold) {
            table[index] = obj;
            index++;
            size++;
        }
        //如果插值后的容量超过总容量*负载因子,则扩容
        if (index > dcap) {
            resize();
        }
    }

    public Object pop() {
        if (index > 0) {
            size--;
            return table[--index];
        }
        throw new NullPointerException();
    }

    final void resize() {
        Object[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap = 0;
        int newThr = 0;
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
//				return oldTab;
            } else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY
                    && oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1; // double threshold
        } else if (oldThr > 0) // initial capacity was placed in threshold
            newCap = oldThr;
        else {               // zero initial threshold signifies using defaults
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int) (DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {
            float ft = (float) newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float) MAXIMUM_CAPACITY ?
                    (int) ft : Integer.MAX_VALUE);
        }
        threshold = newThr;

        System.out.println("newCap : " + newCap + " , newThr : " + newThr);

        Object[] newtab = new Object[newCap];

        System.arraycopy(table, 0, newtab, 0, index);

        table = newtab;
    }


    static final int tableSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }

    public int size() {
        return size;
    }


    @Override
    public String toString() {
        StringBuilder format = new StringBuilder("[");
        for (int i = 0; i < size; i++) {
            format.append("'" + table[i] + "'");
        }
        return format.append("]").toString();
    }

    public static void main(String[] args) {
        MyStack stack = new MyStack();
        stack.push("hello");
        stack.push("world");
        stack.push("!");
        stack.push("It's ");
        stack.push("wac");
        System.out.println(stack);
        while (stack.size() > 0) {
            System.out.println(stack.pop());
        }


    }

}
