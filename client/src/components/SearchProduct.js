import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsByName } from '../Features/ProductSlice';
import { useNavigate } from 'react-router-dom';

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
 
  return (
    <div>
      <h1>
      <button style={{ backgroundColor: '#4A5A3A', color: 'white' }} onClick={() => navigate(-1)}>
          ←
        </button> Search Result</h1>
      
      
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div className="card" style={{ margin: '10px' }}>
              <img
                src={`http://localhost:3001/${product.image}`}
                className="card-img-top"
                alt={product.productName}
              />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">Price: OMR {product.price}</p>
                <button
                  className="btn btn-success"
                  // onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProduct;
