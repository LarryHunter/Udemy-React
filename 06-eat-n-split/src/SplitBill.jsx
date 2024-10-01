import { useState } from 'react';
import Button from './Button';

export default function SplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  };

  return (
    <form
      className='form-split-bill'
      onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill amount</label>
      <input
        type='number'
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
      <label>🧔‍♂️ Your expense</label>
      <input
        type='number'
        value={paidByUser}
        onChange={(e) => setPaidByUser(e.target.value > Number(bill) ? Number(paidByUser) : e.target.value)}
      />
      <label>🧍 {selectedFriend.name}'s expense</label>
      <input
        type='number'
        disabled
        value={paidByFriend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      />
      <label>🤑 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
