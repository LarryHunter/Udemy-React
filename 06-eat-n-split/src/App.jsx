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
    balance: -7.5,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 21.75,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
  {
    id: 495369,
    name: 'John',
    image: 'https://i.pravatar.cc/48?u=495369',
    balance: 0,
  },
  {
    id: 394587,
    name: 'Brittney',
    image: 'https://i.pravatar.cc/48?u=394587',
    balance: 68.1,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

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

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend
      )
    );
    setSelectedFriend(null);
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
      {selectedFriend && (
        <SplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
