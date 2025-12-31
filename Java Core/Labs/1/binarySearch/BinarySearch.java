import java.util.Random;

public class BinarySearch {
  public static void main(String[] args) {
    Random random = new Random();

    int arr[] = new int[1000];
    for (int i = 0; i < 1000; i++) {
      int randNumber = random.nextInt(2000);
      arr[i] = randNumber;
    }

    for (int i = 0; i < 1000; i++) {
      for (int j = i + 1; j < 1000; j++) {
        if (arr[j] < arr[i]) {
          int temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }

    int target = 50;
    int index = -1;

    long startTime = System.currentTimeMillis();

    int start = 0;
    int end = arr.length;

    while (start < end) {
      int mid = (start + end) / 2;
      if (target == arr[mid]) {
        index = mid;
        break;
      }
      if (arr[mid] < target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }

    }
    long endTime = System.currentTimeMillis();

    System.out.println("Index: " + index);

    long computeTime = endTime - startTime;
    System.out.println("Compute time: " + computeTime);
  }
}
