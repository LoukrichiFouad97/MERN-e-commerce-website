import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { saveShippingAddress } from "../../state/cart/cart.actions";
import { Checkoutsteps } from "../../components/CheckoutSteps/Checkoutsteps";

export function ShippingScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    var { shippingAddress } = useSelector((state) => state.cart);

    /*var shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));*/

    var [address, setAddress] = useState(shippingAddress.address);
    var [city, setCity] = useState(shippingAddress.city);
    var [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    var [country, setCountry] = useState(shippingAddress.country);

    function submitHandler(e) {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    }
    return (
        <FormContainer>
            <Checkoutsteps step1 step2 />
            <h2>Shipping Address</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Address </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>CIty </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>PostalCode </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter PostalCode"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Country </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}
