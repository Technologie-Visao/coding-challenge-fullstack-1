import { ChangeEvent, useState, useEffect } from "react";
import { AutocompleteResult } from '../Autocomplete/AutocompleteResult';
import "../css/Autocomplete.css";
import axios from 'axios';


type SuggestionResponse = {
    name: string
    description: string
    thumbnail_url: string
}


const Autocomplete = () => {

    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(false);
    const [currentListItem, setCurrentListItem] = useState(-1);
    const [textures, setTextures] = useState<Array<SuggestionResponse>>([]);

    // Method to handle Keyboard events (up, down, enter) for list selection
    const handleKeyDown = (event : KeyboardEvent) => {
        let selected = null
        if (event.key === 'ArrowDown' && currentListItem < limit-1) {
            setCurrentListItem(prev => prev+1)
            selected = document.querySelector(".autocomplete-result.selected")?.nextElementSibling;
        }
        else if (event.key === 'ArrowUp' && currentListItem > 0) {
            setCurrentListItem(prev => prev-1)
            selected = document.querySelector(".autocomplete-result.selected")?.previousElementSibling;
        }
        else if (event.key === 'Enter' && currentListItem != -1) {
            handleSelect();
        }
        if (selected) {
            selected?.scrollIntoView({
                behavior: "auto",
            });
        }
    }

    // Add & cleanup of event listeners for key presses
    useEffect(()=> {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown])

    // Method to handle search query change 
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setQuery(e.target.value)
        fetchSuggestions(e.target.value, limit)
    }

    // Method to handle result limit change
    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setLimit(parseInt(e.target.value))
        fetchSuggestions(query, parseInt(e.target.value))
    }

    // Method to clear search query - will also hide previous results
    /// Reason for setHide: Closing animation wont work if we remove search results, instead hide them.
    const handleClear = () => {
        setQuery("");
        setHide(true);
    }

    // Method to handle mouse click or keyboard (enter) on list item
    const handleSelect = () => {
        let selected = document.querySelector(".autocomplete-result.selected")
        selected?.classList.add("active");
        setTimeout(()=> {
            selected?.classList.remove("active");
        }, 100)
        console.log(`You Selected: ${textures[currentListItem].name}`)
    }

    // Fetch suggestions from API using query string and result limit
    const fetchSuggestions = async (q: string, l: number) => {
        if (q.length<2){
            setHide(true)
            setLoading(false)
            return
        }
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
                };
            const response = await axios.get(`http://127.0.0.1:5000/textures/suggestions?search=${q}&limit=${l}`, config);

            // ***** ADDED DELAY TO SHOWCASE LOADING ICON - REMOVE FOR PROD *****
            setTimeout(()=> {
                setTextures(response.data)
                setLoading(false)
                setHide(false);
                setCurrentListItem(-1)
            }, 300)
            // *****
        }
        catch {
            setLoading(false)
        }
    };


    return (
        <div id="autocomplete-cont" data-testid={"autocomplete-cont"}>

            {/* Search bar and limit settings */}
            <div id="autocomplete-search" data-testid={"autocomplete-search"}>
                <div>
                    <i className={loading ? "fa-solid fa-spinner fa-spin":"fa-solid fa-magnifying-glass"}/>
                    <span>{loading ?"loading":"textures"}</span>
                </div>
                <input autoFocus type="text" value={query} onChange={e => handleInputChange(e)} placeholder="Search for textures"/>
                <p style={{visibility: query.length> 0? "visible":"hidden"}} onClick={handleClear}>Clear</p>
                <div className="settings-dropdown">
                    <i className="fa-solid fa-gear"/>
                    <div className="settings-dropdown-content">
                        <p data-testid={"autocomplete-limit"}># of suggestions: {limit}</p>
                        <input type="range" defaultValue={limit} min={1} max={25} onChange={e => handleLimitChange(e)}/>
                    </div>
                </div>
            </div>

            {/* Search results */}
            <ul data-testid={"autocomplete-results"} id="autocomplete-results" className={(textures.length > 0 && !hide) ? "not-empty":"empty"}>
                {textures.length > 0 && textures.map((t, i) =>
                    <AutocompleteResult 
                        key={`${t.name}-${i}`} 
                        t={t}
                        i={i}
                        currentListItem={currentListItem}
                        handleSelect={handleSelect}
                        setCurrentListItem={setCurrentListItem}
                    />
                )}
            </ul>
            
            {/* Message if no results found */}
            <>{(textures.length == 0 && query.length>1 && !loading) && <p id="autocomplete-no-results">No suggestions found</p>}</>
            
        </div>
    )
}

export { Autocomplete }
export type { SuggestionResponse }
