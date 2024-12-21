import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { deleteProduct, getProducts } from '../Features/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

const ListProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the products array specifically
  const { products, loading, error } = useSelector((state) => state.product);
  const handleUpdate = (id) => {
    // Navigate to the update product page with the product ID as a parameter
    navigate(`/UpdateProduct/${id}`);
  };

  useEffect(() => {
      dispatch(getProducts()); // Refetch products
    }, [ dispatch]);

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        dispatch(deleteProduct(id));
      }
    };
  if (loading) return
   <p>Loading...</p>;
  if (error) return
   <p>Error: {error}</p>;

  return (
    <Container className="my-5">
      <div className="p-4 border rounded shadow bg-light">
        <h2 className="text-center mb-4">List of Products</h2>
        <Row className="gy-4">
          {products.map((product) => (
            <Col key={product._id} md="4" sm="6" xs="12">
              <Card className="h-100 p-3">
              <CardImg  src={product.image} alt={product.productName} />
                <CardBody className="text-center">
                  <CardTitle tag="h5">{product.productName}</CardTitle>
                  <CardText>OMR {product.price.toFixed(3)}</CardText>
                  <CardText>{product.category}</CardText>
                  <div>
                  <Button color="success" className="me-2" onClick={() => handleUpdate(product._id)}>
                      Update
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(product._id)} >Delete</Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ListProducts;
