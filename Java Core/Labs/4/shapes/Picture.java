import java.util.ArrayList;

public class Picture {
  public void drawShapes(ArrayList<? extends Shape> list) {
    for (Shape s : list) {
      s.draw();
    }
  }
}
