import { useParams, useSearchParams } from 'react-router-dom';
import styles from './City.module.css';

function City() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // const { cityName, emoji, date, notes } = city;

  return (
    <div className={styles.city}>
      <h1>City ID: {id}</h1>
      <h2>
        City coordinates: {lat}, {lng}
      </h2>
    </div>
  );

  // return (
  //   <div className={styles.city}>
  //     <div className={styles.row}>
  //       <h6>City name</h6>
  //       <h3>
  //         <span>{emoji}</span> {cityName}
  //       </h3>
  //     </div>

  //     <div className={styles.row}>
  //       <h6>You went to {cityName} on</h6>
  //       <p>{formatDate(date || null)}</p>
  //     </div>

  //     {notes && (
  //       <div className={styles.row}>
  //         <h6>Your notes</h6>
  //         <p>{notes}</p>
  //       </div>
  //     )}

  //     <div className={styles.row}>
  //       <h6>Learn more</h6>
  //       <Link
  //         to={`https://en.wikipedia.org/wiki/${cityName}`}
  //         target='_blank'
  //         rel='noreferrer'>
  //         Check out {cityName} on Wikipedia &rarr;
  //       </Link>
  //     </div>
  //   </div>
  // );
}

export default City;
