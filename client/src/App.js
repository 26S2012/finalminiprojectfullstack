import logo from './logo.svg';
import './App.css';
import OwnerRegister from './components/OwnerRegister';
import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import OwnerLogin from './components/OwnerLogin';
import AddProduct from './components/AddProduct';
import ListProducts from './components/ListProducts';
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';
import Header from './components/Header';
import Home from './components/Home';
import Catogry from './components/Catogry';
import { Category } from '@mui/icons-material';
import Products from './components/Products';
import Cart from './components/Cart';
import UpdateProduct from './components/UpdateProducts';
import SearchResult from './components/SearchProduct';
import Bar from "./components/Bar";
import Layout from "./components/Layout";
import Order from './components/Order';
import OwnerDashboard from './components/OwnerHome';
import Address from './components/Delivary';

function AppContent() {
  const location = useLocation();

  // Define a list of routes or patterns where Header should not be shown
  const headerExcludedRoutes = [
    "/ListProducts",
    "/AddProduct",
    "/Catogry",
    "/Cart",
    "/Delivery",
    "/DeliveryDetails",
    "/search"
  ];

  // Check for dynamic routes
  const isUpdateProductRoute = location.pathname.startsWith("/UpdateProduct/");
  const isProductCategoryRoute = location.pathname.startsWith("/products/");

  const isHeaderExcluded = headerExcludedRoutes.includes(location.pathname) || isUpdateProductRoute || isProductCategoryRoute;

  // Define a list of routes or patterns where Layout and Bar should not be shown
  const layoutBarExcludedRoutes = [
    "/ListProducts",
    "/AddProduct",
    "/OwnerLogin",
    "/OwnerRegister",
    "/UserRegister",
    "/UserLogin",
    "/OwnerDashboard",
    "/Order",
    "/"

  ];

  const isLayoutBarExcluded =
    layoutBarExcludedRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/UpdateProduct/");
 
  return (
    <Container fluid>
        <Row>
        {!isHeaderExcluded && <Header />}
        </Row>
        <Row></Row>
        <Row className="main">
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/AddProduct" element={<AddProduct/>}/>
            <Route path="/OwnerRegister" element={<OwnerRegister/>}/>
            <Route path="/OwnerLogin" element={<OwnerLogin/>}/>
            <Route path="/ListProducts" element={<ListProducts/>}/>
            <Route path="/UserRegister" element={<UserRegister/>}/>
            <Route path="/UserLogin" element={<UserLogin/>}/>
            <Route path="/Catogry" element={<Catogry/>}/>
            <Route path="/products/:category" element={<Products />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/UpdateProduct/:id" element={<UpdateProduct/>}/>
            <Route path="/OwnerDashboard" element={<OwnerDashboard/>}/>
            <Route path="/Address" element={<Address/>}/>
            <Route path="/Order" element={<Order/>}/>
            </Routes>
            {!isLayoutBarExcluded && (
          <>
            <Layout />
            <Bar />
          </>
        )}
          </Row>
        <Row>
          {/* <Footer /> */}
        </Row>
      
    </Container>
  );
}

function App() {
  return (
    // Ensure the Router wraps the entire app content, including AppContent
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;