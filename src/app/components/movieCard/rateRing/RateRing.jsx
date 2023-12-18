import PropTypes from 'prop-types';
import { Progress } from 'antd';

function RateRing({ rate }) {
  const score = rate.toFixed(1);

  let strokeColor = '';

  if (score >= 0 && score < 3) {
    strokeColor = '#E90000';
  } else if (score >= 3 && score < 5) {
    strokeColor = '#E97E00';
  } else if (score >= 5 && score < 7) {
    strokeColor = '#E9D100';
  } else {
    strokeColor = '#66E900';
  }

  const formatProgress = () => {
    return <span style={{ color: 'black' }}>{score}</span>;
  };

  return (
    <Progress
      size={30}
      type="circle"
      percent={100}
      format={formatProgress}
      strokeColor={strokeColor}
    />
  );
}

RateRing.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default RateRing;
