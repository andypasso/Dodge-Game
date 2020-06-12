const post = (data) => fetch(data.url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: {
    'Content-Type': 'application/json',
  },
}).then(res => res.json());

export { post };