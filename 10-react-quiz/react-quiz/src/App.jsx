import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import Start from './components/Start';
import Question from './components/Question';
import Finished from './components/Finished';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import RestartButton from './components/Restart';
import Timer from './components/Timer';
import Footer from './components/Footer';

const NUM_SECONDS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  // loading, ready, active, error, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'ready':
      return { ...state, questions: action.payload };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * NUM_SECONDS_PER_QUESTION,
      };
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
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };
    /*
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highScore: state.highScore,
        secondsRemaining: 120,
        status: 'ready',
      };
      */
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Unknown action!');
  }
};

export default function App() {
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((accumulated, question) => accumulated + question.points, 0);

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
            points={points}
            totalPoints={totalPoints}
          />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <Finished
              points={points}
              totalPoints={totalPoints}
              highScore={highScore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
