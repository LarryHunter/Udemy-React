export default function CurrencySearch({ handleCurrencyChange, currencyAmt, isLoading }) {
  return (
    <>
      <input
        disabled={isLoading}
        type='text'
        placeholder='Enter currency amount...'
        onChange={(e) => handleCurrencyChange(e)}
        value={currencyAmt}
      />
    </>
  );
}
