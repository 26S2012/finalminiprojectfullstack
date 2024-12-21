import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Spinner,
} from "reactstrap";
import { AddressSchemaValidation } from "../Validations/AddressValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddAdress } from "../Features/AdressSlice";
import { placeOrder } from "../Features/OrderSlice";
import { useNavigate } from "react-router-dom";


const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { addresses, isLoading } = useSelector((state) => state.Address);
  const { items } = useSelector((state) => state.cart); // Get cart items
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddressSchemaValidation),
  });


  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const onSubmit = (data) => {
    if (!user?.email) {
      alert("Please log in to add address");
      return;
    }

    const orderData = {
      userEmail: user.email,
      address: {
        name: data.name,
        location: data.location ,
        postalcode: data.postalcode,
        phone: data.phone,
      },
      products: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: calculateTotal(),
    };

    dispatch(placeOrder(orderData)); // Save order with address and cart items
    navigate("/"); 
  };

 

  return (
    <Container className="my-5">
      <Card className="p-3">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Shipping Details</h2>
          </Col>
        </Row>

        <Row>
          <Col md="8">
           

            <Card className="p-3">
              <h5>Add Address</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="form-row">
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        placeholder="Enter your name"
                        className="form-control"
                      />
                      <p className="error-text">{errors.name?.message}</p>
                    </div>
                  </Col>

                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        {...register("location")}
                        placeholder="Enter city and area"
                        className="form-control"
                      />
                      <p className="error-text">{errors.location?.message}</p>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="postalcode">Postal Code</label>
                      <input
                        type="text"
                        id="postalcode"
                        {...register("postalcode")}
                        placeholder="Enter postal code"
                        className="form-control"
                      />
                      <p className="error-text">{errors.postalcode?.message}</p>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        {...register("phone")}
                        placeholder="Enter phone number"
                        className="form-control"
                      />
                      <p className="error-text">{errors.phone?.message}</p>
                    </div>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  disabled={isLoading}
                  style={{ backgroundColor: "#4A5A3A", borderColor: "#4A5A3A" }}
                >
                  {isLoading ? <Spinner size="sm" /> : "Proceed to Payment"}
                </Button>
              </form>
            </Card>
          </Col>

          <Col md="4">
            <Card className="p-3">
              <h5>Order Summary</h5>
              <CardBody>
                <p>
                  <b>Subtotal:</b> OMR {calculateTotal()} <br />
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Address;
