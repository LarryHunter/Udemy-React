import BillValue from './BillValue';
import PersonalExpense from './PersonalExpense';
import FriendExpense from './FriendExpense';
import WhosPaying from './WhosPaying';

export default function BillSplit({ friendName, setFriendPaid, setBillAmt, expense, payer, onSelect }) {
  return (
    <>
      <h1>Split a bill with {friendName}</h1>
      <BillValue billValue={setBillAmt}>Bill amount: </BillValue>
      <PersonalExpense amountDue={expense}>Your expense: </PersonalExpense>
      <FriendExpense setFriendPaid={setFriendPaid}>{friendName}'s expense: </FriendExpense>
      <WhosPaying
        whosPaying={payer}
        onSelect={onSelect}>
        Who is paying the bill?
      </WhosPaying>
      <button>Split Bill</button>
    </>
  );
}
