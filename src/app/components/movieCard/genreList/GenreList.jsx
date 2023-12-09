import PropTypes from 'prop-types';
import { Space, Typography } from 'antd';

const { Text } = Typography;

function GenreList({ ids, genres, className }) {
  return (
    <Space className={className} size={8}>
      {ids.map((id) => {
        const genre = genres.find((item) => item.id === id);
        return (
          <Text key={id} code className="cursor-pointer">
            {genre.name}
          </Text>
        );
      })}
    </Space>
  );
}

GenreList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

GenreList.defaultProps = {
  className: '',
};

export default GenreList;
