import React, { useState } from 'react';
import Axios from "axios";
import { useEffect } from 'react';
import {Navbar, Nav, Container, NavDropdown, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css'

const URL_PATH = "http://localhost:3030/"
class Item {
  name: string;
  description: string;
  thumbnail_url: string;
  constructor(name: string, description: string, thumbnail_url: string) {
    this.name = name;
    this.description = description;
    this.thumbnail_url = thumbnail_url;

  }

}
const AutocompleteComponent: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [Originalitems, setOriginalItems] = useState<Item[]>([]);
  const [itemNames, setItemNames] = useState<string[]>([]);
  const [showCards, setShowCards] = useState(true);
  const getSuggestions = async () => {
    const response = await Axios.get(URL_PATH + "items");

    const ans = response.data.map((e: Item) => e.name)

    setItems(response.data)
    setOriginalItems(response.data)
    setItemNames(ans)

  }

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setValue(value);
    if (value.length > 1) {
      const filtered = itemNames.filter((item) =>
        item.toLowerCase().startsWith(event.target.value.toLowerCase())
      );

      const groupFiltered = Originalitems.filter((item) =>
        item.name.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
      console.log(groupFiltered)
      setItems(groupFiltered)
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setItems(Originalitems);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
  };

 
  useEffect(() => {
    getSuggestions()
}, []);

const cardsPerRow = 5;

const groupedItems = items.reduce(
  (resultArray: Item[][], item: Item, index: number) => {
    const chunkIndex = Math.floor(index / cardsPerRow);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new row
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  },
  []
);
  return (
    <>
   <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Visao</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/elias-tamraz-7928a8172/">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    <div className="autocomplete">
      <input 
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search textures"
      />
      <ul className="suggestions">
        {suggestions.map((suggestion: string, index: number) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
    {/* this is done in case we want to hide trhe cards at the beginning */}
      {showCards && (
        <Row>
          {groupedItems.map((rowItems: Item[], index: number) => (
            <React.Fragment key={index}>
              {rowItems.map((item: Item) => (
                <Col key={item.name} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
                  <Card>
                    <Card.Img variant="top" src={item.thumbnail_url} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </React.Fragment>
          ))}
        </Row>
      )}
    </>
  );
};

export default AutocompleteComponent;
