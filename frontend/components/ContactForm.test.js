import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText('Contact Form');
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const firstNameErrMsg = screen.getByLabelText(/error/i);
    userEvent.type(firstNameInput, 'Jane');

    await waitFor(() => {
        expect(firstNameErrMsg).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);

    userEvent.type(firstNameInput, 'A');
    userEvent.type(lastNameInput, 'B');
    userEvent.type(emailInput, 'C');

    fireEvent.keyDown(lastNameInput, {key: 'backspace'})

    const threeErrMsgs = screen.getAllByText(/error/i)

    await waitFor(() => {
        expect(threeErrMsgs).toHaveLength(2)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
