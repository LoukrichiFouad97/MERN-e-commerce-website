import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { Message } from "../../components/Message/Message";
import { Loader } from "../../components/Loader/Loader";
import { deleteUser, getAllUsers } from "../../state/users/users.actions";

export function UserListScreen() {
    var navigate = useNavigate();
    var dispatch = useDispatch();
    var { loading, error, users } = useSelector((state) => state.userList);
    var { userInfo } = useSelector((state) => state.userLogin);
    var { success: successDelete } = useSelector((state) => state.userDelete);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllUsers());
        } else {
            navigate("/");
        }
    }, [dispatch, userInfo, navigate, successDelete]);

    function deleteHandler(id) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
}
