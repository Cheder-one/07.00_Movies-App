import PropTypes from 'prop-types';
import { Card, Row, Col, Typography } from 'antd';

import { imageDomain } from '../../utils';

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
    <Card>
      <Row>
        <Col span={9}>
          <img
            src={`${imageDomain}/w220_and_h330_face${posterPath}`}
            alt={title}
          />
        </Col>
        <Col span={15}>
          <h5>{title}</h5>
          <p>{renderGenres(genreIds)}</p>
          <p>{releaseDate}</p>
          <p>{voteAverage}</p>
          <p>{overview}</p>
        </Col>
      </Row>
    </Card>
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
