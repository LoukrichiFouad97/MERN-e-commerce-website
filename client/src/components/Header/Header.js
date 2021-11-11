import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">TechShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart">
                                <i className="fa fa-shopping-cart">CART</i>
                            </Nav.Link>
                            <Nav.Link href="/signin">
                                <i class="fas fa-user">SIGN IN</i>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
