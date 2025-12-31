import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.StringTokenizer;

public class RegistrationApp {
  private List<Student> students = new ArrayList<>();
  private List<Course> courses = new ArrayList<>();
  private Scanner scanner = new Scanner(System.in);

  private RegistrationAction registrationAction = (student, course, grade) -> {
    boolean isRegesterd = student.registerCourse(course, grade);
    if (isRegesterd) {
      System.out.println("Successfully registered " + student.getName() +
          " for " + course.getCourseName() + " with grade: " + (grade != null ? grade : "N/A"));
    } else {
      System.out.println("Couldn't registere " + student.getName() +
          " for " + course.getCourseName() + " with grade: " + (grade != null ? grade : "N/A")
          + "\nCourse is already regestered");
    }
  };

  public void displayMenu() {
    System.out.println("\n===== Student Registration System =====");
    System.out.println("1. Add a new student");
    System.out.println("2. Register student for courses");
    System.out.println("3. Print student report");
    System.out.println("4. List all students");
    System.out.println("5. List all courses");
    System.out.println("6. Exit");
    System.out.print("Enter your choice: ");
  }

  public void addStudent() {
    System.out.print("Enter student name: ");
    String name = scanner.nextLine().trim();

    if (name.isEmpty()) {
      System.out.println("Student name cannot be empty.");
      return;
    }

    Student student = new Student(name);
    students.add(student);
    System.out.println("Student '" + name + "' added successfully with ID: " + student.getStudentId());
  }

  public void registerStudentForCourses() {
    if (students.isEmpty()) {
      System.out.println("No students available. Please add a student first.");
      return;
    }

    if (courses.isEmpty()) {
      System.out.println("No courses available. Please add courses first.");
      return;
    }

    System.out.print("Enter student ID: ");
    try {
      Integer studentId = Integer.parseInt(scanner.nextLine().trim());
      Student student = findStudentById(studentId);

      if (student == null) {
        System.out.println("Student not found.");
        return;
      }

      System.out.println("\nAvailable Courses:");
      for (Course course : courses) {
        System.out.println("  " + course.getCourseId() + ". " + course.getCourseName());
      }

      System.out.print("\nEnter course IDs (space or comma separated) and optional grades (format: 1:85 2:90): ");
      String input = scanner.nextLine().trim();

      if (input.isEmpty()) {
        System.out.println("No courses entered.");
        return;
      }

      StringTokenizer tokenizer = new StringTokenizer(input, " ,");
      while (tokenizer.hasMoreTokens()) {
        String token = tokenizer.nextToken();

        String[] parts = token.split(":");
        Integer courseId = Integer.parseInt(parts[0]);
        Double grade = null;

        if (parts.length > 1) {
          try {
            grade = Double.parseDouble(parts[1]);
          } catch (NumberFormatException e) {
            System.out.println("Invalid grade format. Skipping grade for course " + courseId);
          }
        }

        Course course = findCourseById(courseId);
        if (course != null) {
          registrationAction.execute(student, course, grade);
        } else {
          System.out.println("Course with ID " + courseId + " not found.");
        }
      }
    } catch (NumberFormatException e) {
      System.out.println("Invalid input. Please enter a valid student ID.");
    }
  }

  public void printStudentReport() {
    if (students.isEmpty()) {
      System.out.println("No students available.");
      return;
    }

    System.out.print("Enter student ID: ");
    try {
      Integer studentId = Integer.parseInt(scanner.nextLine().trim());
      Student student = findStudentById(studentId);

      if (student == null) {
        System.out.println("Student not found.");
        return;
      }

      System.out.println("\n===== Student Report =====");
      student.printReport();
    } catch (NumberFormatException e) {
      System.out.println("Invalid input. Please enter a valid student ID.");
    }
  }

  public void listAllStudents() {
    if (students.isEmpty()) {
      System.out.println("No students available.");
      return;
    }

    System.out.println("\n===== All Students =====");
    for (Student student : students) {
      System.out.println("  ID: " + student.getStudentId() + ", Name: " + student.getName());
    }
  }

  public void listAllCourses() {
    if (courses.isEmpty()) {
      System.out.println("No courses available.");
      return;
    }

    System.out.println("\n===== All Courses =====");
    for (Course course : courses) {
      System.out.println("  ID: " + course.getCourseId() + ", Name: " + course.getCourseName() +
          ", Credit Hours: " + course.getCourseCreditHours());
    }
  }

  public void initializeSampleData() {
    courses.add(new Course(1, "Object-Oriented Programming", 3));
    courses.add(new Course(2, "Databases", 4));
    courses.add(new Course(3, "Web Development", 3));
    courses.add(new Course(4, "Data Structures", 3));

    students.add(new Student("Mohamed Nour"));
    students.add(new Student("Salma Ahmed"));
    students.add(new Student("Omar Alaa"));

    System.out.println("System initialized with sample data.");
  }

  private Student findStudentById(Integer studentId) {
    for (Student student : students) {
      if (student.getStudentId().equals(studentId)) {
        return student;
      }
    }
    return null;
  }

  private Course findCourseById(Integer courseId) {
    for (Course course : courses) {
      if (course.getCourseId().equals(courseId)) {
        return course;
      }
    }
    return null;
  }
}
