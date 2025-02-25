import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import TopRated from "./Components/TopRated";
import UpcomingMovies from "./Components/Upcoming";
import MovieDetail from "./Components/MovieDetail";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(""); // Fetch popular movies initially
  }, []);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      const { data } = await axios.get(url);
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Avoid broken state
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Navbar fetchMovies={fetchMovies} />
      <Routes>
        <Route path="/" element={<Home movies={movies} loading={loading} />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
