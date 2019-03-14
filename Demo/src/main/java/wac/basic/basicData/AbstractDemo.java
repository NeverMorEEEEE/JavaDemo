package wac.basic.basicData;

import java.io.Serializable;

abstract class AbstractDemo implements Serializable {

    private int fun(){
        return 1;
    }

    abstract void demo();

    protected abstract void tek();

}
