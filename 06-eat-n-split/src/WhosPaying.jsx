export default function WhosPaying({ payer, onSelect, children }) {
  return (
    <div>
      <label>
        {children}
        <select
          value={payer}
          onChange={(e) => onSelect(Number(e.target.value))}>
          <option value={''}>-- Select who is paying --</option>
          <option value={'0'}>You</option>
          <option value={'1'}>{payer}</option>
        </select>
      </label>
    </div>
  );
}
