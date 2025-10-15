import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import './MovieDetailsModal.css';

export default function MovieDetailsModal({ show, onHide, movie }) {
  if (!movie) return null;

  // Mock showtimes data
  const showtimes = [
    { time: '10:00 AM', theater: 'Cinema 1' },
    { time: '1:00 PM', theater: 'Cinema 2' },
    { time: '4:00 PM', theater: 'Cinema 1' },
    { time: '7:00 PM', theater: 'Cinema 3' },
    { time: '10:00 PM', theater: 'Cinema 2' }
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="img-fluid rounded"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <div className="movie-details">
              <h5>Movie Information</h5>
              <p><strong>Genre:</strong> <Badge bg="primary">{movie.genre}</Badge></p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Country:</strong> {movie.country}</p>
              <p><strong>Duration:</strong> {movie.duration} minutes</p>
              
              <h5 className="mt-4">Full Description</h5>
              <p>{movie.description}</p>
              
              <h5 className="mt-4">Showtimes Today</h5>
              <Row>
                {showtimes.map((showtime, index) => (
                  <Col xs={6} md={4} key={index} className="mb-2">
                    <div className="showtime-card p-2 border rounded text-center">
                      <div className="fw-bold">{showtime.time}</div>
                      <small className="text-muted">{showtime.theater}</small>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">
          Book Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}