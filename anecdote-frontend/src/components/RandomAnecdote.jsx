import { useState, useEffect } from 'react';
import axios from 'axios';

function RandomAnecdote() {
  const [anecdote, setAnecdote] = useState(null);

  const fetchRandomAnecdote = () => {
    axios.get('/api/anecdotes/random/')
      .then(response => setAnecdote(response.data))
      .catch(error => console.error('Error fetching random anecdote:', error));
  };

  useEffect(() => {
    fetchRandomAnecdote();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Random Anecdote</h1>
      {anecdote ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{anecdote.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{anecdote.content}</p>
          <div className="flex flex-wrap mb-4">
            {anecdote.tags.map(tag => (
              <span key={tag} className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      )}
      <button 
        onClick={fetchRandomAnecdote}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Another Random Anecdote
      </button>
    </div>
  );
}

export default RandomAnecdote;
