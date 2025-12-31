import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

public class Exercise1 {

  public static void main(String[] args) {
    CountryDao countryDao = InMemoryWorldDao.getInstance();
    // write your answer here

    System.out.println("The highest populated city for each country: ");

    countryDao.findAllCountries().stream()
        .map(country -> country.getCities().stream()
            .max(Comparator.comparingInt(City::getPopulation)))
        .filter(Optional::isPresent).map(Optional::get)
        .forEach(city -> System.out.println(city.getName() + " ---> " + city.getPopulation()));

  }
}