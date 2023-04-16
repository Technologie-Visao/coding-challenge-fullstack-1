import useAutoComplete from "../Hooks/UseAutoComplete"
import "./AutoComplete.css"


interface Props {
	data: string[]
    inputChangeHandler: (input: string) => void,
    minSearchInput: number,
    maxElementsDisplayed: number,
}

const Autocomplete = ({ data, inputChangeHandler, minSearchInput, maxElementsDisplayed }: Props) => {
	
    const { searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick } =
		useAutoComplete(data, inputChangeHandler, maxElementsDisplayed)

	return (
		<div className="autocomplete">
			<input
				placeholder='Search texture'
				value={searchedValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>

            {!suggestions.length && searchedValue.length && !selectedSuggestion.length ? (
                <div className="itemListNot">
                    <span>No result</span>
                </div>
            ) : (
                <div>
                    {searchedValue.length >= minSearchInput ?
                        suggestions.slice(0, maxElementsDisplayed).map((suggestion, index) => (
                            <div
                                key={index}
                                className={`itemList ${index === activeSuggestion - 1 ? "activeItem" : ""}`}
                                onClick={() => handleClick(suggestion)} 
                            >
                                <span>{suggestion}</span>
                            </div>
                        ))
                    : null
                    }
                </div>
            )}
		</div>
	)
}

export default Autocomplete