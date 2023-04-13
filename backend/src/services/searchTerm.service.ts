import { SearchTerm } from '../models/searchTerm.model';
import Fuse from 'fuse.js';
import texturesData from '../../data.json';

/**
 * Represents a texture item.
 * @interface TextureItem
 * @property {string} name - The name of the texture.
 * @property {string} description - The description of the texture.
 * @property {string} thumbnail_url - The URL to the texture's thumbnail.
 */
interface ITextureItem {
  name: string;
  description: string;
  thumbnail_url: string;
}

/**
 * Defines the interface for the search term service.
 * @interface ISearchTermService
 * @function findSearchItem - Finds search items based on the provided search term and limit.
 */
export interface ISearchTermService {
  findSearchItem(searchTerm: SearchTerm): Promise<ITextureItem[]>;
}

/**
 * Implements the search term service.
 * @class SearchTermService
 * @implements {ISearchTermService}
 */
export class SearchTermService implements ISearchTermService {
  /**
   * Finds search items based on the provided search term and limit.
   * @function findSearchItem
   * @memberof SearchTermService
   * @param {SearchTerm} searchTerm - The search term object with the search string and limit.
   * @returns {Promise<ITextureItem[]>} A promise that resolves to an array of matched texture items.
   */
  async findSearchItem(searchTerm: SearchTerm): Promise<ITextureItem[]> {
    const options = {
      keys: [
        {
          name: 'name',
          weight: 1, // Higher weight for the name field
        },
        {
          name: 'description',
          weight: 100, // Lower weight for the description field
        },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    };

    const fuseInstance = new Fuse(texturesData, options);
    const suggestions = fuseInstance.search(searchTerm.searchTerm);

    suggestions.sort((a, b) => (b.score ?? 1) - (a.score ?? 1));
    const limitedSuggestions = suggestions.slice(0, searchTerm.limit);

    return limitedSuggestions.map((suggestion) => ({
      name: suggestion.item.name,
      description: suggestion.item.description,
      thumbnail_url: suggestion.item.thumbnail_url,
    }));
  }
}
