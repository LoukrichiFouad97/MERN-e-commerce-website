import React from "react";
import { Nav } from "react-bootstrap";

export function Checkoutsteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <Nav.Link href="/signin" className="text-dark" >Sign-in</Nav.Link>
                ) : (
                    <Nav.Link disabled>Sign-in</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <Nav.Link href="/shipping" className="text-dark" >Shipping</Nav.Link>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <Nav.Link href="/payment" className="text-dark" >Payment</Nav.Link>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <Nav.Link href="/placeorder" className="text-dark" >Place Order</Nav.Link>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}
