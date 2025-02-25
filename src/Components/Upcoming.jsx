import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743"; // Replace with your API key
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Fetch Upcoming Movies
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data.results || []);
    } catch (err) {
      setError("Failed to load movies. Please try again.");
      console.error("Error fetching upcoming movies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-6 md:p-10">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Upcoming Movies
        </h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Get a sneak peek at the most anticipated films coming soon to theaters.
        </p>
      </header>

      {/* Loading & Error Handling */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
              onMouseEnter={() => setSelectedMovie(movie.id)}
              onMouseLeave={() => setSelectedMovie(null)}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
                  loading="lazy"
                />

                {/* Release Date Badge */}
                <div className="absolute top-2 left-2 bg-purple-600/90 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {new Date(movie.release_date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4 bg-gray-800 bg-opacity-95">
                <h2 className="text-white font-semibold text-lg truncate group-hover:text-purple-400 transition-colors duration-300">
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Coming {new Date(movie.release_date).toLocaleDateString(undefined, { year: "numeric" })}
                </p>
              </div>

              {/* Hover Details */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-purple-900/90 to-black/70 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                  selectedMovie === movie.id ? "opacity-100" : "opacity-0"
                } pointer-events-none`}
              >
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                <p className="text-gray-200 text-sm mt-1 line-clamp-3">{movie.overview}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium transition">
                    Add to Watchlist
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm font-medium transition">
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default UpcomingMovies;
