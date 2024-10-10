export default function OpenButton({ children, onClick }) {
  return (
    <button
      className='btn-toggle'
      onClick={onClick}>
      {children}
    </button>
  );
}
