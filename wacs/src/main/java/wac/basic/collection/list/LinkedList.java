package wac.basic.collection.list;

import java.util.ArrayList;
import java.util.NoSuchElementException;

import wac.basic.Collection;
import wac.basic.Iterator;

public class LinkedList<E> implements Collection<E>{
	
	public Node<E> head = null;
	public Node<E> tail = null;
	int index = 0;
	
	
	public void add(E o){
		Node e = new Node(null,o);
		if(head == null){
			head = e;
			tail = e;
		}
		tail.setNext(e);
		tail = e;
		index++;
	}
	
	public boolean delete(Node e){
		Node<E> tmp = head;
		for(;tmp!=null;tmp = tmp.getNext()){
			if(tmp == e){
//				tmp.pre.next = tmp.next;
				return true;
			}
		}
		
		return false;
	}
	
	public boolean insert(Integer index,E e){
		Node tmp = head;
		int i = 0;
		Node node = new Node(null,e);
		for(;tmp!=null;tmp = tmp.getNext()){
			System.out.println(tmp);
			System.out.println("count : " + i);
			if(index.equals(i)){
				System.out.println(tmp.getValue());
				node.setNext(tmp.getNext());  
				tmp.setNext(node); 
				System.out.println(tmp);
				System.out.println(node);
				return true;
			}
			i++;
		}
		
		
		return false;
	}
	
	
	public int indexOf(Node e){
		Node tmp = head;
		int i = 0;
		for(;tmp!=null;tmp = tmp.getNext()){
			if(tmp == e){
				return i;
			}
			i++;
		}
		
		return -1;
	}
	
	public int size(){
		return index;
	}
	
	public Iterator<E> iterator(){
		return new LinkedListIterator();
	}

	@Override
	public String toString() {
		StringBuffer str = new StringBuffer("LinkedList: [ ") ;
		Node tmp = head;
		int i = 0;
		for(;tmp!=tail;tmp = tmp.getNext()){
			str.append(tmp.getValue() + ",");
		}
		str.append(tail.getValue() + "]");
		
		return str.toString();
	}
	
	class LinkedListIterator implements Iterator<E>{
		Node<E> e = head;
		Node<E> tmp = null;
		private int curindex = 0;
		
		@Override
		public E next() {
			
			if(hasNext()){
				tmp = e;
				e = e.getNext();
				curindex++;
				return tmp.getValue();
			}
			throw new NoSuchElementException();
		}

		@Override
		public boolean hasNext() {
			
		//	return (e.getNext()!=null);
			return (curindex<index);
		}
		
		
	}
	
	
	
	public static void main(String[] args) {
		LinkedList  c = new LinkedList();
		c.add("hello");
		c.add(" ");
		c.add("world");
		c.add("!");
//		System.out.println(c);
//		System.out.println(c.insert(3, "^^"));
//		System.out.println(c);
		
	
		Iterator i = c.iterator();
		while(i.hasNext()){
			System.out.println(i.next());
		}
		
	}

}

class Node<E>{
	private Node next = null;
	
	public E value ;
	
	public Node(){
		super();
	}
	
	public Node(E o){
		this.value = o;
	}

	public Node( Node o, E value) {
		super();
	
		this.next = o;
		this.value = value;
	}



	public Node getNext() {
		return next;
	}

	public void setNext(Node next) {
		this.next = next;
	}

	public E getValue() {
		return value;
	}

	public void setValue(E value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "Node [next=" + next + ", value=" + value + "]";
	}
	
	
	
}


class value{
	
	public String value = "";
	
	public value(){
		super();
	}
	
	public value(String value){
		super();
		this.value = value;
	}

	@Override
	public String toString() {
		return "value [value=" + value + "]";
	}
	
	
}