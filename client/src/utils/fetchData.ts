interface FetchData {
  body: any;
  statusCode: number;
}

export const getDataFetch = async (
  url: string,
  auth?: string,
): Promise<FetchData> => {
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
