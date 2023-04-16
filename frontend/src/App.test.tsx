import App from '~/App';
import { render, screen } from './tests/test-utils';

describe('App', () => {
  it('renders', async () => {
    render(<App />);
    const logo = screen.getByRole('heading', { name: /textio/i });
    expect(logo).toBeInTheDocument();
  });
});
