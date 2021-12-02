import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

import { FormContainer } from "../../components/FormContainer/FormContainer";
import { Loader } from "../../components/Loader/Loader";
import { Message } from "../../components/Message/Message";
import { getUserDetails, updateUser } from "../../state/users/users.actions";
import { USER_UPDATE_RESET } from "../../state/users/users.constants";

export function UserEditScreen() {
    var navigate = useNavigate();
    var dispatch = useDispatch();
    var { id } = useParams();

    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [isAdmin, setIsAdmin] = useState(false);

    var userDetails = useSelector((state) => state.userDetails);
    var { loading, error, user } = userDetails;
    var userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdateByAdmin;

    useEffect(() =>  {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate("/admin/userlist");
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getUserDetails(id));
                console.log("User is not defined");
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, dispatch, id, successUpdate, navigate]);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateUser({ _id: id, name, email, isAdmin }));
    }

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Update User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
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
                            <Form.Check
                                type="checkbox"
                                label="isAdmin"
                                value={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.cheked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
}
