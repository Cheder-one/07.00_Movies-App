import { AUTH_TOKEN } from '../app/utils';

async function movieRequest(
  method,
  url,
  header = null,
  bodyData = null
) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN,
      ...header,
    },
    body: bodyData ? JSON.stringify(bodyData) : null,
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3${url}`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Could not fetch ${url}, received ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // TODO реализовать обработку исключений + Alert
    throw new Error(error);
  }
}

export default movieRequest;
