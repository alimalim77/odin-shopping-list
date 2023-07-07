import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Send form data to your backend or perform any desired actions
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    // Clear form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label>Message:</Form.Label>
        <Form.Control
          as="textarea"
          value={message}
          onChange={handleMessageChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
