import { LOAD_TOKEN } from './types';

const load_token = token => ({
  type: LOAD_TOKEN,
  payload: token,
});

export { load_token };
