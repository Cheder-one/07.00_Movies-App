import { Image } from 'antd';
import PropTypes from 'prop-types';

import { IMAGE_DOMAIN } from '../../../utils';
import noImgSrc from '../../../assets/no-image.svg';

// const noImage = new Image();
// noImage.src = noImgSrc;

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
      fallback={noImgSrc}
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
