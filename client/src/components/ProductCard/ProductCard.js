import React from "react";
import { Card, Button } from "react-bootstrap";

export function ProductCard({ product }) {
    return (
        <div>
            <Card className="my-3 p-2 rounded">
                <a href={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                </a>
                <Card.Body>
                    <a href={`/product/${product._id}`}>
                        <Card.Title>
                            <strong> {product.name}</strong>
                        </Card.Title>
                    </a>
                    <Card.Text as="div">
                        <div className="my-3">
                            {product.rating} from {product.numReviews} reviews.
                        </div>
                    </Card.Text>
                    <Card.Text as="h3">${product.price}</Card.Text>
                    <Button variant="primary">Add To Cart</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
