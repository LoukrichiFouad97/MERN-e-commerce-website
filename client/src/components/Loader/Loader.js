import React from "react";
import { Spinner } from "react-bootstrap";

export function Loader() {
    return (
        <Spinner
            animation="grow"
            role="status"
            style={{
                height: "100px",
                width: "100px",
                position: "absolute",
                left: "calc(50% - 100px)",
                top: "calc(50% - 100px)",
            }}
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}
