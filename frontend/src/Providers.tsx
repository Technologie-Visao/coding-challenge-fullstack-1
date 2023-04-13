import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/app/store';

type Props = {
  children: React.ReactNode;
};

// define providers separately to be able to use it as a wrapper for tests
export default function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
