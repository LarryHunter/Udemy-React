import { useState } from 'react';
import Button from './Button';

export default function AddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const id = crypto.randomUUID();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) {
      return;
    }

    const newFriend = {
      id: id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form
      className='form-add-friend'
      onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type='text'
        placeholder='Enter friend name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type='url'
        placeholder='Enter URL'
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
