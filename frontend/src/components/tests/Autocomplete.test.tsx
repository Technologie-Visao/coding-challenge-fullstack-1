import { render, screen } from '@testing-library/react';
import { Autocomplete } from '../../components';
import '@testing-library/jest-dom'


describe('Autocomplete component', () => {

    beforeEach(() => {
      render(
        <Autocomplete />
      );
    })

  
    it("renders component", async () => {
        const component = screen.queryByTestId("autocomplete-cont");
        expect(component).toBeInTheDocument();
    })

    it("renders search bar", async () => {
      const searchBar = screen.queryByTestId("autocomplete-search");
      expect(searchBar).toBeInTheDocument();
    })

    it("renders search bar icon", async () => {
      const searchBarIcon = screen.queryByTestId("autocomplete-search")?.firstChild?.firstChild
      expect(searchBarIcon).toHaveClass("fa-solid")
    })

    it("renders search bar input", async () => {
      const searchBarInput = screen.getByPlaceholderText('Search for textures')
      expect(searchBarInput).toBeInTheDocument()
    })

    it("search results empty to begin", async () => {
      const searchResults = screen.queryByTestId("autocomplete-results");
      expect(searchResults).toBeInTheDocument();
      expect(searchResults?.hasChildNodes()).toBeFalsy();
    })


})