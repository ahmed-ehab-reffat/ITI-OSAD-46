public class Roots {
  private double root1;
  private double root2;
  private boolean isImagenary;

  public void setRoot1(double root1) {
    this.root1 = root1;
  }

  public void setRoot2(double root2) {
    this.root2 = root2;
  }

  public void setIsImeginary(boolean val) {
    this.isImagenary = val;
  }

  public String getRoots() {
    if (root1 == root2) {
      return "Root = " + root1;
    }
    if (isImagenary) {
      return String.format("Root 1: %.2f + %.2fi, Root 2: %.2f - %.2fi", root1, root2, root1, root2);
    }
    return "Root1 = " + root1 + ", Root2 = " + root2;
  }
}
