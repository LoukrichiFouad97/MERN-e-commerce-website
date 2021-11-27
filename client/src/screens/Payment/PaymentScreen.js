import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { savePaymentMethod } from "../../state/cart/cart.actions";
import { Checkoutsteps } from "../../components/CheckoutSteps/Checkoutsteps";

export function PaymentScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    var { shippingAddress } = useSelector((state) => state.cart);

    /* var shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));*/

    if (!shippingAddress.address) {
        navigate("/shipping");
    }
    var [paymentMethod, setPaymentMethod] = useState("Paypal");

    function submitHandler(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }
    return (
        <FormContainer>
            <Checkoutsteps step1 step2 step3 />
            <h2>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}
