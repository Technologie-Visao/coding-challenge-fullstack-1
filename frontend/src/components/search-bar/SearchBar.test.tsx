import { getAllByRole, render, screen, userEvent } from '~/tests/test-utils';
import SearchBar from './SearchBar';
import { server } from '~/tests/mocks/server';
import { rest } from 'msw';
import config from '~/config/config';

function getSuggestions() {
  return screen.queryByRole('list', {
    name: /suggestions/i,
  });
}

describe('Searchbar', () => {
  test('The list of suggestions should NOT show when the input is less than two characters', async () => {
    render(<SearchBar />);
    const searchBar = screen.getByRole('textbox');
    expect(getSuggestions()).not.toBeInTheDocument();

    await userEvent.type(searchBar, 'a');
    expect(getSuggestions()).not.toBeInTheDocument();

    await userEvent.type(searchBar, 'u');
    expect(getSuggestions()).toBeInTheDocument();
  });

  test('Display a message when no suggestions are found', async () => {
    render(<SearchBar />);

    // runtime request handler
    server.use(
      rest.get(
        config.API_BASE_URL + '/textures/suggestions',
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        },
      ),
    );

    // type in search bar
    const searchBar = screen.getByRole('textbox');
    await userEvent.type(searchBar, 'test');

    // no results found
    expect(screen.getByText(/no suggestions found/i)).toBeInTheDocument();
  });
});
