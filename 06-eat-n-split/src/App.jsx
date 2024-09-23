import FriendsList from './FriendsList';
import AddFriend from './AddFriend';
import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [billAmt, setBillAmt] = useState(0);
  const [amtOwed, setAmountOwed] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [friendName, setFriendName] = useState('');
  const [friendOwes, setFriendOwes] = useState(0);
  const [friendPaid, setFriendPaid] = useState(0);
  const [payer, setPayer] = useState('');

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList friends={initialFriends} />
      </div>
      <div className='form'>
        <div className='form-add-friend'>
          <AddFriend />
        </div>
      </div>
      {/* 
      <BillSplit
        friendName={setFriendName}
        friendPaid={setFriendPaid}
        billAmt={setBillAmt}
        expense={amtOwed}
        payer={payer}
        onSelect={setPayer}
      /> */}
    </div>
  );
}
