import React, { useState } from 'react';
import MovieCard from '../MovieCard.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {movies, allGenres} from '../../data/movie.js';
  
export default function MoviePage() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Movies ({filteredMovies.length})</h2>
        <Form.Select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ width: 'auto' }}
        >
          {allGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Form.Select>
      </div>
      
      <Row xs={1} md={2} lg={3} className="g-4"> 
        {filteredMovies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard 
              img={movie.poster}
              title={movie.title}
              text={movie.description} 
              genre={movie.genre} 
            />
          </Col>
        ))}
      </Row>  
      
      {filteredMovies.length === 0 && (
        <div className="text-center mt-5">
          <h4>No movies found for "{selectedGenre}" genre</h4>
        </div>
      )}
    </Container>
  );
}
