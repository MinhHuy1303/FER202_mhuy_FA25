// src/pages/HomePage.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeCarousel from "../home/HomeCarousel";
import MovieCard from "../MovieCard";
import { movies } from "../../data/movies";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      
      {/* Featured Movies Collections Section */}
      <Container className="mt-5 mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-2">Featured Movies Collections</h2>
          <p className="text-muted lead">
            Discover the latest blockbusters and timeless classics in our curated movie collection
          </p>
        </div>
        
        <Row className="g-4">
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} md={6} lg={4}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
