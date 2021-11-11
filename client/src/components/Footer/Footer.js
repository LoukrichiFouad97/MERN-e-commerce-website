import React from "react";

import { Container, Row, Col } from "react-bootstrap";

export function Footer() {
    return (
        <footer className="bg-dark">
            <Container>
                <Row>
                    <Col className="text-center py-3 text-white">
                        Copyright &copy; NewBegining.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
