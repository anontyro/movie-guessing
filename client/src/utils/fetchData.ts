interface FetchData<T> {
  body: T;
  statusCode: number;
}

export const getDataFetch = async <T>(
  url: string,
  auth?: string,
): Promise<FetchData<T>> => {
  const authHeader = auth
    ? {
        Authorization: auth,
      }
    : undefined;

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      ...authHeader,
    },
  });

  const data = await resp.json();

  return {
    body: data,
    statusCode: resp.status,
  };
};
