import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Suggestion } from '@testing-library/react';
import config from '~/config/config';

export const suggestionsApi = createApi({
  reducerPath: 'suggestionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL + '/textures/suggestions',
  }),
  // strongly typed endpoints
  endpoints: (builder) => ({
    suggestions: builder.query<Suggestion[], void>({
      query: () => ({ url: '/' }),
    }),
  }),
});

export const { useSuggestionsQuery } = suggestionsApi;
