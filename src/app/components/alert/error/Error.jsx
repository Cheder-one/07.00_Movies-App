import PropTypes from 'prop-types';
import { Alert } from 'antd';

function Error({ error }) {
  return (
    <Alert
      className="fade-out"
      message={error}
      type="error"
      showIcon
      closable
    />
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
