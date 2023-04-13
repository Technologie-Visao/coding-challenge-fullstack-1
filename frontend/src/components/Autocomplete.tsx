import { ChangeEvent, useState, useEffect, useRef } from "react";
import "./css/Autocomplete.css";
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

    useEffect(()=> {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown])


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setQuery(e.target.value)
        getSuggestions(e.target.value, limit)
    }

    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setLimit(parseInt(e.target.value))
        getSuggestions(query, parseInt(e.target.value))
    }

    const handleClear = () => {
        setQuery("");
        setHide(true);
    }

    const handleSelect = () => {
        console.log(`You Selected: ${textures[currentListItem].name}`)
    }

    const getSuggestions = async (q: string, l: number) => {
        if (q.length<2){
            setTextures([])
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
            setTextures(response.data)
            setLoading(false)
            setHide(false);
        }
        catch {
            setLoading(false)
        }
      };


    return (
            <div id="autocomplete-cont">

                <div id="autocomplete-search">
                    <div style={{textAlign: "center"}}>
                        <i className={loading ? "fa-solid fa-spinner fa-spin":"fa-solid fa-magnifying-glass"}/>
                        <span style={{display: "block", fontSize: "10px"}}>{loading ?"loading":"textures"}</span>
                    </div>
                    <input autoFocus type="text" value={query} onChange={e => handleInputChange(e)} placeholder="Search for textures"/>
                    <p style={{visibility: query.length> 0? "visible":"hidden"}} onClick={handleClear}>Clear</p>
                    <div className="settings-dropdown">
                        <i className="fa-solid fa-gear"/>
                        <div className="settings-dropdown-content">
                            <p># of suggestions: {limit}</p>
                            <input type="range" defaultValue={limit} min={1} max={25} onChange={e => handleLimitChange(e)}/>
                        </div>
                    </div>
                </div>



                {textures.length > 0 ?
                    <ul id="autocomplete-results" className={(textures.length > 0 && !hide) ? "not-empty":""}>
                        {textures.length > 0 && textures.map((t, i) =>
                            <li key={`${t.name}-${i}`} className={currentListItem == i ?"autocomplete-result selected":"autocomplete-result"} onClick={handleSelect} onMouseOver={() =>setCurrentListItem(i)}>
                                <img src={t.thumbnail_url}/>
                                <div style={{flex: 1}}>
                                    <h4>{t.name}</h4>
                                    <p>{t.description}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                    : 
                    <>{(query.length>1 && !loading) && <p>No suggestions found.</p>}</>
                }
                

                
            </div>
    )
}

export { Autocomplete }
