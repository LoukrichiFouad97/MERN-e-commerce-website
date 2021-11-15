import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import { ReviewStars } from "../../components/ReviewStars/ReviewStars";
import { getProductDetails } from "../../state/productDetails/productDetails.actions";
import { Loader } from "../../components/Loader/Loader";
import { Message } from "../../components/Message/Message";

export function ProductDetailScreen() {
    var { id } = useParams();
    var dispatch = useDispatch();

    useEffect(
        function handleGetProductEffect() {
            dispatch(getProductDetails(id));
        },
        [dispatch, id]
    );

    var { product, loading, error } = useSelector(function getProduct(state) {
        return state.productDetails;
    });

    return (
        <>
            <Link to="/" className="btn bg-light my-3">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" children={error} />
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup varient="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <ReviewStars
                                    rating={product.rating}
                                    numReviews={product.numOfReviews}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        {product.countInStock >= 1
                                            ? "In Stock"
                                            : "Out Of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        className="btn-block"
                                        variant="danger"
                                        type="button"
                                        disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </>
    );
}
