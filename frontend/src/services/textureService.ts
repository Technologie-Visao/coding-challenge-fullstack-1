export interface Suggestion {
  name: string;
  description: string;
  thumbnail_url: string;
}

export async function fetchSuggestions(
  searchTerm: string,
  limit: number,
): Promise<Suggestion[]> {
  const response = await fetch(
    `http://localhost:3000/textures/suggestions?searchTerm=${searchTerm}&limit=${limit}`,
  );
  const data = await response.json();
  return data;
}
