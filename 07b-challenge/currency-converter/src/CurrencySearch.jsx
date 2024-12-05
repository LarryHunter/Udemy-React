export default function CurrencySearch({ handleCurrencyChange, currencyAmt, isLoading }) {
  return (
    <>
      <input
        disabled={isLoading}
        type='text'
        onChange={(e) => handleCurrencyChange(e)}
        value={currencyAmt}
      />
    </>
  );
}
