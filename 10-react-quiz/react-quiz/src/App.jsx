import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import Start from './components/Start';
import Question from './components/Question';
import Finished from './components/Finished';

const initialState = {
  questions: [],
  // loading, ready, active, error, finished
  status: 'loading',
  index: 0,
};

const reducer = (state, action, index) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'ready':
      return { ...state, questions: action.payload };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((error) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMsg />}
        {status === 'ready' && (
          <Start
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && <Question question={questions[index]} />}
        {status === 'finished' && <Finished />}
      </Main>
    </div>
  );
}
