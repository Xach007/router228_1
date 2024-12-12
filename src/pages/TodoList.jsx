import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleComplete = (index) => {
    setTodos(todos.map((todo, idx) => 
      idx === index ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, idx) => idx !== index));
  };

  const updateTodo = (index, text) => {
    setTodos(todos.map((todo, idx) => 
      idx === index ? { ...todo, text } : todo
    ));
  };

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <div className="input-container">
        <input 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <input 
              type="text" 
              value={todo.text}
              onChange={(e) => updateTodo(index, e.target.value)}
            />
            <button onClick={() => toggleComplete(index)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
