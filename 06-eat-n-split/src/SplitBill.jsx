import BillValue from './BillValue';
import PersonalExpense from './PersonalExpense';
import FriendExpense from './FriendExpense';
import WhosPaying from './WhosPaying';
import Button from './Button';

export default function SplitBill({ friendName, setFriendPaid, setBillAmt, expense, payer, onSelect }) {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with {friendName}</h2>
      <label>💰 Bill amount</label>
      <input
        type='text'
        placeholder='Enter bill amount'
      />
      <label>🧔‍♂️ Your expense</label>
      <input type='text' />
      <label>🧍 {friendName}'s expense</label>
      <input
        type='text'
        disabled
      />
      <label>🤑 Who's paying the bill?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>{friendName}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
