import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import veg from '../Images/veg.png'
import fru from '../Images/fru.png'
import dairy from '../Images/dairy.png'
import other from '../Images/other.png'
import { Navbar, Button } from 'reactstrap';
import serch from '../Images/serch.png';
import list from '../Images/list.png';
import cart from '../Images/cart.png';

import { useDispatch } from 'react-redux';
import { fetchProductsByCategory, searchProductsByName } from '../Features/ProductSlice';
function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewMore = (category) => {
    dispatch(fetchProductsByCategory(category));
    navigate(`/products/${category}`);
  };
  
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    if (searchTerm.trim() !== '') {
      dispatch(searchProductsByName(searchTerm));
      navigate(`/search?query=${searchTerm}`);
    } else {
      alert('Please enter a search term.'); // Notify user if search is empty
    }
  };

  return (
    <div className="container">
      <Navbar
  style={{
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space between items
    alignItems: 'center', // Align items vertically
    width: '100%',
    backgroundColor: '#C9CA6F',
  }}
>
  {/* Cart Button */}
  <button
    style={{
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    aria-label="Cart"
    onClick={() => navigate("/cart")}
  >
    <img src={cart} alt="Cart" style={{ height: '50px', width: 'auto' }} />
  </button>

  {/* Search Form */}
  
  <form
    className="navbar-form"
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%', // Center the search bar
      justifyContent: 'center',
    }}
    onSubmit={handleSearch}
  >
    <div
      className="form-group"
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <button
        type="submit"
        className="btn btn-default"
        style={{
          marginLeft: '10px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5px 10px',
        }}
      >
        <img src={serch} alt="Search" style={{ height: '20px', width: 'auto' }} />
      </button>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        name="search"
        style={{
          borderRadius: '20px',
          flex: 1,
          padding: '10px',
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
    </div>
  </form>

  {/* Burger Menu */}
  <button
    style={{
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    aria-label="Menu"
  >
  
    
  </button>
</Navbar>

      <h1 className="my-3">Categories</h1>
      <div className="card-group" style={{ padding: '10px', backgroundColor: '#C9CA6F' }}>
        {[
          { name: 'Vegetables', img: veg },
          { name: 'Fruits', img: fru },
          { name: 'Dairy', img: dairy },
          { name: 'Other', img: other },
        ].map((category) => (
          <div className="col-md-3" key={category.name} style={{ padding: '30px' }}>
            <div className="card">
              <img
                src={category.img}
                alt={category.name}
                className="card-img-top"
                style={{ padding: '30px' }}
                loading="lazy" // Lazy loading for performance
              />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <button
                  onClick={() => handleViewMore(category.name)}
                  className="btn"
                  style={{ backgroundColor: '#4A5A3A', color: 'white' }}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
