import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, getProducts } from '../Features/ProductSlice';
import { Container, Row, Col, Button } from 'reactstrap';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from route params
  
  const products = useSelector((state) => state.product.products);
  const [product, setProduct] = useState(null); // Store specific product details

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // Fetch the product details when the component mounts
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts()); // Fetch products if not already in store
    } else {
      const selectedProduct = products.find((prod) => prod._id === id); // Find the product by ID
      if (selectedProduct) {
        setProduct(selectedProduct);
        setProductName(selectedProduct.productName);
        setCategory(selectedProduct.category);
        setPrice(selectedProduct.price);
        setImage(selectedProduct.image);
      }
    }
  }, [id, products, dispatch]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const productData = {
      _id: id,
      productName,
      category,
      price,
      image,
    };

    dispatch(updateProduct(productData));
    alert("Product Updated.");
    navigate("/ListProducts");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Container
      className="fluid"
      style={{
        maxWidth: '800px',
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 className="mb-4">Update Product</h2>
      <form onSubmit={handleUpdate}>
        <Row className="form-row">
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="form-control"
                required
              />
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group">
            <img 
            src={product.image} 
            alt={product.productName} 
            style={{ width: "200px", height: "auto" }} 
            />
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="form-control"
                required
              />
            </div>
          </Col>
        </Row>
        <Button
          type="submit"
          style={{ backgroundColor: '#4A5A3A', borderColor: '#4A5A3A' }}
        >
          Update Product
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProduct;
