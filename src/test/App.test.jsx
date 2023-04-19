import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App.jsx';
import AddItem from '../components/AddItem.jsx';

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
});
describe('Modal', () => {
    beforeEach(()=>{
        render(<AddItem />)
        const addButton = screen.getByText('Add Item')
        addButton.click()
    })
    it('should contain a button', () => {
        const button = screen.getByText('x')
        expect(button).toBeInTheDocument()
    })
    it('should contain a form', () => {
        const form = screen.getByTestId('modalForm')
        expect(form).toBeInTheDocument()
    })
    it('should contain task input field', () => {
        const taskInput = screen.getByRole('textbox')
        expect(taskInput).toBeInTheDocument()
    })
    it('should contain datetime-local fields', () => {
        const inputFields = screen.getAllByRole('input')
        expect(inputFields.length).toBe(2) 
    })
    it('should show input labels', () => {
        const labels = screen.getAllByRole('label')
        expect(labels.length).toBe(3)
    })
})
