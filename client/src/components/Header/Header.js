import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export function Header() {
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
                            <Nav.Link>
                                <NavLink
                                    to="/cart"
                                    className={(navData) =>
                                        navData.isActive
                                            ? "text-success"
                                            : "text-secondary"
                                    }
                                >
                                    <i className="fa fa-shopping-cart">CART</i>
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink
                                    to="/signin"
                                    className={(navData) =>
                                        navData.isActive
                                            ? "text-success"
                                            : "text-secondary"
                                    }
                                >
                                    <i class="fas fa-user">SIGN IN</i>
                                </NavLink>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
