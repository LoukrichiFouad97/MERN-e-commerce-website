import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ReviewStars } from "../ReviewStars/ReviewStars";

export function ProductCard({ product }) {
    return (
        <div className="product-card">
            <Card className="my-3 p-2 rounded">
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title>
                            <strong> {product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as="div">
                        <div className="my-3">
                            <ReviewStars
                                rating={product.rating}
                                numReviews={`${product.numReviews} reviews`}
                            />
                        </div>
                    </Card.Text>
                    <Card.Text as="h3">${product.price}</Card.Text>
                    <Button variant="primary">Add To Cart</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
