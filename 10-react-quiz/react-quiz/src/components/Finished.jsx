export default function Finished({ points, totalPoints, highScore }) {
  const percentage = (points / totalPoints) * 100;
  const passed =
    percentage >= 75
      ? percentage === 100
        ? '... and a PERFECT SCORE!'
        : 'Congratulations! You passed.'
      : 'Sorry, you did not pass...';
  let emoji;
  if (percentage === 100) emoji = '🏆';
  if (percentage >= 75 && percentage < 100) emoji = '⭐️';
  if (percentage > 50 && percentage < 75) emoji = '🤔';
  if (percentage <= 50) emoji = '🤦🏼‍♂️';

  return (
    <>
      <div className='result'>
        <h2>{emoji}</h2>
        <p>
          You scored {points} points out of a possible {totalPoints}.
        </p>
        <p>That is {Math.ceil(percentage)}%</p>
        <h3>{passed}</h3>
      </div>
      <p className='highscore'>(High Score: {highScore} points)</p>
    </>
  );
}
