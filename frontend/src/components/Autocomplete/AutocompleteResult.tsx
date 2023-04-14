import { SuggestionResponse } from '../../components'


interface AutocompleteResultProps  {
    t: SuggestionResponse
    i: number
    currentListItem: number
    handleSelect: () => void
    setCurrentListItem: (n:number) => void
}


const AutocompleteResult = ({t, i, currentListItem, handleSelect, setCurrentListItem}: AutocompleteResultProps) => {

    
    // Limits description text to 100 characters
    const limitDescriptionText = (desc: string) => {
        if (desc.length < 100) return desc
        let reduced: string = desc.substring(0,97) +"..."
        return reduced
    }


    return (
        <li 
            key={`${t.name}-${i}`} 
            className={currentListItem == i ?"autocomplete-result selected":"autocomplete-result"} 
            data-testid={"autocomplete-result"}
            onClick={handleSelect} 
            onMouseOver={() =>setCurrentListItem(i)}>
            <img src={t.thumbnail_url}/>
            <div>
                <h4>{t.name}</h4>
                <p data-testid={"autocomplete-result-desc"}>{limitDescriptionText(t.description)}</p>
            </div>
        </li>
    )
}


export { AutocompleteResult };