import React from 'react';
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, Owner</h2>
      <div style={{ marginTop: '20px' }}>
        <button
          className="btn btn-success"
          style={{ margin: '10px' }}
          onClick={() => navigate('/AddProduct')}
        >
          Add Product
        </button>
        <button
          className="btn btn-success"
          style={{ margin: '10px' }}
          onClick={() => navigate('/ListProducts')}
        >
          List Products
        </button>
        <button
          className="btn btn-success"
          style={{ margin: '10px' }}
          onClick={() => navigate('/Order')}
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default OwnerDashboard;
