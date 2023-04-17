import React from 'react';
import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import Autocomplete from '../../../src/components/Autocomplete';
import {mockSuggestions} from "./__mocks__/constants/AutocompleteMockSuggestions";


const mockOnSuggestionSelected = jest.fn();
jest.mock('../../../src/hooks/textures/useFetchSuggestions', () => {
  return require('./__mocks__/hooks/useFetchSuggestions').default;
});


it('renders the component without crashing', () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  render(<Autocomplete onSuggestionSelected={mockOnSuggestionSelected} />);
});

test('initial state of the component', () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  render(<Autocomplete onSuggestionSelected={mockOnSuggestionSelected} />);
  const searchInput = screen.getByPlaceholderText('Search textures...');
  expect(searchInput).toHaveValue('');
});

test('suggestions are hidden initially', () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  render(<Autocomplete onSuggestionSelected={mockOnSuggestionSelected} />);
  const suggestions = screen.queryByTestId('suggestions');
  expect(suggestions).not.toBeInTheDocument();
});

test('suggestions are shown when search term length is >= 2', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockSuggestions));
  render(<Autocomplete onSuggestionSelected={mockOnSuggestionSelected} />);
  const searchInput = screen.getByPlaceholderText('Search textures...');
  fireEvent.change(searchInput, { target: { value: 'te' } });

  await waitFor(() => screen.getByTestId('suggestions'));

  const suggestions = screen.getByTestId('suggestions');
  expect(suggestions).toBeVisible();
});

test('suggestions are hidden when search term length is < 2', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockSuggestions));
  render(<Autocomplete onSuggestionSelected={mockOnSuggestionSelected} />);
  const searchInput = screen.getByPlaceholderText('Search textures...');
  fireEvent.change(searchInput, { target: { value: 't' } });
  const suggestions = screen.queryByTestId('suggestions');
  expect(suggestions).not.toBeInTheDocument();
});

test('displays "No suggestions found" message when no suggestion matches the search value', async () => {
  render(<Autocomplete onSuggestionSelected={mockOnSuggestionSelected} />);
  const searchInput = screen.getByPlaceholderText('Search textures...');
  fireEvent.change(searchInput, { target: { value: 'xyz' } });

  await waitFor(() => screen.getByTestId('suggestions'));

  const suggestionsList = screen.getByTestId('suggestions');
  expect(suggestionsList).toBeInTheDocument();

  const noSuggestionsMessage = await screen.findByText('No suggestions found');
  expect(noSuggestionsMessage).toBeInTheDocument();
});






