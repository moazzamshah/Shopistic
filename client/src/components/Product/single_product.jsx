import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Card, Col } from 'react-bootstrap';

function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:8000/api/items/' + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  /* const dispatch = useDispatch();
  console.log(props, "props");
  const {id} = useParams();
  useEffect(() => {
    dispatch(detailsProduct(id))

  }, [dispatch]);



  const productDetails = useSelector((state) => state.productDetails);
  console.log(productDetails.product, "product details"); */

  return (
    <>
      <Row className='col-10 mx-auto mt-5'>
        <Col lg={8} xl={5} sm={12}>
          <Card className='shadow p-3'>
            <Card.Title className='mb-5 text-center font-weight-bold'>{product.title}</Card.Title>
            <Card.Img src={product.picture} alt='product' />

            <Card.Body >
              <Card.Title>Category: {product.category}</Card.Title>
              <Card.Text>Description: {product.description}</Card.Text>
              <Card.Text className='price'>Price: ${product.price}</Card.Text>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SingleProduct;
