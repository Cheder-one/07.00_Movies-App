import PropTypes from 'prop-types';

function RateRing({ rate }) {
  const rateValue = rate.toFixed(1);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
    >
      <circle
        cx="17"
        cy="17"
        r="16"
        stroke="#E9D100"
        strokeWidth="2"
      />
      <text
        x="50%"
        y="53%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
      >
        {rateValue}
      </text>
    </svg>
  );
}

RateRing.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default RateRing;
