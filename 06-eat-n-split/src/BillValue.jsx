export default function BillValue({ billValue, children }) {
  return (
    <div>
      <label>
        {children}
        <input
          type='number'
          value={billValue}
          placeholder='Bill amount'
        />
      </label>
    </div>
  );
}
