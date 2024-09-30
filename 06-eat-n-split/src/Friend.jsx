import Button from './Button';

export default function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <div className='friend'>
      <li className={isSelected ? 'selected' : ''}>
        <h3>{friend.name}</h3>
        <img
          className='url'
          src={friend.image}
          alt={friend.name}
        />
        {friend.balance > 0 && (
          <p className='red'>
            You owe {friend.name} ${friend.balance}
          </p>
        )}
        {friend.balance < 0 && (
          <p className='green'>
            {friend.name} owes you ${Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button onClick={() => onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
      </li>
    </div>
  );
}
