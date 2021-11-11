import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import products from "../../products";

export function HomeScreen() {
    return (
        <div>
            <h1>The latest technologies available</h1>
            <Row>
                {products.map(function showProduct(product) {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <ProductCard product={product} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
