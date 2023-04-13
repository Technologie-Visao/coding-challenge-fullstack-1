import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextureCard from '../TextureCard';
import { Suggestion } from '../../services/textureService';

describe('TextureCard', () => {
  it('renders TextureCard', () => {
    // Create a mock texture object
    const mockTexture: Suggestion = {
      name: 'Wood',
      description: 'A wooden texture',
      thumbnail_url: 'https://example.com/wood.jpg',
    };

    // Create a mock function for onCardRemoved
    const mockOnCardRemoved = vi.fn();

    // Pass the mock texture object and mock function as props to TextureCard
    render(
      <TextureCard texture={mockTexture} onCardRemoved={mockOnCardRemoved} />,
    );

    // Check if the elements with the correct data are rendered
    const titleElement = screen.getByText('Wood');
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText('A wooden texture');
    expect(descriptionElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('Wood');
    expect(imageElement).toHaveAttribute('src', 'https://example.com/wood.jpg');
  });
});
