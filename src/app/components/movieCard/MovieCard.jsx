import PropTypes from 'prop-types';
import { Row, Col, Rate, Typography } from 'antd';

import './MovieCard.scss';

import { deleteMovieRating, sendMovieRating } from '../../../service';

import { GenreList, Poster, RateRing } from './index';

const { Title, Paragraph } = Typography;

function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
  genres,
  genreIds,
  rating,
  voteAverage,
  // popularity,
  overview,
}) {
  const handleRateChange = (rate) => {
    if (!rate) {
      deleteMovieRating(id);
    } else {
      sendMovieRating(id, rate);
    }
  };

  return (
    // <Row>
    //   <Col xs={24} sm={8}>
    //     <Poster title={title} posterPath={posterPath} />
    //   </Col>
    //   <Col xs={24} sm={16}>
    //     <Title level={2}>Название фильма</Title>
    //     <Paragraph ellipsis={{ rows: 3, expandable: true }}>
    //       Описание фильма Описание фильма Описание фильма Описание
    //       Описание фильма Описание фильма Описание фильма Описание
    //       Описание фильма Описание фильма Описание фильма Описание
    //       Описание фильма Описание фильма Описание фильма Описание
    //       фильма Описание фильма Описание фильма
    //     </Paragraph>
    //   </Col>
    // </Row>

    <Row className="movie-card movie-card--box">
      <Col className="movie-card__poster" xs={0} xl={9}>
        <Poster title={title} posterPath={posterPath} />
      </Col>

      <Col className="movie-card__info" xl={15}>
        <Row>
          <Col className="movie-card__poster" xs={2} xl={0}>
            <Poster title={title} posterPath={posterPath} />
          </Col>

          <Col className="movie-card__head" xl={24}>
            <div className="movie-card__header">
              <h5 className="movie-card__title">{title}</h5>
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
            onChange={handleRateChange}
            defaultValue={rating || voteAverage}
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
  rating: PropTypes.number,
  voteAverage: PropTypes.number.isRequired,
  // popularity: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
};

MovieCard.defaultProps = {
  posterPath: null,
  rating: null,
};

export default MovieCard;
