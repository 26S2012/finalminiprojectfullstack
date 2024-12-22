import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { Container, Row, Col, Button,Spinner } from 'reactstrap';
import { addProduct } from '../Features/ProductSlice';
import { ProductsSchemaValidation } from '../Validations/ProductsValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, msg } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { register, handleSubmit, formState:
    { errors }, reset } = useForm({
   resolver: yupResolver(ProductsSchemaValidation),
 });
  useEffect(() => {
    if (isSuccess) {
      alert('Product added successfully!');
      reset(); // Reset the form
      setImage(null); // Reset the image state
    }
    if (isError) alert(`Error: ${msg}`);
  }, [isSuccess, isError, msg, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", image); // Append the file
  
    console.log("Sending Data:", formData);
    dispatch(addProduct(formData));
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <Container
      className="fluid"
      style={{
        maxWidth: '800px',
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
       
      <h2 className="mb-4"><button style={{ backgroundColor: '#4A5A3A', color: 'white' }} onClick={() => navigate(-1)}>
          ←
        </button>Owner</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-row">
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
        
                {...register('productName')}
                placeholder="Enter product name"
                className="form-control"
              />
              <p className="error-text">{errors.productName?.message}</p>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                placeholder="category"
                
                {...register('category')}
                className="form-control"
              >
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Other">Other</option>
              </select>
              <p className="error-text">{errors.category?.message}</p>
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                {...register('image')}
                onChange={handleImageChange}
                className="form-control"
              />
              
              {image && (
                <div>
                  <p>Selected file: {image.name}</p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>
          </Col>
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                
                {...register('price')}
                placeholder="Enter price"
                className="form-control"
              />
              <p className="error-text">{errors.price?.message}</p>
            </div>
          </Col>
        </Row>
        <Button
          type="submit"
          disabled={isLoading}
          style={{ backgroundColor: '#4A5A3A', borderColor: '#4A5A3A' }}
        >{isLoading ? <Spinner size="sm" /> : "Add Product"}
          
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
