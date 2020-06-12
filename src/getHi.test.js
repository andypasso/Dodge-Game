import { enableFetchMocks } from 'jest-fetch-mock';
import { getHi } from './getHi';

enableFetchMocks();

it('works', () => {
  expect(1).toBe(1);
});

it(' calls the api and returns data to me', () => {
  fetch.mockResponseOnce(JSON.stringify({ body: 'it works' }));

  // assert on the response
  getHi().then(res => {
    expect(res.body).toEqual('it works');
  });
});
