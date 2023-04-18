import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App.jsx';

describe('App tests', () => {
    beforeEach(()=>{
        render(<App />)
    })
    it('should contain a table', () => {
        const table = screen.getByRole('table')
        expect(table).toBeInTheDocument()
    });
    it('should have headers in the table', () => {
        const tableHeaders = screen.getAllByRole('columnheader')
        expect(tableHeaders.length).toBe(4)
    });
    it('should have a button to add tasks, you idiot', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument() && expect(button.innerHTML).toBe('Add Item');
    });
    // it('should open a modal when button clicked', () => {
    //     const modal = screen.getByTestId('task-modal')
    //     expect(modal).toBeInTheDocument();
    // });
});