public class Main {

  public static void main(String[] args) {

    Dictionary dictionary = new Dictionary();

    dictionary.print();
    dictionary.print('a');

    dictionary.add("Arrow");
    dictionary.add("festival");
    dictionary.add("Zoo");

    dictionary.print();
    dictionary.print('A');
  }
}
