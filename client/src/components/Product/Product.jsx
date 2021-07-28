import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

function Product(props) {
  let { product } = props;
  return (
    <Container>
      <Card
        className='my-3 p-2 rounded py-3 '
      >
        <Link to={`/product/${product._id}`}>
          <Row>
            <Col>
              <Card.Img
              // sizes='(maxWidth: 600px), 480px, 800px'
                style={{ height: '400px', objectFit:'cover' }}
                variant='top'
                src={`http://localhost:8000/${product.picture}`}
              />
            </Col>
          </Row>
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>{product.title}</Card.Title>
          </Link>
          <Card.Text>{product.description}</Card.Text>
          <Card.Title className='price'>${product.price}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Product;
