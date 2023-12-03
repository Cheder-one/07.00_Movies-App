/* eslint-disable */
import './StarsRating.scss';

function StarsRating({ stars }) {
  const starsFull = Math.floor(stars);
  const starsHalf = Math.round(stars) - starsFull;
  const starsEmpty = 10 - starsFull;

  return (
    <div className="rating">
      {Array.from({ length: starsFull }).map((_, i) => (
        <span key={i} className="fa fa-star checked" />
      ))}
      {Array.from({ length: starsHalf }).map((_, i) => (
        <span key={i} className="fa fa-star-half checked" />
      ))}
      {Array.from({ length: starsEmpty }).map((_, i) => (
        <span key={i} className="fa fa-star" />
      ))}
    </div>
  );
}

export default StarsRating;
