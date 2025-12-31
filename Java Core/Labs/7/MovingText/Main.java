import javax.swing.JFrame;
import javax.swing.JLabel;

public class Main extends JFrame implements Runnable {
  Thread th;

  JLabel textLabel = new JLabel();

  public Main() {
    this.setTitle("Banner Application");
    this.setLayout(null);
    this.add(textLabel);

    th = new Thread(this);
    th.start();
  }

  public void run() {
    String bannerText = "Hello World";

    int posX = 0;
    int step = 10;

    while (true) {
      posX += step;

      if (posX >= 550 || posX <= 0) {
        step = -step;
      }

      textLabel.setBounds(posX, 100, 200, 50);
      textLabel.setText(bannerText);

      try {
        Thread.sleep(100);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  public static void main(String[] args) {
    Main window = new Main();
    window.setBounds(50, 50, 600, 400);
    window.setVisible(true);
    window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  }
}