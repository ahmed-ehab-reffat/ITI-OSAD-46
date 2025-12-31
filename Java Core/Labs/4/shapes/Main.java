import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {

    ArrayList<Shape> rectangles = new ArrayList<>();
    rectangles.add(new Rectangle());
    rectangles.add(new Rectangle());

    ArrayList<Shape> circles = new ArrayList<>();
    circles.add(new Circle());
    circles.add(new Circle());

    Picture picture = new Picture();

    picture.drawShapes(circles);
  }
}
