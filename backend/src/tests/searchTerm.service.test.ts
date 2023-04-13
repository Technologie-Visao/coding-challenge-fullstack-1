import { SearchTermService } from '../services/searchTerm.service';

describe('SearchTermService', () => {
  const searchTermService = new SearchTermService();

  test('findSearchItem should return limited suggestions', async () => {
    const searchTerm = {
      searchTerm: 'test',
      limit: 2,
    };
    const results = await searchTermService.findSearchItem(searchTerm);
    expect(results.length).toBeLessThanOrEqual(searchTerm.limit);
  });

  test('findSearchItem should return an empty array when searchTerm is empty', async () => {
    const searchTerm = {
      searchTerm: '',
      limit: 5,
    };
    const results = await searchTermService.findSearchItem(searchTerm);
    expect(results).toHaveLength(0);
  });

  test('findSearchItem should return an empty array when no suggestions match the searchTerm', async () => {
    const searchTerm = {
      searchTerm: 'nonexistent_term',
      limit: 5,
    };
    const results = await searchTermService.findSearchItem(searchTerm);
    expect(results).toHaveLength(0);
  });

  test('findSearchItem should return suggestions with the correct structure', async () => {
    const searchTerm = {
      searchTerm: 'some_term',
      limit: 2,
    };
    const results = await searchTermService.findSearchItem(searchTerm);
    results.forEach((result) => {
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('thumbnail_url');
    });
  });
});
