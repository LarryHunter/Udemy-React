export default function PersonalExpense({ personalExpense, children }) {
  return (
    <div>
      <label>
        {children}
        <input
          type='number'
          value={personalExpense}
          placeholder='Your part...'
        />
      </label>
    </div>
  );
}
