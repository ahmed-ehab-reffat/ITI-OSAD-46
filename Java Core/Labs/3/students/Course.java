public class Course {
  private Integer id;
  private String name;
  private Integer creditHours;

  public Course(Integer id, String name, Integer creditHours) {
    this.id = id;
    this.name = name;
    this.creditHours = creditHours;
  }

  public Integer getCourseId() {
    return id;
  }

  public String getCourseName() {
    return name;
  }

  public Integer getCourseCreditHours() {
    return creditHours;
  }
}
