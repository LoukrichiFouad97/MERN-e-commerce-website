import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../state/users/users.actions";

export function Header() {
    var dispatch = useDispatch();
    var { userInfo } = useSelector((state) => state.userLogin);

    function logoutHandler() {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Navbar.Brand>TechShop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink
                                to="/cart"
                                className={(navData) =>
                                    navData.isActive
                                        ? "text-success p-1"
                                        : "text-secondary p-1"
                                }
                            >
                                <i className="fa fa-shopping-cart"> CART</i>
                            </NavLink>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item href="/profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <NavLink
                                    to="/signin"
                                    className={(navData) =>
                                        navData.isActive
                                            ? "text-success p-1"
                                            : "text-secondary p-1"
                                    }
                                >
                                    <i className="fas fa-user"> SIGN IN</i>
                                </NavLink>
                            )}
                            {/* 
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <NavLink
                                        to="/admin/userlist"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </NavLink>
                                    <NavLink
                                        to="/admin/productlist"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </NavLink>
                                    <NavLink
                                        to="/admin/orderlist"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </NavLink>
                                </NavDropdown>
                            )} */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
