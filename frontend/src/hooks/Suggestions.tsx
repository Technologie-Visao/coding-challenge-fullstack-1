import { PropsWithChildren, createContext, useState } from 'react';

interface SuggestionContextType {
  suggestions: Array<Object>;
  changeSuggestions: (term: Array<Object>) => void;
}

export const SuggestionContext = createContext<SuggestionContextType>({
  suggestions: [],
  changeSuggestions: () => {},
});

export const SuggestionProvider = ({ children }: PropsWithChildren) => {
  const [suggestions, setSuggestions] = useState([] as Array<Object>);

  const changeSuggestions = (newSuggestions: Array<Object>) => {
    setSuggestions(newSuggestions);
  };

  return (
    <SuggestionContext.Provider value={{ suggestions, changeSuggestions }}>
      {children}
    </SuggestionContext.Provider>
  );
};
