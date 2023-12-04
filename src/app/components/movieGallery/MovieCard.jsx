import PropTypes from 'prop-types';
import { Row, Col, Space, Rate, Typography } from 'antd';

import './MovieCard.scss';
import { IMAGE_DOMAIN } from '../../utils';

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
  const renderGenres = (ids) => {
    return ids
      .map((id) => genres.find((item) => item.id === id))
      .map(({ id, name }) => (
        <Text key={id} code className="cursor-pointer">
          {name}
        </Text>
      ));
  };

  return (
    <Row className="movie-card" gutter={20}>
      <Col className="movie-card-poster" span={9}>
        <img
          alt={title}
          src={`${IMAGE_DOMAIN}/w220_and_h330_face${posterPath}`}
        />
      </Col>
      <Col className="movie-card-info" span={15}>
        <div className="movie-card-header">
          <h5 className="movie-card-header__title">{title}</h5>
          <p className="movie-card-header__date">{releaseDate}</p>
          <Space className="movie-card-header__genres" size={8}>
            {renderGenres(genreIds)}
          </Space>
        </div>
        <div className="movie-card-body">
          <p className="movie-card-body__overview">{overview}</p>
        </div>
        <div className="movie-card-footer">
          <Rate
            className="movie-card-footer__rating"
            disabled
            allowHalf
            count={10}
            defaultValue={voteAverage}
          />
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
