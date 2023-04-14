import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '~/config/config';

// service for the suggestions api
export const suggestionsApi = createApi({
  reducerPath: 'suggestionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL + '/textures/suggestions',
  }),
  // strongly typed endpoints
  endpoints: (builder) => ({
    // Get all suggestions
    suggestions: builder.query<Suggestion[], void>({
      query: () => ({ url: '/' }),
    }),
  }),
});

export const { useSuggestionsQuery } = suggestionsApi;
