import java.awt.*;
import java.util.Random;
import javax.swing.*;

public class Main extends JPanel implements Runnable {
  private int xPos, yPos;
  private int xVel, yVel;

  private final int DIAMETER = 50;
  private final Random rng = new Random();

  public Main() {
    xPos = rng.nextInt(400);
    yPos = rng.nextInt(300);

    xVel = rng.nextInt(11) - 5;
    yVel = rng.nextInt(11) - 5;

    Thread th = new Thread(this);
    th.start();
  }

  @Override
  protected void paintComponent(Graphics g) {
    super.paintComponent(g);
    g.setColor(Color.BLUE);
    g.fillOval(xPos, yPos, DIAMETER, DIAMETER);
  }

  @Override
  public void run() {
    while (true) {
      xPos += xVel;
      yPos += yVel;

      if (xPos < 0 || xPos > getWidth() - DIAMETER)
        xVel = -xVel;
      if (yPos < 0 || yPos > getHeight() - DIAMETER)
        yVel = -yVel;

      repaint();

      try {
        Thread.sleep(15);
      } catch (InterruptedException ex) {
        ex.printStackTrace();
      }
    }
  }

  public static void main(String[] args) {
    JFrame window = new JFrame("Bouncing Ball App");
    Main content = new Main();

    window.add(content);
    window.setSize(500, 400);
    window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    window.setVisible(true);
  }
}