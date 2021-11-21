import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getUserDetails } from "../../state/users/users.actions";
import { Message } from "../../components/Message/Message";
import { Loader } from "../../components/Loader/Loader";

export function UserDetails() {
    var dispatch = useDispatch();
    var navigate = useNavigate();

    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    var [message, setMessage] = useState(null);

    var { userInfo } = useSelector((state) => state.userLogin);
    var { error, loading, user } = useSelector((state) => state.userDetails);


    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [userInfo, navigate, user, dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!!!");
        } else {
            //TODO: Dispatch Update Profile
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>
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

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>Order details</Col>
        </Row>
    );
}
