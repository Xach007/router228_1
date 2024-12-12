import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TodoList from './pages/TodoList';
import Notebook from './pages/Notebook';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/notebook" element={<Notebook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
