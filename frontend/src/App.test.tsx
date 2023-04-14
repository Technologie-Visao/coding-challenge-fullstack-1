import App from '~/App';
import { findByText, render, screen } from './tests/test-utils';

describe('App', () => {
  it('renders', async () => {
    render(<App />);
  });
});
