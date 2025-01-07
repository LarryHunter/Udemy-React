import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action!');
  }
};

export default function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = () => {
    dispatch({ type: 'dec', payload: step });
  };

  const inc = () => {
    dispatch({ type: 'inc', payload: step });
  };

  const defineCount = (e) => {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = (e) => {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={defineCount}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
