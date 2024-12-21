import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams,useLocation  } from 'react-router-dom';
import { addToCart } from '../Features/CartSlice';
import { searchProductsByName } from '../Features/ProductSlice';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const Products = () => {
  const { category } = useParams(); 
  const { products, loading, error } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user); // Get logged-in user
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search); 
    const query = params.get('query');
    if (query) {
      dispatch(searchProductsByName(query));
    }
  }, [location.search, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (!user?.email) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const cartData = {
      userEmail: user.email,
      productId: product._id,
      productName: product.productName,
      price: product.price,
    };
    console.log(cartData);

    dispatch(addToCart(cartData));
    navigate('/cart');
  };


  

  return (
    <Container className="my-5">
      <h2>
        <button style={{ backgroundColor: '#4A5A3A', color: 'white' }} onClick={() => navigate(-1)}>
          ←
        </button> 
        {category} Products
      </h2>
      <div className="row">
        {products.map((product) => (
          <Col key={product._id} md="4" sm="6" xs="12">
          <Card className="h-100 p-3">
            <CardImg src={`http://localhost:3001/${product.image}`}></CardImg>
            <CardBody>
                  <CardTitle tag="h5">{product.productName}</CardTitle>
                  <CardText>Price: OMR{product.price.toFixed(3)}</CardText>
                  <CardText>{product.category}</CardText>
                <Button
                  className="btn btn-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardBody>
          </Card>
          </Col>
        ))}
      </div>
    </Container>
  );
};

export default Products;
