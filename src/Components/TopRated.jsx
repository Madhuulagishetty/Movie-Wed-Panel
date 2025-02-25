import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

const API_KEY = "c45a857c193f6302f2b5061c3b85e743"; 
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-4 md:p-10">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Top-Rated Movies
        </h1>
        <p className="text-gray-400 text-center mt-2 max-w-2xl mx-auto">
          Explore the highest-rated films of all time, acclaimed by critics and audiences worldwide
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}> 
              <div 
                className="group relative overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 hover:cursor-pointer"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-gray-800 bg-opacity-95">
                  <h2 className="text-white font-semibold text-lg truncate group-hover:text-purple-400 transition-colors duration-300">
                    {movie.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopRated;
