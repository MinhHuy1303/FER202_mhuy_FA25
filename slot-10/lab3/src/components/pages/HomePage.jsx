// src/pages/HomePage.jsx
import React, { useState, useMemo } from "react";
import NavBar from "../NavBar.jsx";
import HomeCarousel from "../../home/HomeCarousel";
import Filter from "../Filter.jsx";
import MovieCard from "../MovieCard.jsx";
import MovieDetailsModal from "../MovieDetailsModal.jsx";
import FavouriteToast from "../FavouriteToast.jsx";
import { Container, Row, Col } from 'react-bootstrap';
import { movies } from '../../data/movie.js';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMovieTitle, setToastMovieTitle] = useState('');

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by year
    if (yearFilter !== 'all') {
      switch (yearFilter) {
        case '<=2000':
          result = result.filter(movie => movie.year <= 2000);
          break;
        case '2001-2015':
          result = result.filter(movie => movie.year >= 2001 && movie.year <= 2015);
          break;
        case '>2015':
          result = result.filter(movie => movie.year > 2015);
          break;
        default:
          break;
      }
    }
    
    // Sort movies
    if (sortBy !== 'none') {
      switch (sortBy) {
        case 'year-asc':
          result.sort((a, b) => a.year - b.year);
          break;
        case 'year-desc':
          result.sort((a, b) => b.year - a.year);
          break;
        case 'title-asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-desc':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'duration-asc':
          result.sort((a, b) => a.duration - b.duration);
          break;
        case 'duration-desc':
          result.sort((a, b) => b.duration - a.duration);
          break;
        default:
          break;
      }
    }
    
    return result;
  }, [searchTerm, yearFilter, sortBy]);

  // Handle showing movie details
  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Handle adding movie to favourites
  const handleAddToFavourites = (movie) => {
    // Get existing favourites from localStorage
    const existingFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    
    // Check if movie is already in favourites
    const isAlreadyFavourite = existingFavourites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavourite) {
      // Add movie to favourites
      const updatedFavourites = [...existingFavourites, movie];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      
      // Show toast notification
      setToastMovieTitle(movie.title);
      setShowToast(true);
    } else {
      // Movie is already in favourites
      setToastMovieTitle(`${movie.title} is already in favourites`);
      setShowToast(true);
    }
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  // Handle closing toast
  const handleCloseToast = () => {
    setShowToast(false);
    setToastMovieTitle('');
  };

  return (
    <div>
      <NavBar />
      <HomeCarousel />
      
      <Container className="my-4">
        <div className="mb-4">
          <h2>Featured Movies Collections ({filteredAndSortedMovies.length})</h2>
          <p className="text-secondary">
            Discover and explore our amazing movie collection
          </p>
        </div>
        
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredAndSortedMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard 
                movie={movie}
                onShowDetails={handleShowDetails}
                onAddToFavourites={handleAddToFavourites}
              />
            </Col>
          ))}
        </Row>
        
        {filteredAndSortedMovies.length === 0 && (
          <div className="text-center mt-5">
            <h4>No movies found with current filters</h4>
            <p className="text-muted">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </Container>
      
      {/* Movie Details Modal */}
      <MovieDetailsModal 
        show={showModal}
        onHide={handleCloseModal}
        movie={selectedMovie}
      />
      
      {/* Favourite Toast Notification */}
      <FavouriteToast 
        show={showToast}
        onClose={handleCloseToast}
        movieTitle={toastMovieTitle}
      />
    </div>
  );
}
