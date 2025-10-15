import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import "./MovieCard.css";

export default function MovieCard({movie, onShowDetails, onAddToFavourites}) {
  const handleAddToFavourites = () => {
    onAddToFavourites(movie);
  };

  const handleShowDetails = () => {
    onShowDetails(movie);
  };

  return (
    <Card className="movie-card h-100">
      <Card.Img variant="top" src={movie.poster} className="card-img-top" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description}
        </Card.Text> 
        <div className="genre-info">
          <strong>Genre:</strong> {movie.genre}
        </div>   
        <div className="button-group">
          <Button className="btn-details" onClick={handleShowDetails}>
            Details
          </Button>
          <Button className="btn-favourite" onClick={handleAddToFavourites}>
            Add to Favourite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}      

