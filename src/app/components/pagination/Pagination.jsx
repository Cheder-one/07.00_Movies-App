import './Pagination.scss';
import PropTypes from 'prop-types';
import { Pagination as Paginate, Flex } from 'antd';

function Pagination({
  totalItems,
  onPageChange,
  currPage,
  pageSize,
}) {
  const handlePageChange = (page, size) => {
    onPageChange(page, size);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Flex
      className="movie-pagination movie-pagination--box"
      justify={totalItems > pageSize ? 'center' : 'flex-start'}
    >
      {totalItems > pageSize ? (
        <Paginate
          total={Math.min(totalItems, 10000)}
          current={currPage}
          pageSize={pageSize}
          defaultCurrent={1}
          showQuickJumper
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      ) : null}
    </Flex>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
};

Pagination.defaultProps = {
  pageSize: 20,
};

export default Pagination;
