import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchAnecdotes() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
  // Fetch all unique tags
  axios.get('/api/anecdotes/all_tags/')
    .then(response => setTags(response.data))
    .catch(error => console.error('Error fetching tags:', error));
}, []);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearch = () => {
    axios.get(`/api/anecdotes/search_by_tags/?tags=${selectedTags.join(',')}`)
      .then(response => setResults(response.data))
      .catch(error => console.error('Error searching anecdotes:', error));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Search Anecdotes by Tags</h1>
      <div className="mb-6">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`m-1 px-3 py-1 rounded-full ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <button 
        onClick={handleSearch}
        className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(anecdote => (
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

export default SearchAnecdotes;
