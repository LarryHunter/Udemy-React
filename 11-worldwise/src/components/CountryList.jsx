import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';

function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return <Message message={'Add your first country by clicking on a country on the map'} />;
  }

  const countries = [];
  const seenCountries = new Set();
  for (const city of cities) {
    if (!seenCountries.has(city.country)) {
      seenCountries.add(city.country);
      countries.push({ country: city.country, emoji: city.emoji });
    }
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          country={country}
          key={country.country}
        />
      ))}
    </ul>
  );
}

export default CountryList;
