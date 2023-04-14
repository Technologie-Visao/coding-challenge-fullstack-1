import { rest } from 'msw';
import config from '~/config/config';

// mock data
const data = [
  {
    name: 'Aurora',
    description:
      'pure black coal rocks, unused, dry, variation in sizes, sand and dirt included',
    thumbnail_url:
      'https://static-dev.withpoly.com/v3-voronoi/textures/previews/e017af84-ac4b-459a-8e8d-636ced179bfe.webp',
  },
];

// mock api endpoints
export const handlers = [
  rest.get(config.API_BASE_URL + '/textures/suggestions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  }),
];
