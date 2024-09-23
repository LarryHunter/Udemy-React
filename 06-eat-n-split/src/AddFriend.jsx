export default function AddFriend() {
  return (
    <>
      <div>
        <label>
          Friend Name
          <input
            type='text'
            placeholder='Enter friend name'
          />
        </label>
      </div>
      <div>
        <label>
          Image URL
          <input
            type='url'
            placeholder='Enter URL'
          />
        </label>
      </div>
      <button className='button'>Add</button>
    </>
  );
}
