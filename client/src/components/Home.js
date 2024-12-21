//import logo from "../Images/logo-t.png";

import {  Row, Col } from "reactstrap"; //import the Reactstrap Components
import bg from "../Images/bg.png";
const Home = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center img-fluid" 
        style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', 
        backgroundPosition: 'center', height: '100vh', width: '100vw', }} ></div>
        {/* <img src={bg} alt=""/> */}
        
    </>
  );
};

export default Home;
