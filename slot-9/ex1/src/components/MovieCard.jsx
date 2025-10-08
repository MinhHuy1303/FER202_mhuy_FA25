// src/components/MovieCard.jsx
import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Rút gọn description
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Thêm vào favourites
  const addToFavourites = () => {
    let favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    
    // Kiểm tra xem movie đã có trong favourites chưa
    const isAlreadyFavourite = favourites.some(fav => fav.id === movie.id);
    
    if (!isAlreadyFavourite) {
      favourites.push(movie);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      setShowToast(true);
    } else {
      // Có thể hiển thị toast khác nếu đã có trong favourites
      setShowToast(true);
    }
  };

  return (
    <>
      <Card className="h-100 shadow-sm movie-card" style={{ transition: 'all 0.3s ease' }}>
        <div className="position-relative overflow-hidden" style={{ borderRadius: '12px 12px 0 0' }}>
          <Card.Img 
            variant="top" 
            src={movie.poster} 
            alt={`${movie.title} poster`}
            style={{ 
              height: '350px', 
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              transition: 'transform 0.3s ease'
            }}
            className="movie-poster"
          />
        </div>
        
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-bold text-dark mb-2" style={{ fontSize: '1.1rem' }}>
            {movie.title}
          </Card.Title>
          
          <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
            {truncateDescription(movie.description)}
          </Card.Text>
          
          <div className="movie-info mb-3">
            <div className="d-flex justify-content-between text-muted small mb-2">
              <span><strong>Year:</strong> {movie.year}</span>
              <span><strong>Duration:</strong> {movie.duration} min</span>
            </div>
            <div className="text-muted small mb-2">
              <strong>Country:</strong> {movie.country}
            </div>
            
            <div className="genres mb-3">
              {movie.genre.map((g, index) => (
                <Badge 
                  key={index} 
                  bg="primary" 
                  className="me-1 mb-1"
                  style={{ fontSize: '0.75rem' }}
                >
                  {g}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="d-flex gap-2 mt-auto">
            <Button 
              variant="outline-success" 
              size="sm" 
              className="flex-fill"
              onClick={addToFavourites}
            >
              <i className="bi bi-heart"></i> Add to Favourites
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-fill"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-eye"></i> View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h6>Full Description:</h6>
              <p className="text-muted">{movie.fullDescription}</p>
              
              <div className="row mb-3">
                <div className="col-6">
                  <strong>Year:</strong> {movie.year}
                </div>
                <div className="col-6">
                  <strong>Duration:</strong> {movie.duration} minutes
                </div>
                <div className="col-6">
                  <strong>Country:</strong> {movie.country}
                </div>
              </div>
              
              <div className="mb-3">
                <strong>Genres:</strong>
                <div className="mt-1">
                  {movie.genre.map((g, index) => (
                    <Badge key={index} bg="secondary" className="me-1">
                      {g}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <strong>Showtimes:</strong>
                <div className="mt-1">
                  {movie.showtimes.map((time, index) => (
                    <Badge key={index} bg="info" className="me-1">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={addToFavourites}>
            Add to Favourites
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Added to favourites!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <style jsx>{`
        .movie-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        
        .movie-poster:hover {
          transform: scale(1.05);
        }
        
        .movie-card {
          border: none;
          border-radius: 12px;
        }
        
        .movie-info {
          border-top: 1px solid #dee2e6;
          padding-top: 12px;
        }
      `}</style>
    </>
  );
};

export default MovieCard;
