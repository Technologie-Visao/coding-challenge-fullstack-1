import {Texture} from "../Texture";

export type AutocompleteProps = {
  onSuggestionSelected: (suggestion: Texture) => void;
};
