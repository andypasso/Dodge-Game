const getHi = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xYFwEP6ZAX6KvJiGNbzB/scores')
  .then((response) => response.json());

export { getHi };