package wac.dp.CreationalPatterns.prototype.model;

/*
 * 创建型-->原型模式
 * 用原型实例指定创建对象的种类,并且通过拷贝这些原型创建新的对象.
 * 
 * 当直接创建对象的代价比较大时，则采用这种模式。
 * 例如，一个对象需要在一个高代价的数据库操作之后被创建。我们可以缓存该对象，
 * 在下一个请求时返回它的克隆，在需要的时候更新数据库，以此来减少数据库调用。
 * 
 * 要求：类必须实现Cloneable接口，表示这个类可以被克隆
 * 
 * 面试:Object类下提供的方法有哪些？
 * */
public class Sheep implements Cloneable {
    private String type;
    private String color;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
