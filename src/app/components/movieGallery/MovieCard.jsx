/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';

import './MovieCard.scss';
import { imageDomain } from '../../utils';
import StarsRating from '../starsRating/StarsRating';

const { Text } = Typography;

const myStyle = css`
  color: red;
  font-size: 16px;
`;

function MovieCard({
  title,
  posterPath,
  releaseDate,
  genres,
  genreIds,
  voteAverage,
  overview,
}) {
  const renderGenres = (ids) => {
    const matchedGenres = ids.map((id) =>
      genres.find((item) => item.id === id)
    );

    return matchedGenres.map(({ id, name }) => (
      <Text code key={id}>
        {name}
      </Text>
    ));
  };

  return (
    <Row className="movie-card" gutter={20}>
      <Col span={9} className="movie-card__poster">
        <img
          alt={title}
          src={`${imageDomain}/w220_and_h330_face${posterPath}`}
        />
      </Col>
      <Col span={15} className="movie-card__info">
        <div className="movie-card__info-header">
          <h5>{title}</h5>
          <p>{renderGenres(genreIds)}</p>
          <p>{releaseDate}</p>
          <p>{voteAverage}</p>
        </div>

        <div css={{ color: 'hotpink' }}>dsa</div>
        <div
          css={css`
            color: green;
          `}
        >
          dsad
        </div>

        <div className="movie-card__info-overview">{overview}</div>
        <div className="movie-card__info-rating">
          <StarsRating stars={voteAverage} />
        </div>
      </Col>
    </Row>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  voteAverage: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
};

export default MovieCard;
