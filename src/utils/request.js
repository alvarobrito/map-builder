function get({ url }) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json().catch(() => response);
    }
    const error = new Error(response.statusText);
    error.status = response.status;
    error.response = response;
    throw error;
  });
}

export default { get };
