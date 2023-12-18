import './MovieCard.scss';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Row, Col, Rate, Typography } from 'antd';
import { format } from 'date-fns';

import { useContentOverflow } from '../../hooks';
import { deleteMovieRating, sendMovieRating } from '../../../service';

import { GenreList, Poster, RateRing } from '.';

const { Title } = Typography;

function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
  genres,
  genreIds,
  voteAverage,
  overview,
}) {
  const [rateValue, setRateValue] = useState(
    +sessionStorage.getItem(`movieRating_${id}`)
  );

  const overviewRef = useRef();
  useContentOverflow(overviewRef);

  const handleRateChange = (rate) => {
    if (!rate) {
      deleteMovieRating(id);
      sessionStorage.removeItem(`movieRating_${id}`);
    } else {
      sendMovieRating(id, rate);
      sessionStorage.setItem(`movieRating_${id}`, rate);
    }
    setRateValue(+sessionStorage.getItem(`movieRating_${id}`));
  };

  const formatMovieDate = (date) => {
    return format(new Date(date), 'MMMM d, yyyy');
  };

  return (
    <Row className="movie-card movie-card--box">
      <Col className="movie-card__poster" xs={0} xl={9}>
        <Poster title={title} posterPath={posterPath} />
      </Col>

      <Col className="movie-card__info" xl={15}>
        <Row className="movie-card__top">
          <Col className="movie-card__poster" xs={2} xl={0}>
            <Poster title={title} posterPath={posterPath} />
          </Col>

          <Col className="movie-card__head" xl={24}>
            <div className="movie-card__header">
              <Title
                className="movie-card__title"
                ellipsis={{ rows: 2, tooltip: title }}
              >
                {title}
              </Title>
              <div className="movie-card__rate-ring">
                <RateRing rate={voteAverage} />
              </div>
            </div>
            <div className="movie-card__date">
              {formatMovieDate(releaseDate)}
            </div>
            <GenreList
              className="movie-card__genre-list"
              ids={genreIds}
              genres={genres}
            />
          </Col>
        </Row>

        <Row className="movie-card__body" ref={overviewRef}>
          <div className="movie-card__overview">{overview}</div>
        </Row>
        <Row className="movie-card__footer">
          <Rate
            className="movie-card__rating"
            allowHalf
            count={10}
            value={rateValue}
            onChange={handleRateChange}
          />
        </Row>
      </Col>
    </Row>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
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
