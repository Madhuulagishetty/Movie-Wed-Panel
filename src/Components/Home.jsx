import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Home = ({ movies, loading }) => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-4 md:p-10">
      <header className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Movie Explorer
        </h1>
        <p className="text-gray-400 text-center mt-2 max-w-2xl mx-auto">
          Find your favorite movies and discover new ones.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 animate-fade-in">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div 
                key={movie.id} 
                className="group relative overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 hover:cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
                onMouseEnter={() => setSelectedMovie(movie.id)}
                onMouseLeave={() => setSelectedMovie(null)}
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                  <img
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750"}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <div className="p-4 bg-gray-800 bg-opacity-95">
                  <h2 className="text-white font-semibold text-lg truncate group-hover:text-purple-400 transition-colors duration-300">
                    {movie.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}
                  </p>
                </div>

                {/* Hover Details */}
                <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/90 to-black/70 flex flex-col justify-end p-4 transition-opacity duration-300 ${selectedMovie === movie.id ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                  <p className="text-gray-200 text-sm mt-1 line-clamp-3">{movie.overview}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-xl col-span-full">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Custom animation
const style = document.createElement('style');
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

export default Home;