import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-orders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <h2>All Orders</h2>
      <div style={styles.orderCardsContainer}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            {/* User Section */}
            <div style={styles.userSection}>
              <h4>User Information</h4>
              <p><strong>Email:</strong> {order.userEmail}</p>
              
            </div>

            {/* Address Section */}
            <div style={styles.addressSection}>
              <h4>Address Details</h4>
              {order.address ? (
                <>
                <p><strong>Location:</strong> {order.address.name}</p>
                  <p><strong>Location:</strong> {order.address.location}</p>
                  <p><strong>Postal code:</strong> {order.address.postalcode}</p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                </>
              ) : (
                <p>No address provided</p>
              )}
            </div>

            {/* Products Section */}
            <div style={styles.productsSection}>
              <h4>Products</h4>
              {order.products.map((product) => (
                <div key={product.productId} style={styles.productItem}>
                  <p>{product.productName} (x{product.quantity}) - OMR {product.price}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={styles.orderFooter}>
              <p>Total: <span style={styles.totalAmount}>OMR {order.totalAmount}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: '20px',
  },
  orderCardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.3s ease',
  },
  userSection: {
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  addressSection: {
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  productsSection: {
    marginBottom: '15px',
  },
  productItem: {
    fontSize: '16px',
    margin: '5px 0',
  },
  orderFooter: {
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

export default Order;
