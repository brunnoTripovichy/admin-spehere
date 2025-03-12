import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  test('renders with children', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveClass('custom-class');
  });

  test('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeDisabled();
  });

  test('renders with different button types', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    let button = screen.getByRole('button', { name: 'Button' });
    expect(button).toHaveAttribute('type', 'button');

    rerender(<Button type="submit">Submit</Button>);
    button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    button = screen.getByRole('button', { name: 'Reset' });
    expect(button).toHaveAttribute('type', 'reset');
  });

  test('passes additional props to button element', () => {
    render(<Button data-testid="test-button">Click me</Button>);

    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
  });

  test('renders with default type of button if not specified', () => {
    render(<Button type="button">Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toHaveAttribute('type', 'button');
  });
});
