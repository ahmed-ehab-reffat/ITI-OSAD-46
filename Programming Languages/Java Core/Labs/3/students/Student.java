import java.util.ArrayList;

public class Student {
  private Integer id;
  private String name;
  private ArrayList<CourseRegistration> registrations;
  private static Integer counter = 0;

  public Student(String name) {
    this.id = ++counter;
    this.name = name;
    this.registrations = new ArrayList<>();
  }

  public Integer getStudentId() {
    return id;
  };

  public String getName() {
    return name;
  };

  public boolean registerCourse(Course course, Double grade) {
    for (CourseRegistration registerd : registrations) {
      if (registerd.getCourse() == course) {
        return false;
      }
    }
    CourseRegistration obj = new CourseRegistration(course, grade);
    registrations.add(obj);
    return true;
  };

  public void printReport() {
    StringBuilder report = new StringBuilder();
    report.append("Student: ").append(name).append(" (ID: ").append(id).append(")\n");
    report.append("Courses Registered:\n");

    if (registrations.isEmpty()) {
      report.append("  No courses registered.\n");
    } else {
      for (CourseRegistration registerd : registrations) {
        report.append("  ").append(registerd.getCourse().getCourseName())
            .append(" (ID: ").append(registerd.getCourse().getCourseId())
            .append(", Credit Hours: ").append(registerd.getCourse().getCourseCreditHours())
            .append(", Grade: ").append(registerd.getGrade() != null ? registerd.getGrade() : "N/A")
            .append(")\n");
      }
    }
    System.out.println(report.toString());
  };

  private class CourseRegistration {
    private Course course;
    private Double grade;

    public CourseRegistration(Course course, Double grade) {
      this.course = course;
      this.grade = grade;
    }

    public Course getCourse() {
      return course;
    }

    public Double getGrade() {
      return grade;
    }
  }
}