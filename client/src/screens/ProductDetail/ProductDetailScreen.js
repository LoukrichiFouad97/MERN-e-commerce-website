import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import axios from "axios";

import { ReviewStars } from "../../components/ReviewStars/ReviewStars";

export function ProductDetailScreen() {
    var { id } = useParams();
    var [product, setProduct] = useState({});

    useEffect(
        function handleProductEffect() {
            async function fetchProduct() {
                var { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            }
            fetchProduct();
        },
        [id]
    );

    return (
        <>
            <Link to="/" className="btn bg-light my-3">
                Go Back
            </Link>
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
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
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
        </>
    );
}
