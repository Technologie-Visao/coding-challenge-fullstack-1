import { SetStateAction, useState } from "react"


const useAutocomplete = (data: string[], 
                         inputChangeHandler: (input: string) => void,
                         maxElementsDisplayed: number,
                         ) => {
	const [searchedValue, setSearchedValue] = useState("")
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [selectedSuggestion, setSelectedSuggestion] = useState("")
	const [activeSuggestion, setActiveSuggestion] = useState(0)

	const handleChange = (event: { target: { value: SetStateAction<string> } }): void => {
		if (event.target.value !== "") {
			const filteredSuggestions = data.filter(itemData => {
				const value = event.target.value.toString().toUpperCase()
				const name = itemData.toUpperCase()
				return name.includes(value)
			})
			setSearchedValue(event.target.value)
			setSuggestions(filteredSuggestions)
            inputChangeHandler(event.target.value.toString())

		} else {
			setSearchedValue("")
			setSuggestions([])
			setSelectedSuggestion("")
			setActiveSuggestion(0)
            inputChangeHandler("___")

		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "ArrowDown" && 
            activeSuggestion < suggestions.length && 
            activeSuggestion < maxElementsDisplayed) {
			setActiveSuggestion(activeSuggestion + 1)
		} else if (event.key === "ArrowUp" && activeSuggestion > 1) {
			setActiveSuggestion(activeSuggestion - 1)
		} else if (event.key === "Enter") {
            if(activeSuggestion > 0){
                setSearchedValue(suggestions[activeSuggestion - 1])
                setSelectedSuggestion(suggestions[activeSuggestion - 1])
                inputChangeHandler(suggestions[activeSuggestion - 1])
                setSuggestions([])
                setActiveSuggestion(0)
            }
            else if(activeSuggestion == 0 && suggestions.length > 0){
                setSearchedValue(suggestions[0])
                setSelectedSuggestion(suggestions[0])
                inputChangeHandler(suggestions[0])
                setSuggestions([])
                setActiveSuggestion(0)
            }
			
		}
	}

	const handleClick = (value: string) => {
		setSearchedValue(value)
		setSuggestions([])
		setSelectedSuggestion(value)
		setActiveSuggestion(0)
        inputChangeHandler(value)
	}

	return { searchedValue, suggestions, selectedSuggestion, activeSuggestion, handleChange, handleKeyDown, handleClick }
}

export default useAutocomplete