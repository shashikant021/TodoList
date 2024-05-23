

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const savedTodos = JSON.parse(todoString);
        setTodos(savedTodos);
      } catch (error) {
        console.error("Failed to parse todos from localStorage", error);
        setTodos([]);
      }
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isComplete: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-full">
        <div className="addTodo my-6">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-80' />
          <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>
            Add
          </button>
        </div>
        
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos display-flex">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => (
            <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplete} />
              <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id); }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                  Edit
                </button>
                <button onClick={(e) => { handleDelete(e, item.id); }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
