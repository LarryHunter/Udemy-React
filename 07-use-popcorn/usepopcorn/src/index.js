import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './StarRating';

/*
function Test() {
  const defaultRating = 3;
  const [rating, setRating] = useState(defaultRating);
  
  return (
    <>
      <StarRating
        maxRating={5}
        defaultRating={rating}
        color='blue'
        onSetRating={setRating}
        />
      <p>This movie was rated {rating} stars!</p>
    </>
  );
}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} />
    <StarRating
      maxRating={15}
      defaultRating={10}
      color='red'
      size={42}
      messages={['Horrible! 👎🏼', 'Not Good', 'OK', 'Pretty Good', 'Great! 👍🏼']}
    />
    <Test /> */}
  </React.StrictMode>
);
