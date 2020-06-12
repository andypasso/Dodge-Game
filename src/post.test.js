import { enableFetchMocks } from 'jest-fetch-mock';
import { post } from './post';

enableFetchMocks();

it('works', () => {
  expect(1).toBe(1);
});

it('posts data to server', () => {
  fetch.mockResponseOnce(JSON.stringify({ body: 'Leaderboard score created correctly.' }));
  const data = { user: 'tommy', score: 980, url: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/xYFwEP6ZAX6KvJiGNbzB/scores' };

  post(data).then(res => {
    expect(res.body).toEqual('Leaderboard score created correctly.');
  });
});