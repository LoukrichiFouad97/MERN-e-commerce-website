import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Loader } from "../../components/Loader/Loader";
import { Message } from "../../components/Message/Message";
import { login } from "../../state/users/users.actions";

export function SigninScreen() {
    var location = useLocation();
    var navigate = useNavigate();
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var dispatch = useDispatch();
    var userLogin = useSelector((state) => state.userLogin);
    var { loading, error, userInfo } = userLogin;

    var redirect = location.search ? location.search.split("=")[1] : "/";
    console.log(redirect);

    useEffect(() => {
        if (userInfo) {
            // if user is not logged in redirect him.
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    function handleSubmit(e) {
        e.preventDefault(); // prevents browser from reloading
        dispatch(login(email, password));
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}
