import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import { ProductCard } from "../../components/ProductCard/ProductCard";

// import products from "../../products";

export function HomeScreen() {
    var [products, setProducts] = useState([]);

    useEffect(function handleEffect() {
        async function fetchProducts() {
            let { data } = await axios.get("/api/products/");
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>The latest technologies available</h1>
            <Row>
                {products.map(function showProduct(product) {
                    return (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <ProductCard product={product} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
