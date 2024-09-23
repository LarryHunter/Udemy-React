export default function FriendExpense({ setFriendPaid, children }) {
  return (
    <div>
      <label>
        {children}
        <input
          type='number'
          value={setFriendPaid}
          placeholder='your friend paid?'
        />
      </label>
    </div>
  );
}
