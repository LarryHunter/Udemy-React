import { useEffect, useReducer } from 'react';
import Header from './Header';
import MainComponent from './MainComponent';

const initialState = {
  questions: [],
  // loading, ready, active, error, finished
  status: 'loading',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'ready':
      return { ...state, questions: action.payload };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((error) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <MainComponent>
        <p>1 of 20</p>
        <p>Questions?</p>
      </MainComponent>
    </div>
  );
}
