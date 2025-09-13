import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import { useState, useEffect } from 'react'
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { updateSeacrhCounts } from './appwrite.js';

const API_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const[searchTerm, setSearchTerm] = useState('');

  const[errorMessage, setErrorMessage] = useState('');

  const[moviesList, setMoviesList] = useState([]);

  const[loading, setLoading] = useState(false);

  const[debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.response === 'False') {
        setErrorMessage(data.error || 'Failed to fetch movies. Please try again later.');
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSeacrhCounts(query, data.results[0]);
    }
    } catch(err) {
      console.error('Error fetching : ${err}');
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern"/>


      <div className = "wrapper">
        <header>
          <img src="./hero-img.png" alt = "Hero Banner"/>

          <h1>Find <span className='text-gradient'>movies</span> you enjoy</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2 className='mt-[40px]'>All movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-white'>{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
