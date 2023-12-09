import { Image } from 'antd';
import PropTypes from 'prop-types';

import { IMAGE_DOMAIN } from '../../../utils';

function Poster({ title, posterPath }) {
  return (
    <Image
      alt={title}
      src={`${IMAGE_DOMAIN}/w220_and_h330_face${posterPath}`}
      width="100%"
      height="100%"
      preview={{
        src: `${IMAGE_DOMAIN}/w1280${posterPath}`,
      }}
      fallback="src/app/assets/no-image.svg"
    />
  );
}

Poster.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
};

Poster.defaultProps = {
  posterPath: null,
};

export default Poster;
