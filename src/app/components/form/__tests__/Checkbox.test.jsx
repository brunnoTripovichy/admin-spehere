import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';
describe('Checkbox Component', () => {
    test('renders checkbox with label', () => {
        render(<Checkbox label="Remember me"/>);
        const checkbox = screen.getByRole('checkbox');
        const label = screen.getByText('Remember me');
        expect(checkbox).toBeInTheDocument();
        expect(label).toBeInTheDocument();
    });
    test('handles onChange event', () => {
        const handleChange = jest.fn();
        render(<Checkbox label="Remember me" onChange={handleChange}/>);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
    test('displays error message when provided', () => {
        render(<Checkbox label="Remember me" error="This field is required"/>);
        const errorMessage = screen.getByText('This field is required');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass('text-red-500');
    });
    test('displays helper text when provided and no error', () => {
        render(<Checkbox label="Remember me" helperText="Optional field"/>);
        const helperText = screen.getByText('Optional field');
        expect(helperText).toBeInTheDocument();
        expect(helperText).toHaveClass('text-gray-500');
    });
    test('prioritizes error over helper text', () => {
        render(<Checkbox label="Remember me" error="This field is required" helperText="Optional field"/>);
        const errorMessage = screen.getByText('This field is required');
        expect(errorMessage).toBeInTheDocument();
        expect(screen.queryByText('Optional field')).not.toBeInTheDocument();
    });
    test('applies custom className', () => {
        var _a;
        render(<Checkbox label="Remember me" className="custom-class"/>);
        const checkboxContainer = (_a = screen
            .getByRole('checkbox')
            .closest('div')) === null || _a === void 0 ? void 0 : _a.parentElement;
        expect(checkboxContainer).toHaveClass('custom-class');
    });
    test('passes additional props to input element', () => {
        render(<Checkbox label="Remember me" data-testid="test-checkbox"/>);
        const checkbox = screen.getByTestId('test-checkbox');
        expect(checkbox).toBeInTheDocument();
    });
    test('uses provided id or generates one if not provided', () => {
        const { rerender } = render(<Checkbox label="Remember me" id="custom-id"/>);
        let checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('id', 'custom-id');
        rerender(<Checkbox label="Remember me"/>);
        checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('id');
        expect(checkbox.id).toMatch(/checkbox-/);
    });
});
