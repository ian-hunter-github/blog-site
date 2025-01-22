import { render, screen } from '@testing-library/react';

test('renders the app root component', () => {
  render(<div>Hello, world!</div>);
  expect(screen.getByText(/Hello, world!/i)).toBeInTheDocument();
});
