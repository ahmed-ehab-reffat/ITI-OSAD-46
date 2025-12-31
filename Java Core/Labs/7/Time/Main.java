import java.awt.*;
import java.util.*;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class Main extends JFrame implements Runnable {

  Thread th;
  JLabel displayLabel = new JLabel();

  public Main() {

    this.setTitle("Current Time");

    displayLabel.setHorizontalAlignment(JLabel.CENTER);
    displayLabel.setText(new Date().toString());

    this.add(displayLabel, BorderLayout.CENTER);

    th = new Thread(this);
    th.start();
  }

  public void run() {
    while (true) {

      Date now = new Date();
      displayLabel.setText(now.toString());

      try {
        Thread.sleep(1000);
      } catch (InterruptedException ex) {
        ex.printStackTrace();
      }
    }
  }

  public static void main(String[] args) {
    Main window = new Main();

    window.setBounds(100, 100, 500, 300);

    window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    window.setVisible(true);
  }
}