import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ fetchMovies }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle search input change
  const handleSearch = (e) => {
    setQuery(e.target.value);
    fetchMovies(e.target.value); // Fetch movies dynamically
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">MovieDb</Link>

      {/* Hamburger Icon for Mobile */}
      <button className="text-white text-2xl md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4 text-white items-center">
        <Link to="/" className="hover:underline">Popular</Link>
        <Link to="/top-rated" className="hover:underline">Top Rated</Link>
        <Link to="/upcoming" className="hover:underline">Upcoming</Link>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search Movies..."
          className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        />
      </div>
    </nav>
  );
};

export default Navbar;
