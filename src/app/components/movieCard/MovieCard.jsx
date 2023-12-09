import PropTypes from 'prop-types';
import { Row, Col, Space, Rate, Typography, Flex } from 'antd';

import './MovieCard.scss';
import { GenreList, Poster, RateRing } from './index';

const { Text } = Typography;

function MovieCard({
  title,
  posterPath,
  releaseDate,
  genres,
  genreIds,
  voteAverage,
  overview,
}) {
  return (
    <Row className="movie-card movie-card--box">
      <Col className="movie-card__poster" span={9}>
        <Poster title={title} posterPath={posterPath} />
      </Col>

      <Col className="movie-card__info" span={15}>
        <Row>
          <Col className="movie-card__head" span={24}>
            <div className="movie-card__header">
              <div className="movie-card__title">{title}</div>
              <div className="movie-card__rate-ring">
                <RateRing rate={voteAverage} />
              </div>
            </div>
            <div className="movie-card__date">{releaseDate}</div>
            <GenreList
              className="movie-card__genres"
              ids={genreIds}
              genres={genres}
            />
          </Col>
        </Row>

        <Row className="movie-card__body">
          <div className="movie-card__overview">{overview}</div>
        </Row>
        <Row className="movie-card__footer">
          <Rate
            className="movie-card__rating"
            allowHalf
            count={10}
            defaultValue={voteAverage}
          />
        </Row>
      </Col>
    </Row>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
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

MovieCard.defaultProps = {
  posterPath: null,
};

export default MovieCard;
