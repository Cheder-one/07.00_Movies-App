import PropTypes from 'prop-types';
import { Pagination as Paginate, Flex } from 'antd';

import './Pagination.scss';

function Pagination({ totalItems, onPageChange, currPage }) {
  const handlePageChange = (page, pageSize) => {
    onPageChange(page, pageSize);
  };

  return (
    <Flex justify="center">
      <Paginate
        className="movie-pagination movie-pagination--box"
        current={currPage}
        defaultCurrent={1}
        pageSize={20}
        showSizeChanger={false}
        onChange={handlePageChange}
        total={totalItems}
      />
    </Flex>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired,
};

export default Pagination;
