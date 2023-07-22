import { Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

function MovieCard({movieDetail}){
    const {name, rating, posterUrl, description, language, genre, casts, director, trailerUrl} = movieDetail;
    return (
        <Card className = "mx-3 my-3 bg-dark text-light border-dark" style={{ width: '18rem'}}>
            <Card.Img variant="top" style={{height: "25rem"}} src={posterUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item className="bg-dark text-light">{language}</ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">{rating}</ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">{casts}</ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">{genre}</ListGroup.Item>
                <ListGroup.Item className="bg-dark text-light">{director}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href={trailerUrl} className="text-light">Trailer</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default MovieCard;