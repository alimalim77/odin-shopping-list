import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";

const Todo = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
          />
          <Button variant="primary" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item key={index}>
            {todo}
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Todo;
