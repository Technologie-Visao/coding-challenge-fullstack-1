import { rest } from 'msw';
import config from '~/config/config';

export const handlers = [
  rest.get(config.API_BASE_URL + '/textures/suggestions', (req, res, ctx) => {
    console.log('REQUEST');
    return res(ctx.status(200), ctx.json(['test']));
  }),
];
