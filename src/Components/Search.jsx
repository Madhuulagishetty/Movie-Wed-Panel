import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen p-4 md:p-10">
      <h1 className="text-4xl font-bold text-center text-white">
        Search Results for "{query}"
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="group relative overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "/placeholder.jpg"}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
                />
                <div className="absolute bottom-0 bg-black/70 w-full text-white p-2 text-center">
                  <h3 className="font-semibold truncate">{movie.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">No movies found.</p>
      )}
    </div>
  );
};

export default SearchResults;
