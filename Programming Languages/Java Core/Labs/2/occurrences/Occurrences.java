import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.StringTokenizer;

public class Occurrences {
  public static void main(String[] args) {

    String sentence = "ITI develops people and ITI house of developers and ITI for people";
    String word = "ITI";
    //String sentence = "ITI develops people and ITI house of developers and ITI for people ITI";
    //String sentence = "";
    //String sentence = word;


    int occurrencesM1 = 0;
    String[] myArray = sentence.split(word, -1);
    occurrencesM1 = myArray.length - 1;
    if (occurrencesM1 == -1) {
      if (sentence.contains(word)) {
        occurrencesM1 = 1;
      } else {
        occurrencesM1 = 0;
      }
    }

    int occurrencesM2 = 0;
    int index = sentence.indexOf(word);
    while (index != -1) {
      occurrencesM2++;
      index = sentence.indexOf(word, index + 1);
    }

    int occurrencesM3 = 0;
    Pattern pattern = Pattern.compile(word);
    Matcher matcher = pattern.matcher(sentence);

    while (matcher.find()) {
      occurrencesM3++;
    }

    int occurrencesM4 = 0;

    if (sentence.contains(word)) {
      String paddedSentence = sentence + "_";
      StringTokenizer st = new StringTokenizer(paddedSentence, word);

      while (st.hasMoreTokens()) {
        occurrencesM4++;
        st.nextToken();
      }
    }

    System.out.println("Occurrencess:-");
    System.out.println("split method: " + occurrencesM1);
    System.out.println("indexOf method: " + occurrencesM2);
    System.out.println("regex method: " + occurrencesM3);
    System.out.println("StringTokenizer method: " + occurrencesM4);
  }
}
