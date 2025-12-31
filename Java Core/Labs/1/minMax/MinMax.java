import java.util.Random;

public class MinMax {
  public static void main(String[] args) {
    Random random = new Random();

    int arr[] = new int[1000];
    for (int i = 0; i < 1000; i++) {
      int randNumber = random.nextInt(5000);
      arr[i] = randNumber;
    }

    int min = arr[0];
    int max = arr[0];

    long startTime = System.currentTimeMillis();

    for (int i = 0; i < 1000; i++) {
      if (min > arr[i]) {
        min = arr[i];
      }
      if (max < arr[i]) {
        max = arr[i];
      }
    }

    long endTime = System.currentTimeMillis();

    System.out.println("Min: " + min);
    System.out.println("Max: " + max);

    long computeTime = endTime - startTime;
    System.out.println("Compute time: " + computeTime);
  }
}
