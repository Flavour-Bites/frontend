import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the copyright notice', () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/© 2024 Flavour Bites/i);
    expect(copyrightElement).toBeInTheDocument();
  });
});
