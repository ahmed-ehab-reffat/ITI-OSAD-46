public class Ipaddress {
  public static void main(String[] args) {
    String ipadress = "192.168.1.1";

    String from1to255 = "([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])";
    String regex = "(" + from1to255 + "\\.){3}" + from1to255;

    // String regex =
    // "(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])";

    System.out.println(ipadress);

    if (ipadress.matches(regex)) {
      System.out.println("Valid");
    } else {
      System.out.println("Invalid");
    }
  }
}
