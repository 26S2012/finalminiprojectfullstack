import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./MenuBar.css";
import Profile from "../Images/Profile1.jpg";
import Location from "./Location";
import { logout } from "../Features/UserSlice";

const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Access user data from Redux
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlelogout = async () => {
    dispatch(logout());
    navigate("/UserLogin"); //redirect to login page route.
  };

  const handleUserDetails = () => {
    navigate("/DeliveryDetails");
  };

  const handleHomeClick = () => {
    navigate("/Catogry");
  };

  return (
    <>
      <button className="burger-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div className={`menu-bar ${isMenuOpen ? "open" : ""}`}>
        <div className="user-info">
          <img src={Profile} alt="Profile" className="profile-picture" />
          <div className="user-details">
            <span className="user-name">{user?.email }</span>
            <Location />
          </div>
        </div>

        <div className="menu-item" onClick={handleHomeClick}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>

        <div className="menu-item" onClick={handleUserDetails}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </div>

        <div className="menu-item" onClick={handlelogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default MenuBar;
