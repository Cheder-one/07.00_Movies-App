import PropTypes from 'prop-types';
import { Row, Col, Space, Rate, Typography, Flex } from 'antd';

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
    <Row className="movie-card movie-card--box">
      <Col className="movie-card__poster" span={9}>
        <img
          alt={title}
          src={`${IMAGE_DOMAIN}/w220_and_h330_face${posterPath}`}
        />
      </Col>
      <Col className="movie-card__info" span={15}>
        <Row>
          <Col span={20}>
            <div className="movie-card__header">
              <h5 className="movie-card__title">{title}</h5>
              <p className="movie-card__date">{releaseDate}</p>
              <Space className="movie-card__genres" size={8}>
                {renderGenres(genreIds)}
              </Space>
            </div>
          </Col>
          <Col span={4}>
            <Flex justify="end">8.8</Flex>
          </Col>
        </Row>

        <Row className="movie-card__body">
          <p className="movie-card__overview">{overview}</p>
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
