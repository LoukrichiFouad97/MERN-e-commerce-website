import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getAllProducts } from "../../state/products/products.actions";
import { Message } from "../../components/Message/Message";
import { Loader } from "../../components/Loader/Loader";

// import products from "../../products";

export function HomeScreen() {
    var dispatch = useDispatch();
    var productList = useSelector(function getProductsFromState(state) {
        return state.productList;
    });
    var { products, error, loading } = productList;

    useEffect(
        function handleEffect() {
            dispatch(getAllProducts());
        },
        [dispatch]
    );

    return (
        <div>
            <h1>The latest technologies available</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" children={error} />
            ) : (
                <Row>
                    {products.map(function showProduct(product) {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product} />
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
}
