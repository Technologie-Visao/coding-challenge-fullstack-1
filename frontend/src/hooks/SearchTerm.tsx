import { PropsWithChildren, createContext, useState } from 'react';

interface SearchTermContextType {
  term: string;
  changeTerm: (term: string) => void;
}

export const SearchTermContext = createContext<SearchTermContextType>({
  term: '',
  changeTerm: () => {},
});

export const SearchTermProvider = ({ children }: PropsWithChildren) => {
  const [term, setTerm] = useState('');

  const changeTerm = (newTerm: string) => {
    setTerm(newTerm);
  };

  return (
    <SearchTermContext.Provider value={{ term, changeTerm }}>
      {children}
    </SearchTermContext.Provider>
  );
};
