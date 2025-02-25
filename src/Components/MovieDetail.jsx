import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // Fetch movie details
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));

    // Fetch cast details
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error("Error fetching cast:", error));
  }, [id]);

  if (!movie) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Movie Details */}
      <div className="flex flex-col lg:flex-row items-center bg-gray-800 p-6 rounded-lg">
        <img 
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
          alt={movie.title} 
          className="rounded-lg shadow-lg w-64 sm:w-80"
        />
        <div className="lg:ml-6 mt-6 lg:mt-0 text-center lg:text-left">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-yellow-400 text-lg mt-2">⭐ {movie.vote_average}</p>
          <p className="text-gray-400">{movie.runtime} min | {movie.genres.map(g => g.name).join(", ")}</p>
          <p className="text-gray-400">📅 {movie.release_date}</p>
          <h2 className="mt-4 text-xl font-semibold">Overview</h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2">{movie.overview}</p>
        </div>
      </div>

      {/* Cast Section */}
      <h2 className="mt-8 text-2xl font-bold text-center lg:text-left">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {cast.slice(0, 10).map(actor => (
          <div key={actor.id} className="text-center">
            <img 
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/200"} 
              alt={actor.name} 
              className="rounded-lg w-24 sm:w-32 h-24 sm:h-32 object-cover mx-auto"
            />
            <p className="mt-2 text-xs sm:text-sm">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
