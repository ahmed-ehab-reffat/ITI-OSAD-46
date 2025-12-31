import java.util.Comparator;
import java.util.Optional;
import java.util.Objects;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class Exercise2 {

  public static void main(String[] args) {
    CountryDao countryDao = InMemoryWorldDao.getInstance();
    // write your answer here

    System.out.println("The highest populated city for each continent: ");

    countryDao.getAllContinents().stream()
        .map(continent -> countryDao.findCountriesByContinent(continent).stream()
            .flatMap(country -> country.getCities().stream())
            .max(Comparator.comparingInt(City::getPopulation)))
        .filter(Optional::isPresent)
        .map(Optional::get)
        .forEach(city -> {
          System.out.println(countryDao.findCountryByCode(city.getCountryCode()).getContinent() +
              ": " + city.getName() + " ---> " + city.getPopulation());
        });

  }
}
