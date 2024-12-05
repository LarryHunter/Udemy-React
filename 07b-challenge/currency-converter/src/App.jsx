import { useState, useEffect } from 'react';
import './App.css';
import CurrencySearch from './CurrencySearch';
import LoadingIndicator from './LoadingIndicator';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');
  const [convertedAmt, setConvertedAmt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    setAmount(Number(e.target.value));
  };

  useEffect(() => {
    const controller = new AbortController();

    const convertCurrency = async () => {
      try {
        setIsLoading(true);

        // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error('Fetching currency converstion data failed!');
        const data = await response.json();
        // console.log(data.rates[toCurr]);
        setConvertedAmt(data.rates[toCurr]);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        } else {
          console.log(`Abort occurred: ${err}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (fromCurr === toCurr) {
      setConvertedAmt(amount);
      return;
    } else {
      convertCurrency();
    }

    return () => {
      controller.abort();
    };
  }, [amount, toCurr, fromCurr]);

  const getCurrencySymbol = (currencySymbol) => {
    let symbol = '';

    switch (currencySymbol) {
      case 'USD':
        symbol = '$';
        break;
      case 'EUR':
        symbol = '€';
        break;
      case 'GBP':
        symbol = '￡';
        break;
      case 'CAD':
        symbol = 'CA$';
        break;
      case 'INR':
        symbol = '₹';
        break;
      default:
        symbol = '';
        break;
    }
    return symbol;
  };

  return (
    <div>
      <CurrencySearch
        handleCurrencyChange={handleSearch}
        currencyAmt={amount}
        isLoading={isLoading}
      />

      <select
        value={fromCurr}
        onChange={(e) => setFromCurr(e.target.value)}>
        <option value='USD'>US Dollar</option>
        <option value='EUR'>Euro</option>
        <option value='CAD'>Canadian Dollar</option>
        <option value='GBP'>UK Pound</option>
        <option value='INR'>Indian Rupee</option>
      </select>
      <select
        value={toCurr}
        onChange={(e) => setToCurr(e.target.value)}>
        <option value='USD'>US Dollar</option>
        <option value='EUR'>Euro</option>
        <option value='CAD'>Canadian Dollar</option>
        <option value='GBP'>UK Pound</option>
        <option value='INR'>Indian Rupee</option>
      </select>

      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <p>
          {getCurrencySymbol(fromCurr)}
          {Number(amount).toFixed(2)} = {getCurrencySymbol(toCurr)}
          {Number(convertedAmt).toFixed(2)}
        </p>
      )}
    </div>
  );
}
