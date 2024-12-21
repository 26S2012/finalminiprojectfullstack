import React from 'react';

import { Navbar, Button } from 'reactstrap';

import logo1 from '../Images/logo1.png';

import { Link } from 'react-router-dom';

import serch from '../Images/serch.png';

import list from '../Images/list.png';

import cart from '../Images/cart.png';

function Header1() {

  return (

    <Navbar style={{ backgroundColor: '#C9CA6F', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

       

      <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>

        <img src={logo1} className="logo" alt="Logo" style={{ height: '100px', width: 'auto' }} />

      </div>

     

      <form className="navbar-form" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', width: '50%' }}>

          <input

            type="text"

            className="form-control"

            placeholder="Search"

            name="search"

            style={{ borderRadius: '20px', flex: 1 }}

          />

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

            <img

              style={{ height: '20px', width: 'auto' }} // Adjust icon size here

              src={serch}

              alt="search icon"

            />

          </button>

        </div>

      </form>

      <div style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>

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

        >

        <img src={cart} style={{ height: '50px', width: 'auto' }}/>

      </button>

      </div>

      <button

        className="burger-menu"

        style={{

          background: 'none',

          border: 'none',

          fontSize: 'px',

          cursor: 'pointer',

          marginRight: '10px'

        }}

        onClick={() => console.log('Menu clicked')}

      >

        <img src={list} style={{ height: '60px', width: 'auto' }}></img>

      </button>

    </Navbar>

  );

}

 

export default Header1;