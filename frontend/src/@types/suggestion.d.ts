/**
 * Response from suggestions api
 */
type Suggestion = {
  name: string;
  description: string;
  thumbnail_url: string;
};

// add score
type SearchedSuggestion = Suggestion & {
  score: number;
};
