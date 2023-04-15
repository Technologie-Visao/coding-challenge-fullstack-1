import App from '~/App';
import { render } from './tests/test-utils';

describe('App', () => {
  it('renders', async () => {
    render(<App />);
  });
});
