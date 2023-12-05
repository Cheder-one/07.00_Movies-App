import { Pagination as Paginate, Flex } from 'antd';

import './Pagination.scss';

function Pagination({ totalItems }) {
  const handleChange = (page, pageSize) => {
    console.log(page, pageSize);
  };

  return (
    <Flex justify="center">
      <Paginate
        className="movie-pagination movie-pagination--box"
        defaultCurrent={1}
        pageSize={20}
        showSizeChanger={false}
        onChange={handleChange}
        total={totalItems}
      />
    </Flex>
  );
}

export default Pagination;
