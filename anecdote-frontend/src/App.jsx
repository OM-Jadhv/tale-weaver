import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList';
import RandomAnecdote from './components/RandomAnecdote';
import SearchAnecdotes from './components/SearchAnecdotes';
import CreateAnecdote from './components/CreateAnecdote';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-7">
                  <div>
                    <Link to="/" className="flex items-center py-4 px-2">
                      <span className="font-semibold text-gray-500 dark:text-gray-300 text-lg">Anecdote App</span>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                  <Link to="/" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition duration-300">All Anecdotes</Link>
                  <Link to="/random" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition duration-300">Random</Link>
                  <Link to="/search" className="py-4 px-2 text-gray-500 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition duration-300">Search</Link>
                  <Link to="/create" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Create New</Link>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="py-2 px-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-400 transition duration-300"
                  >
                    {darkMode ? 'Light' : 'Dark'} Mode
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-6xl mx-auto mt-8 px-4">
            <Routes>
              <Route path="/" element={<AnecdoteList />} />
              <Route path="/random" element={<RandomAnecdote />} />
              <Route path="/search" element={<SearchAnecdotes />} />
              <Route path="/create" element={<CreateAnecdote />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
