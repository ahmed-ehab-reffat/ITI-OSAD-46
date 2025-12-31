import java.util.TreeMap;
import java.util.TreeSet;

public class Dictionary {
  private TreeMap<Character, TreeSet<String>> dictionary;

  public Dictionary() {
    this.dictionary = new TreeMap<>();
  }

  void add(String word) {
    word = word.substring(0, 1).toUpperCase() + word.substring(1);
    Character character = Character.toUpperCase(word.charAt(0));

    if (!(character >= 65 && character <= 90)) {
      System.out.println("Invalid word!");
      return;
    }

    if (dictionary.containsKey(character)) {
      dictionary.get(character).add(word);
      return;
    }

    TreeSet<String> words = new TreeSet<>();
    words.add(word);
    dictionary.put(character, words);
  }

  void print() {
    if (dictionary.size() == 0) {
      System.out.println("Dictionary is empty!");
      return;
    }

    for (Character character : dictionary.keySet()) {
      System.out.println(character + ":- ");
      System.out.println(dictionary.get(character));
    }
  }

  void print(char character) {
    character = Character.toUpperCase(character);

    if (!dictionary.containsKey(character)) {
      System.out.println("No words for this character!");
      return;
    }

    System.out.println(character + ":- ");
    System.out.println(dictionary.get(character));
  }
}