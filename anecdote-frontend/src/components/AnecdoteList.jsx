import { useState, useEffect } from 'react';
import axios from 'axios';

function AnecdoteList() {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    axios.get('/api/anecdotes/')
      .then(response => setAnecdotes(response.data))
      .catch(error => console.error('Error fetching anecdotes:', error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">All Anecdotes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anecdotes.map(anecdote => (
          <div key={anecdote.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{anecdote.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{anecdote.content}</p>
            <div className="flex flex-wrap">
              {anecdote.tags.map(tag => (
                <span key={tag} className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnecdoteList;
