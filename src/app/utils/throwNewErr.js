const throwNewErr = (message, info) => {
  const error = new Error();
  error.message = `${info} \n${message}`;
  error.info = info;
  throw error;
};

export default throwNewErr;
