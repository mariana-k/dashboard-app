import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import React from 'react';

const ErrorComponent = () => {
    throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
    beforeEach(() => {
        // Suppress console error from React
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div>Test content</div>
            </ErrorBoundary>
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders error UI when child component throws', () => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('calls reload function when reload button is clicked', () => {
        const reloadSpy = jest.spyOn(window.location, 'reload');
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        const reloadButton = screen.getByText('Reload Page');
        fireEvent.click(reloadButton);

        expect(reloadSpy).toHaveBeenCalled();
    });
}); 