import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Loader } from "../../components/Loader/Loader";
import { Message } from "../../components/Message/Message";
import { register } from "../../state/users/users.actions";

export function RegisterScreen() {
    var location = useLocation();
    var navigate = useNavigate();

    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    var [message, setMessage] = useState("");
    var [password, setPassword] = useState("");

    var dispatch = useDispatch();
    var userRegister = useSelector((state) => state.userRegister);
    var { loading, error, userInfo } = userRegister;

    var redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            // if user is not logged in redirect him.
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!!!");
        } else {
            dispatch(register(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an account?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}
