import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import Start from './components/Start';
import Question from './components/Question';
import Finished from './components/Finished';
import NextButton from './components/NextButton';

const initialState = {
  questions: [],
  // loading, ready, active, error, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
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
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    }
    case 'nextQuestion':
      return { ...state, index: state.index++, answer: null };
    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);
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
        {status === 'active' && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {status === 'finished' && <Finished />}
      </Main>
    </div>
  );
}
