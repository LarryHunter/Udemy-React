import { useState } from 'react';
import FriendsList from './FriendsList';
import AddFriend from './AddFriend';
import Button from './Button';
import SplitBill from './SplitBill';

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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [billAmt, setBillAmt] = useState(0);
  const [amtOwed, setAmountOwed] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [friendOwes, setFriendOwes] = useState(0);
  const [friendPaid, setFriendPaid] = useState(0);
  const [payer, setPayer] = useState('');

  const handleSelectFriend = (friend) => {
    setSelectedFriend((selected) => (selected?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const showAddFriendForm = () => {
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelectFriend}
        />

        {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={showAddFriendForm}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>
      {selectedFriend && <SplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}
