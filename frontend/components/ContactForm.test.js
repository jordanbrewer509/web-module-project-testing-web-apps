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
    const firstNameInput = screen.getByText(/first name/i);
    
    userEvent.type(firstNameInput, 'Jane');
    const firstNameErrMsg = screen.getAllByText(/error/i);

    await waitFor(() => {
        expect(firstNameErrMsg).toHaveLength(1);
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    
    const submitBtn = screen.getByText(/submit/i)
    userEvent.click(submitBtn)

    const threeErrMsgs = screen.getAllByText(/error/i)

    await waitFor(() => {
        expect(threeErrMsgs).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByText(/first name/i);
    userEvent.type(firstNameInput, 'Jordan');
    const lastNameInput = screen.getByText(/last name/i);
    userEvent.type(lastNameInput, 'Brewer');

    const submitBtn = screen.getByText(/submit/i)
    userEvent.click(submitBtn);

    const errMsg = screen.getByText(/error/i);

    await waitFor(() => {
        expect(errMsg).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByText(/email/i);
    userEvent.type(emailInput, '1234');

    const errMsg = screen.getByText(/error/i);

    await waitFor(() => {
        expect(errMsg).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByText(/first name/i);
    const emailInput = screen.getByText(/email/i);
    userEvent.type(firstNameInput, 'Jordan');
    userEvent.type(emailInput, 'hello@world.com');
    const submitBtn = screen.getByText(/submit/i)
    userEvent.click(submitBtn);

    const errMsg = screen.getByText(/lastname is a required field/i)

    await waitFor(() => {
        expect(errMsg).toBeInTheDocument();
    })

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByText(/first name/i);
    const lastNameInput = screen.getByText(/last name/i);
    const emailInput = screen.getByText(/email/i);
    const submitBtn = screen.getByText(/submit/i);

    userEvent.type(firstNameInput, 'Hello');
    userEvent.type(lastNameInput, 'World');
    userEvent.type(emailInput, 'hello@world.com');
    
    userEvent.click(submitBtn);

    const submitMsg = screen.getByText(/you submitted/i);
    const firstNameRead = screen.getAllByText(/first name/i);
    const lastNameRead = screen.getAllByText(/last name/i);
    const emailRead = screen.getAllByText(/email/i);
    
    await waitFor(() => {
        expect(submitMsg).toBeInTheDocument();
        expect(firstNameRead).toHaveLength(2)
        expect(lastNameRead).toHaveLength(2)
        expect(emailRead).toHaveLength(2)
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByText(/first name/i);
    const lastNameInput = screen.getByText(/last name/i);
    const emailInput = screen.getByText(/email/i);
    const submitBtn = screen.getByText(/submit/i);

    userEvent.type(firstNameInput, 'Hello');
    userEvent.type(lastNameInput, 'World');
    userEvent.type(emailInput, 'hello@world.com');
    
    userEvent.click(submitBtn);

    const submitMsg = screen.getByText(/you submitted/i);
    const firstNameRead = screen.getAllByText(/first name/i);
    const lastNameRead = screen.getAllByText(/last name/i);
    const emailRead = screen.getAllByText(/email/i);
    
    await waitFor(() => {
        expect(submitMsg).toBeInTheDocument();
        expect(firstNameRead).toHaveLength(2)
        expect(lastNameRead).toHaveLength(2)
        expect(emailRead).toHaveLength(2)
    })
});
