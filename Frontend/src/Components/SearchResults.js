// // src/pages/SearchResults.js
// import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function SearchResults() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get('q');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (query) {
//       setLoading(true);
//       axios.get(`${process.env.REACT_APP_API_URL}/TravelBuddy/destinations/search?q=${query}`)
//         .then(response => {
//           setResults(response.data);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error("Search error:", error);
//           setLoading(false);
//         });
//     }
//   }, [query]);

//   return (
//     <div className="container mt-5">
//       <h2>Search Results for "{query}"</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="row">
//           {results.map(destination => (
//             <div key={destination.id} className="col-md-4 mb-4">
//               {/* Render each destination card */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchResults;



// src/pages/SearchResults.js
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/TravelBuddy/destinations/search?q=${query}`
        );
        setResults(response.data);
      } catch (err) {
        console.error("Search error:", err);
        setError(err.response?.data?.message || "Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  if (!query) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">
          Please enter a search term
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Searching destinations...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : results.length === 0 ? (
        <Alert variant="info">
          No destinations found matching your search
        </Alert>
      ) : (
        <Row>
          {results.map(destination => (
            <Col key={destination.id} md={4} className="mb-4">
              <Card>
                <Card.Img 
                  variant="top" 
                  src={destination.imageUrl || 'https://via.placeholder.com/300x200'} 
                  alt={destination.name}
                />
                <Card.Body>
                  <Card.Title>{destination.name}</Card.Title>
                  <Card.Text>
                    {destination.description?.substring(0, 100)}...
                  </Card.Text>
                  <Link 
                    to={`/destinations/${destination.id}`} 
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default SearchResults;