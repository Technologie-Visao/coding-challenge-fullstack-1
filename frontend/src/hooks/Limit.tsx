import { PropsWithChildren, createContext, useState } from 'react';

interface LimitContextType {
  limit: number;
  changeLimit: (limit: number) => void;
}

export const LimitContext = createContext<LimitContextType>({
  limit: 5,
  changeLimit: () => {},
});

export const LimitProvider = ({ children }: PropsWithChildren) => {
  const [limit, setLimit] = useState(5);

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
  };

  return (
    <LimitContext.Provider value={{ limit, changeLimit }}>
      {children}
    </LimitContext.Provider>
  );
};
