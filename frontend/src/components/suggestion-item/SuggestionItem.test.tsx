import App from '~/App';
import { render, screen } from '~/tests/test-utils';
import SuggestionItem from './SuggestionItem';

describe('App', () => {
  it('renders name', async () => {
    render(
      <SuggestionItem
        suggestion={{
          name: 'Name',
          description: '',
          score: 1,
          thumbnail_url: '',
        }}
      />,
    );
    expect(screen.getByText(/name/i)).toBeDefined();
  });
});
