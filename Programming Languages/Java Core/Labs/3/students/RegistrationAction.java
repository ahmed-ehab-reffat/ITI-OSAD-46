@FunctionalInterface
public interface RegistrationAction {
  void execute(Student student, Course course, Double grade);
}
