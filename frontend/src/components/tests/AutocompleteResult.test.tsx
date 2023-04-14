import { render, screen } from '@testing-library/react';
import { AutocompleteResult, SuggestionResponse } from '../../components';
import '@testing-library/jest-dom'

let texture: SuggestionResponse = {
    name: "Grass",
    description: "Green grass, very long.",
    thumbnail_url : "localhost"
}


describe('Autocomplete component', () => {


    it("Renders component", async () => {
        
        render(
            <AutocompleteResult t={texture} i={0} currentListItem={0} handleSelect={() => null} setCurrentListItem={() =>null}/>
        );
        const component = screen.queryByTestId("autocomplete-result");
        expect(component).toBeInTheDocument();
    })

    it("Add Selected class if is current list item", async () => {
        render(
            <AutocompleteResult t={texture} i={0} currentListItem={0} handleSelect={() => null} setCurrentListItem={() =>null}/>
        );
        const component = screen.queryByTestId("autocomplete-result");
        expect(component).toHaveClass("selected")
    })
  
    it("No selected class if not current list item", async () => {
        render(
            <AutocompleteResult t={texture} i={0} currentListItem={1} handleSelect={() => null} setCurrentListItem={() =>null}/>
        );
        const component = screen.queryByTestId("autocomplete-result");
        expect(component).not.toHaveClass("selected")
    })

    it("Texture description length max 100", async () => {
        let texture_long_desc: SuggestionResponse = {
            name: "Grass",
            description: "Realistic tiled surface, made with shattered tiles ,Nigerian style , different size tiles , random orientation and pattern, red blue colors , , variable shapes with well defined edges , closely packed , polished , ceramic",
            thumbnail_url : "localhost"
        }
        render(
            <AutocompleteResult t={texture_long_desc} i={0} currentListItem={1} handleSelect={() => null} setCurrentListItem={() =>null}/>
        );
        const component = screen.queryByTestId("autocomplete-result-desc");
        expect(component?.textContent?.length).toBeLessThanOrEqual(100)
    })


})