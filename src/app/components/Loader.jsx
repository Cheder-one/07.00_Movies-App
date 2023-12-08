import { Spin, Flex } from 'antd';

function Loader() {
  return (
    <Flex style={{ height: '100vh' }} justify="center" align="center">
      <Spin size="large" />
    </Flex>
  );
}

export default Loader;
